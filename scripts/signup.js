import { supabase } from "./supabase.js";

export async function signUpWithGoogle() {
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
      data: { first_name: firstName, last_name: lastName },
    },
  });

  if (error) {
    document.getElementById("error-msg").textContent = error.message;
    return;
  }

  await supabase.from("profiles").insert({
    id: data.user.id,
    first_name: firstName,
    last_name: lastName,
    email: email,
  });

  window.location.href = "dashboard.html";
}
