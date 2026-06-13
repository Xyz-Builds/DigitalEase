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
  },

  {
    id: 2,
    question: "Do you enable two-factor authentication? (2FA)",
    category: "Account Security",
    options: ["No", "Yes", "Not Sure"],
    correctAnswer: "Yes",
    partialAnswer: "Not Sure",
    points: 20,
  },

  {
    id: 3,
    question: "Are your social media accounts set to private?",
    category: "Privacy Awareness",
    options: ["No", "Yes", "Not Sure"],
    correctAnswer: "Yes",
    partialAnswer: "Not Sure",
    points: 15,
  },

  {
    id: 4,
    question: "Do you use security software or browser protection tools?",
    category: "Device Safety",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "Yes",
    partialAnswer: "Sometimes",
    points: 25,
  },

  {
    id: 5,
    question: "Do you regularly update your passwords?",
    category: "Account Security",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "Yes",
    partialAnswer: "Sometimes",
    points: 20,
  },

  {
    id: 6,
    question: "Do you accept friend requests from people you don't know?",
    category: "Privacy Awareness",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "No",
    partialAnswer: "Sometimes",
    points: 25,
  },

  {
    id: 7,
    question: "Do you review app permissions before installing apps?",
    category: "Device Safety",
    options: ["No", "Yes", "Sometimes"],
    correctAnswer: "Yes",
    partialAnswer: "Sometimes",
    points: 20,
  },
];

let currentQuestion = 0;
let score = 0;

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
  } else if (answer === question.partialAnswer) {
    score += question.points / 2;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
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

  checkupCard.innerHTML = `
    <h1>Your Privacy Score</h1>
    <h2>${percentage}%</h2>
    <h3>${grade}</h3>
  `;
}

window.beginCheckup = beginCheckup;
