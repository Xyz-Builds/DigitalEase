const lessonId = new URLSearchParams(window.location.search).get("id");
import { supabase } from "../scripts/supabase.js";

const lessons = [
  {
    id: 1,
    title: "The Introduction",
    content: "",
  },

  {
    id: 2,
    title: "Strong Passwords",
    content: "",
  },

  {
    id: 3,
    title: "Phishing Awareness",
    content: "",
  },
];

const {
  data: { user },
} = await supabase.auth.getUser();

async function completeLessonFunc() {
  const { error } = await supabase.from("lesson_progress").upsert({
    user_id: user.id,
    lesson_id: Number(lessonId),
    completed: true,
    completed_at: new Date(),
  });

  if (error) {
    console.error(error);
  } else {
    console.log("Lesson saved successfully");
  }
}

const lesson = lessons.find((lesson) => lesson.id == lessonId);

const completeLessonBtn = document.getElementById("completeLessonBtn");

const lessonTitle = document.getElementById("lessonTitle");

const lessonContent = document.getElementById("lessonContent");

lessonTitle.textContent = lessons.title;

lessonContent.textContent = lessons.content;

completeLessonBtn.addEventListener("click", completeLessonFunc);
