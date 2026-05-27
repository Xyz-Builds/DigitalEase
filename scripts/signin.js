import { supabase } from "./supabase.js";

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "http://localhost:5501/dashboard.html" },
  });
}

export async function signInWithEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    document.getElementById("error-msg").textContent = error.message;
    return;
  }

  window.location.href = "dashboard.html";
}

export async function sendMagicLink() {
  const email = document.getElementById("email").value;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: "http://localhost:5501/dashboard.html" },
  });

  if (error) {
    document.getElementById("error-msg").textContent = error.message;
    return;
  }

  document.getElementById("error-msg").textContent =
    '<span class="ms">check_circle</span> Check your email for the magic link!';
}
