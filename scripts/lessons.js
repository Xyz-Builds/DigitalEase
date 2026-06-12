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
  if (!user) {
    console.error("No user logged in");
    return;
  }

  console.log("Auth UID:", user.id);
  console.log("Lesson ID:", Number(lessonId));

  const { error } = await supabase.from("lesson_progress").insert({
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

console.log("lessonId:", lessonId);
console.log("lessons:", lessons);

const lesson = lessons.find((lesson) => lesson.id == Number(lessonId));

console.log("found lesson:", lesson);

const completeLessonBtn = document.getElementById("completeLessonBtn");

const lessonTitle = document.getElementById("lessonTitle");

const lessonContent = document.getElementById("lessonContent");

lessonTitle.textContent = lesson.title;

lessonContent.textContent = lesson.content;

completeLessonBtn.addEventListener("click", completeLessonFunc);
