const simulatorCard = document.querySelector(".simulator-wrap");

import { supabase } from "../scripts/supabase.js";

const { data, error } = await supabase.auth.getUser();

const user = data?.user || null;

const senders = [
  "Amazon",
  "Paypal",
  "Apple",
  "Microsoft",
  "Google",
  "Discord",
  "Instagram",
  "Meta",
  "Facebook",
  "Netflix",
  "YouTube",
];

const legitDomains = [
  "amazon.com",
  "paypal.com",
  "apple.com",
  "microsoft.com",
  "google.com",
  "discord.com",
  "instagram.com",
  "meta.com",
  "facebook.com",
  "netflix.com",
  "youtube.com",
];

const prefixes = [
  "security",
  "support",
  "no-reply",
  "accounts",
  "notifications",
];

const fakeDomains = [
  "amazom.com",
  "paypa1.com",
  "apple.org",
  "microsoft-help.com",
  "google-bank.com",
  "discord-support.net",
  "instagrarn.com",
  "meta-official.com",
  "facebook.meta",
  "netflix-giveaways.com",
  "youtube-real.com",
];

const subjects = [
  {
    subject: "Password Reset Required",
    body: "We received a request to reset your password. If this was not you, please review your account activity immediately.",
  },

  {
    subject: "New Sign-In Detected",
    body: "A new sign-in was detected on your account from a recently used device. If this wasn't you, secure your account immediately.",
  },

  {
    subject: "Verify Your Email Address",
    body: "Please verify your email address to continue using all account features. Verification helps keep your account secure.",
  },

  {
    subject: "Your Account Security Alert",
    body: "Our systems detected unusual activity on your account. Please review your recent activity.",
  },

  {
    subject: "Confirm Your Identity",
    body: "To protect your account, we need to confirm your identity. Please complete the verification process.",
  },

  {
    subject: "Action Required: Payment Failed",
    body: "A recent payment could not be processed. Please review your payment method.",
  },

  {
    subject: "Claim Your Reward Points",
    body: "You've earned reward points through recent activity. Visit your account to redeem them.",
  },

  {
    subject: "Storage Limit Reached",
    body: "Your storage usage has reached its current limit. Upgrade or remove files to continue.",
  },

  {
    subject: "Security Checkup Recommended",
    body: "We recommend reviewing your account security settings. This can help improve account protection.",
  },

  {
    subject: "Review Recent Account Activity",
    body: "Recent account activity has been summarized for your review. Please verify everything looks correct.",
  },
];

const types = ["Safe", "Phishing", "Suspicious"];

let scenarios = [];
let currentScenario = 0;
let score = 0;

function generateScenario() {
  let redFlags = [];

  const phishingFlags = [
    "Misspelled domain",
    "Requests urgent action",
    "Threatens account suspension",
    "Creates unnecessary pressure",
    "Asks for sensitive information",
  ];

  const suspiciousFlags = [
    "Unexpected request",
    "Could not be verified",
    "Unusual wording",
    "Requests immediate action",
    "Contains vague information",
  ];

  const companyIndex = Math.floor(Math.random() * senders.length);

  const subjectIndex = Math.floor(Math.random() * subjects.length);

  const type = types[Math.floor(Math.random() * types.length)];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  let body = subjects[subjectIndex].body;

  if (type === "Phishing") {
    const count = Math.floor(Math.random() * 3) + 2;

    while (redFlags.length < count) {
      const flag =
        phishingFlags[Math.floor(Math.random() * phishingFlags.length)];

      if (!redFlags.includes(flag)) {
        redFlags.push(flag);
      }
    }

    if (!redFlags.includes("Misspelled domain")) {
      redFlags.push("Misspelled domain");
    }
  }

  if (type === "Phishing") {
    if (redFlags.includes("Requests urgent action")) {
      body += " Immediate action is required.";
    }

    if (redFlags.includes("Threatens account suspension")) {
      body += " Your account will be suspended if you do not respond.";
    }

    if (redFlags.includes("Asks for sensitive information")) {
      body += " Please reply with your password to verify ownership.";
    }

    if (redFlags.includes("Creates unnecessary pressure")) {
      body += " This request expires in 30 minutes.";
    }
  }

  if (type === "Suspicious") {
    const count = Math.floor(Math.random() * 2) + 1;

    while (redFlags.length < count) {
      const flag =
        suspiciousFlags[Math.floor(Math.random() * suspiciousFlags.length)];

      if (!redFlags.includes(flag)) {
        redFlags.push(flag);
      }
    }
  }

  const domain =
    type === "Phishing"
      ? fakeDomains[companyIndex]
      : legitDomains[companyIndex];

  if (type === "Suspicious") {
    body += " Please review this request carefully before taking any action.";
  }

  let explanation = "";

  if (type === "Safe") {
    explanation =
      "This email appears legitimate and contains no obvious warning signs.";
  }

  if (type === "Suspicious") {
    explanation =
      "This email should be verified before taking action because of: " +
      redFlags.join(", ") +
      ".";
  }

  if (type === "Phishing") {
    explanation =
      "This email contains indicators commonly used in phishing attacks, including: " +
      redFlags.join(", ") +
      ".";
  }

  return {
    sender: senders[companyIndex],

    email: `${prefix}@${domain}`,

    domain,

    subject: subjects[subjectIndex].subject,

    body,

    explanation,

    type,

    redFlags,
  };
}

