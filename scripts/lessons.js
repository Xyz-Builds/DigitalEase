const lessonId = new URLSearchParams(window.location.search).get("id");
import { supabase } from "../scripts/supabase.js";

const lessons = [
  {
    id: 1,
    title: "The Introduction",
    content: `
Welcome to DigitalEase!

The internet helps us learn, communicate, play games, shop, and connect with people around the world. However, just like the real world, the internet has risks that users should be aware of.

Cybersecurity is the practice of protecting yourself, your accounts, and your personal information online. Fortunately, staying safe online doesn't require advanced technical knowledge. A few good habits can dramatically reduce your chances of becoming a victim of scams, hacked accounts, or other online threats.

Throughout this course, you'll learn how to:
• Create strong passwords
• Recognize phishing scams
• Protect personal information
• Browse the internet safely
• Build smart online habits

Cybersecurity isn't about being afraid of technology. It's about using technology safely and confidently.
`,
  },

  {
    id: 2,
    title: "Strong Passwords",
    content: `
Passwords are the first line of defense for your online accounts. A weak password can often be guessed or cracked in seconds.

A strong password should:
• Be at least 12 characters long
• Include uppercase and lowercase letters
• Include numbers
• Include symbols such as ! @ # $ %
• Be unique for every account

Examples:

Weak Password:
password123

Strong Password:
T!g3r#Sky$2026

Avoid using:
• Your name
• Birthdays
• Phone numbers
• Common words

Our built-in password generator can help you generate and store strong passwords securely in your personal vault. Never share your passwords with anyone you do not trust.
`,
  },

  {
    id: 3,
    title: "Phishing Awareness",
    content: `
Phishing is a type of scam where attackers try to trick people into revealing sensitive information such as passwords, credit card numbers, or personal details.

Phishing attempts often arrive through:
• Emails
• Text messages
• Social media messages
• Fake websites

Warning signs include:
• Urgent messages demanding immediate action
• Suspicious links
• Spelling or grammar mistakes
• Requests for passwords or financial information

Example:

"Your account has been suspended. Click here immediately to verify your information."

Before clicking any link:
• Check the sender
• Verify the website address
• Look for unusual wording
• Contact the company directly if unsure

Remember: legitimate companies rarely ask for sensitive information through email or text messages.
`,
  },
];

const {
  data: { user },
} = await supabase.auth.getUser();

async function completeLessonFunc() {
  if (!user) {
    console.error("No user logged in");
    return;
  }

  const { error } = await supabase.from("lesson_progress").upsert({
    user_id: user.id,
    lesson_id: Number(lessonId),
    completed: true,
    completed_at: new Date().toISOString(),
  });

  if (error) {
    console.error(error);
  } else {
    console.log("Lesson saved successfully");
  }
}

const lesson = lessons.find((lesson) => lesson.id == Number(lessonId));

console.log("found lesson:", lesson);

const completeLessonBtn = document.getElementById("completeLessonBtn");

const lessonTitle = document.getElementById("lessonTitle");

const lessonContent = document.getElementById("lessonContent");

lessonTitle.textContent = lesson.title;

lessonContent.textContent = lesson.content;

completeLessonBtn.addEventListener("click", completeLessonFunc);
