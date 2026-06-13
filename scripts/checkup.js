const base = new URL("../", import.meta.url).href;

const { supabase } = await import(`${base}scripts/supabase.js`);

const checkupCard = document.querySelector(".checkup-wrap");

const questions = [
  {
    id: 1,
    question: "Do you use a unique password for each account?",
    category: "Account Security",
    options: ["No", "Yes", "Not Sure"],
    correctAnswer: "Yes",
    partialAnswer: "Not Sure",
    points: 25,
    advice:
      "Use a different password for every account to reduce the impact of data breaches.",
  },

  {
    id: 2,
    question: "Do you enable two-factor authentication? (2FA)",
    category: "Account Security",
    options: ["No", "Yes", "Not Sure"],
    correctAnswer: "Yes",
    partialAnswer: "Not Sure",
    points: 20,
    advice:
      "Enable two-factor authentication on important accounts for extra protection.",
  },

  {
    id: 3,
    question: "Are your social media accounts set to private?",
    category: "Privacy Awareness",
    options: ["No", "Yes", "Not Sure"],
    correctAnswer: "Yes",
    partialAnswer: "Not Sure",
    points: 15,
    advice:
      "Set social media profiles to private to limit who can view your information.",
  },

  {
    id: 4,
    question: "Do you use security software or browser protection tools?",
    category: "Device Safety",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "Yes",
    partialAnswer: "Sometimes",
    points: 25,
    advice:
      "Consider using security software or browser protection tools to help detect threats.",
  },

  {
    id: 5,
    question: "Do you regularly update your passwords?",
    category: "Account Security",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "Yes",
    partialAnswer: "Sometimes",
    points: 20,
    advice:
      "Update important passwords periodically, especially after security incidents.",
  },

  {
    id: 6,
    question: "Do you accept friend requests from people you don't know?",
    category: "Privacy Awareness",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "No",
    partialAnswer: "Sometimes",
    points: 25,
    advice:
      "Avoid accepting requests from strangers to reduce scams and impersonation attempts.",
  },

  {
    id: 7,
    question: "Do you review app permissions before installing apps?",
    category: "Device Safety",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "Yes",
    partialAnswer: "Sometimes",
    points: 20,
    advice:
      "Review permissions before installing apps and deny unnecessary access.",
  },
];

let currentQuestion = 0;
let score = 0;
let recommendations = [];

function beginCheckup() {
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  checkupCard.innerHTML = `
    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: ${progressPercent}%"
      ></div>
    </div>

    <h4 class="progress">
      Question ${currentQuestion + 1} of ${questions.length}
    </h4>

    <h1 id="question">${question.question}</h1>

    <h2 id="category">${question.category}</h2>

    <hr class="question-divider">

    <h3 id="points">${question.points} Points</h3>

    <div class="option-wrap">
      <button class="option-btn">${question.options[0]}</button>
      <button class="option-btn">${question.options[1]}</button>
      <button class="option-btn">${question.options[2]}</button>
    </div>
  `;

  document.querySelectorAll(".option-btn").forEach((button) => {
    button.addEventListener("click", () => {
      handleAnswer(button.textContent);
    });
  });
}

function handleAnswer(answer) {
  const question = questions[currentQuestion];

  if (answer === question.correctAnswer) {
    score += question.points;
  } else {
    recommendations.push(question.advice);

    if (answer === question.partialAnswer) {
      score += question.points / 2;
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

async function showResults() {
  const maxScore = questions.reduce(
    (total, question) => total + question.points,
    0,
  );

  const percentage = Math.round((score / maxScore) * 100);

  let grade = "";

  if (percentage >= 90) {
    grade = "Excellent";
  } else if (percentage >= 75) {
    grade = "Good";
  } else if (percentage >= 50) {
    grade = "Fair";
  } else {
    grade = "Needs Improvement";
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("user_stats").upsert({
    user_id: user.id,
    safety_score: percentage,
    updated_at: new Date(),
  });

  if (error) {
    console.error(error);
  }

  checkupCard.innerHTML = `
    <h1>Your Privacy Score</h1>

    <h2 class="score">${percentage}%</h2>

    <h3 class="grade">${grade}</h3>

    <div class="recommendations">
      <h3>Recommendations</h3>

      ${
        recommendations.length
          ? `
        <ul>
          ${recommendations
            .map((recommendation) => `<li>${recommendation}</li>`)
            .join("")}
        </ul>
      `
          : `
        <p>
          Great job! We couldn't find any major
          privacy concerns.
        </p>
      `
      }
    </div>
  `;
}

window.beginCheckup = beginCheckup;