function renderScenario() {
  const scenario = scenarios[currentScenario];

  simulatorCard.innerHTML = `
    <h3 class="progress">
      Email ${currentScenario + 1} of ${scenarios.length}
    </h3>

    <article class="email_field">

      <div class="header-wrap">
        <h2>
          <span class="ms heading-ms">subdirectory_arrow_right</span>
          <b>From:</b> ${scenario.sender} &lt;${scenario.email}&gt;
        </h2>

        <h2>
          <span class="ms heading-ms">subdirectory_arrow_right</span>
          <b>To:</b> ${user?.email || "user@example.com"}
        </h2>
      </div>

      <hr class="email-divider">

      <h2 class="subject">
        ${scenario.subject}
      </h2>

      <hr class="email-divider">

      <p class="email-body">
        ${scenario.body}
      </p>

    </article>

    <div class="answer-wrap">
      <button class="answer-btn" data-answer="Safe">
        Safe
      </button>

      <button class="answer-btn" data-answer="Suspicious">
        Suspicious
      </button>

      <button class="answer-btn" data-answer="Phishing">
        Phishing
      </button>
    </div>
  `;

  document.querySelectorAll(".answer-btn").forEach((button) => {
    button.addEventListener("click", () => {
      handleAnswer(button.dataset.answer);
    });
  });
}

function handleAnswer(answer) {
  if (answer === scenarios[currentScenario].type) {
    score++;
  }

  showFeedback(answer);
}

function showFeedback(answer) {
  const scenario = scenarios[currentScenario];

  const correct = answer === scenario.type;

  simulatorCard.innerHTML = `
    <h1>
      ${correct ? "Correct!" : "Incorrect"}
    </h1>

    <h2>
      Correct Answer:
      ${scenario.type}
    </h2>

    <p>
      Sender: ${scenario.email}
    </p>

    ${
      scenario.redFlags.length > 0
        ? `
        <div class="feedback-flags">
          <h3>Red Flags</h3>

          <ul>
            ${scenario.redFlags.map((flag) => `<li>${flag}</li>`).join("")}
          </ul>
        </div>
      `
        : `
        <div class="feedback-flags">
          <h3>No Major Red Flags Found</h3>
        </div>
      `
    }

    <div class="feedback-explanation">
      <h3>Explanation</h3>
      <p>${scenario.explanation}</p>
    </div>

    <button class="next-btn">
      ${
        currentScenario + 1 === scenarios.length
          ? "View Results"
          : "Next Scenario"
      }
    </button>
  `;

  document.querySelector(".next-btn").addEventListener("click", async () => {
    currentScenario++;

    if (currentScenario < scenarios.length) {
      renderScenario();
    } else {
      await showResults();
    }
  });
}

async function showResults() {
  const percentage = Math.round((score / scenarios.length) * 100);

  if (user) {
    const { error } = await supabase.from("user_stats").upsert(
      {
        user_id: user.id,
        phishing_score: percentage,
      },
      {
        onConflict: "user_id",
      },
    );

    if (error) {
      console.error(error);
    }
  }

  let grade = "";

  if (percentage >= 90) {
    grade = "Phishing Expert";
  } else if (percentage >= 75) {
    grade = "Strong Awareness";
  } else if (percentage >= 50) {
    grade = "Good Awareness";
  } else {
    grade = "Needs Practice";
  }

  simulatorCard.innerHTML = `
    <h1>Your Result</h1>

    <h2 class="score">${percentage}%</h2>

    <h3>${score}/${scenarios.length} Correct</h3>

    <p>${grade}</p>
  `;
}

function beginSimulator() {
  scenarios = [];
  currentScenario = 0;
  score = 0;

  for (let i = 0; i < 5; i++) {
    scenarios.push(generateScenario());
  }

  renderScenario();
}

window.beginSimulator = beginSimulator;
