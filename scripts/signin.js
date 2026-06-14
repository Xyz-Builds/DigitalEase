import { supabase } from "./supabase.js";

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        "https://xyz-builds.github.io/DigitalEase/pages/dashboard/dashboard.html",
    },
  });
}

export async function signInWithEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);
  console.error(error);

  if (error) {
    document.getElementById("error-msg").textContent = error.message;
    return;
  }

  window.location.href =
    "https://xyz-builds.github.io/DigitalEase/pages/dashboard/dashboard.html";
}

export async function sendMagicLink() {
  const email = document.getElementById("email").value;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo:
        "https://xyz-builds.github.io/DigitalEase/pages/dashboard/dashboard.html",
    },
  });

  if (error) {
    document.getElementById("error-msg").textContent = error.message;
    return;
  }

  document.getElementById("error-msg").innerHTML =
    '<span class="ms">check_circle</span> Check your email for the magic link!';
}

window.signInWithEmail = signInWithEmail;
window.signInWithGoogle = signInWithGoogle;
window.sendMagicLink = sendMagicLink;
