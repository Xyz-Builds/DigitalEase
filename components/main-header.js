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

const accountInfo = document.getElementById("account-info");
if (accountInfo) {
  accountInfo.textContent =
    `${meta.first_name || ""} ${meta.last_name || ""}`.trim();
}

window.signOut = async () => {
  await supabase.auth.signOut();
  window.location.href = `${base}pages/signup.html`;
};

document
  .getElementById("sign-out-btn")
  ?.addEventListener("click", window.signOut);

document.getElementById("main-header").innerHTML = `
<header>
  <a href="${base}index.html" class="logo-link">
    <img class="icon" src="${base}images/DigitalEase logo.png" alt="DigitalEase">
  </a>

  <div class="buttons">
    <a class="feature-a" href="${base}pages/dashboard/checkup.html">Privacy Checkup</a>
    <a class="feature-a" href="${base}pages/dashboard/passwordGenerator.html">Password Generator</a>
    <a class="feature-a" href="${base}pages/phishingSim.html">Phishing Simulator</a>
  </div>

  <button class="sign-out-btn" id="sign-out-btn">
    <span><span class="ms">logout</span> Sign Out</span>
  </button>

  <button class="side-toggle"><span class="ms">menu_open</span></button>

</header>
`;

const sideToggle = document.querySelector(".side-toggle");
const sidebar = document.querySelector("nav");
const main = document.querySelector("main");

sideToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  sidebar.classList.toggle("open");
  main.classlist.toggle("open");
  sideToggle.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    !sideToggle.contains(e.target)
  ) {
    sidebar.classList.remove("open");
    sideToggle.classList.remove("open");
  }
});
