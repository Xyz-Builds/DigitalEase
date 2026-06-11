const base = new URL("../", import.meta.url).href;

const { supabase } = await import(`${base}scripts/supabase.js`);

const {
  data: { user },
  error,
} = await supabase.auth.getUser();

console.log("USER:", user);
console.log("ERROR:", error);

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

const avatar = document.getElementById("avatar");
if (avatar) {
  avatar.src = meta.avatar_url || "";
}

window.signOut = async () => {
  await supabase.auth.signOut();
  window.location.href = `${base}pages/signup.html`;
};

document
  .getElementById("sign-out-btn")
  ?.addEventListener("click", window.signOut);

console.log(user.user_metadata);

document.getElementById("main-header").innerHTML = `
<header>
  <a href="${base}index.html" class="logo-link">
    <img class="icon" src="${base}images/DigitalEase logo.png" alt="DigitalEase">
  </a>

  <div class="buttons">
    <a class="feature-a">Privacy Checkup</a>
    <a class="feature-a">Password Generator</a>
    <a class="feature-a">Phishing Simulator</a>
  </div>

  <button class="sign-out-btn" id="sign-out-btn">
    <span>Sign Out</span>
  </button>

  <button class="hamburger" aria-label="Open menu">
    <span class="ms">menu</span>
  </button>

  <div class="side-bar">
    <hr class="account-divider">

    <div class="account-wrap">
      <span class="ms">account_circle</span>

      <div class="account-info" id="account-info">
        ${meta.first_name + " " + meta.last_name}
      </div>
    </div>
  </div>

</header>
`;

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".side-bar");
const mainBody = document.querySelector("main");

if (hamburger && mobileMenu && mainBody) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.add("open");
    mainBody.classList.add("open");
  });

  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("open") &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove("open");
      mainBody.classList.remove("open");
    }
  });
}
