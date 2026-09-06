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

export async function signUpWithEmail() {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo:
        "https://xyz-builds.github.io/DigitalEase/pages/dashboard/dashboard.html",
    },
  });

  if (error) {
    document.getElementById("error-msg").textContent = error.message;
    return;
  }

  // With email confirmation enabled, the user has no session yet.
  if (!data.session) {
    document.getElementById("error-msg").textContent =
      "Check your email to confirm your account!";
    return;
  }

  await supabase.from("profiles").insert({
    id: data.user.id,
    first_name: firstName,
    last_name: lastName,
    email: email,
  });

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
