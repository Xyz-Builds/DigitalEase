import { supabase } from "../scripts/supabase.js";
import { lessons } from "../scripts/lessonsData.js";

const lessonId = Number(new URLSearchParams(window.location.search).get("id"));

const lesson = lessons.find((lesson) => lesson.id === lessonId);

if (!lesson) {
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("completed", true)
    .order("lesson_id", { ascending: false });

  const highestCompletedLessonId =
    progress.length > 0 ? progress[0].lesson_id : 1;

  const nextLessonExists = lessons.some(
    (lesson) => lesson.id === highestCompletedLessonId + 1,
  );

  const redirectLessonId = nextLessonExists
    ? highestCompletedLessonId + 1
    : highestCompletedLessonId;

  window.location.search = `?id=${redirectLessonId}`;
}

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
