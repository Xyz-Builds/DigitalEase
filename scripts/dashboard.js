const base = new URL("../", import.meta.url).href;

const { supabase } = await import(`${base}scripts/supabase.js`);
import { lessons } from "../scripts/lessonsData.js";

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  window.location.href = `${base}pages/signin.html`;
  throw new Error("User not authenticated");
}

const totalLessons = lessons.length;

const { data: completedLessons, error: progressError } = await supabase
  .from("lesson_progress")
  .select("lesson_id")
  .eq("user_id", user.id)
  .eq("completed", true);

if (progressError) {
  console.error(progressError);
}

const completedCount = completedLessons?.length || 0;

const progressPercent = Math.round((completedCount / totalLessons) * 100);

const lessonsStat = document.querySelector(".lessons-card .stat-value");

if (lessonsStat) {
  lessonsStat.textContent = `${completedCount} / ${totalLessons}`;
}

const progressFill = document.getElementById("progressFill");

if (progressFill) {
  progressFill.style.width = `${progressPercent}%`;
}

const progressText = document.getElementById("courseProgress");

if (progressText) {
  progressText.textContent = `${progressPercent}%`;
}

const courseProgressFill = document.getElementById("courseProgressFill");

if (courseProgressFill) {
  courseProgressFill.style.width = `${progressPercent}%`;
}

const nextLesson =
  completedCount >= totalLessons ? totalLessons : completedCount + 1;

const continueBtn = document.getElementById("continueBtn");

if (continueBtn) {
  continueBtn.href = `lessons.html?id=${nextLesson}`;
}

const meta = user.user_metadata ?? {};

const fullName = meta.full_name || "User";

const [firstName] = fullName.split(" ");

const welcomeMsg = document.getElementById("welcome-msg");

if (welcomeMsg) {
  welcomeMsg.innerHTML = `Welcome <span>${firstName}</span>`;
}

const { data } = await supabase
  .from("user_stats")
  .select("safety_score")
  .eq("user_id", user.id)
  .single();

document.getElementById("safetyScore").textContent = data?.safety_score
  ? `${data.safety_score}%`
  : "--";

const comment = document.querySelector(".stat-comment");

if (data?.safety_score >= 85) {
  comment.innerHTML = `
    <span class="comment-title success">
      <span class="ms">star</span>
      Excellent Protection
    </span>
    Keep browsing safely and smartly.
  `;
} else if (data?.safety_score >= 65) {
  comment.innerHTML = `
    <span class="comment-title good">
      <span class="ms">check_circle</span>
      Good Protection
    </span>
    You're close to achieving an excellent score.
  `;
} else if (data?.safety_score >= 45) {
  comment.innerHTML = `
    <span class="comment-title warning">
      <span class="ms">warning</span>
      Moderate Risk
    </span>
    A few improvements can greatly increase your safety.
  `;
} else {
  comment.innerHTML = `
    <span class="comment-title danger">
      <span class="ms">dangerous</span>
      High Risk
    </span>
    Your online accounts may be vulnerable to threats.
  `;
}
