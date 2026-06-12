const base = new URL("../", import.meta.url).href;

const { supabase } = await import(`${base}scripts/supabase.js`);

const {
  data: { user },
  error,
} = await supabase.auth.getUser();

if (!user) {
  window.location.href = `${base}pages/signin.html`;
  throw new Error("User not authenticated");
}

const meta = user.user_metadata ?? {};

const [firstName, lastName] = meta.full_name.split(" ");

const welcomeMsg = document.getElementById("welcome-msg");

if (welcomeMsg) {
  welcomeMsg.innerHTML = `Welcome <span>${firstName}</span>`;
}
