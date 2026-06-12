import { supabase } from "../scripts/supabase.js";

const lessonId = Number(new URLSearchParams(window.location.search).get("id"));

const lessons = [
  {
    id: 1,
    title: "The Introduction",
    content: `
      <p>Welcome to DigitalEase!</p>

      <p>
        The internet helps us learn, communicate, play games, shop, and connect
        with people around the world. However, just like the real world, the
        internet has risks that users should be aware of.
      </p>

      <p>
        Cybersecurity is the practice of protecting yourself, your accounts,
        and your personal information online.
      </p>

      <h2>In this course you'll learn:</h2>

      <ul>
        <li>How to create strong passwords</li>
        <li>How to recognize phishing scams</li>
        <li>How to protect personal information</li>
        <li>How to browse safely online</li>
        <li>How to build smart digital habits</li>
      </ul>

      <p>
        Cybersecurity isn't about being afraid of technology.
        It's about using technology safely and confidently.
      </p>
    `,
  },

  {
    id: 2,
    title: "Strong Passwords",
    content: `
      <p>
        Passwords are the first line of defense for your online accounts.
      </p>

      <h2>A strong password should:</h2>

      <ul>
        <li>Be at least 12 characters long</li>
        <li>Contain uppercase letters</li>
        <li>Contain lowercase letters</li>
        <li>Contain numbers</li>
        <li>Contain symbols</li>
      </ul>

      <h2>Weak Password Example</h2>

      <div class="example-box">
        password123
      </div>

      <h2>Strong Password Example</h2>

      <div class="example-box">
        T!g3r#Sky$2026
      </div>

      <p>
        Never reuse the same password across multiple accounts.
      </p>
    `,
  },

  {
    id: 3,
    title: "Phishing Awareness",
    content: `
      <p>
        Phishing is a scam where attackers attempt to trick you into
        revealing personal information.
      </p>

      <h2>Phishing can arrive through:</h2>

      <ul>
        <li>Emails</li>
        <li>Text messages</li>
        <li>Social media messages</li>
        <li>Fake websites</li>
      </ul>

      <h2>Warning Signs</h2>

      <ul>
        <li>Urgent messages</li>
        <li>Suspicious links</li>
        <li>Grammar mistakes</li>
        <li>Requests for passwords</li>
      </ul>

      <div class="example-box">
        "Your account has been suspended. Click here immediately to verify your information."
      </div>

      <p>
        Always verify links and senders before entering any information.
      </p>
    `,
  },
];

const lesson = lessons.find((lesson) => lesson.id === lessonId);

const lessonTitle = document.getElementById("lessonTitle");
const lessonContent = document.getElementById("lessonContent");
const completeLessonBtn = document.getElementById("completeLessonBtn");

if (lesson.id == 1) {
  completeLessonBtn.textContent = "Complete Introduction";
}

if (!lesson) {
  lessonTitle.textContent = "Lesson Not Found";
  lessonContent.innerHTML = "<p>This lesson does not exist.</p>";
} else {
  lessonTitle.textContent = lesson.title;
  lessonContent.innerHTML = lesson.content;
}

const {
  data: { user },
} = await supabase.auth.getUser();

if (user) {
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("completed")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (progress?.completed) {
    completeLessonBtn.textContent = "Completed ✓";
    completeLessonBtn.disabled = true;
  }
}

async function completeLessonFunc() {
  if (!user) {
    console.error("No user logged in");
    return;
  }

  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,lesson_id",
    },
  );

  if (error) {
    console.error(error);
  } else {
    completeLessonBtn.textContent = "Completed ✓";
    completeLessonBtn.disabled = true;
  }
}

completeLessonBtn.addEventListener("click", completeLessonFunc);
