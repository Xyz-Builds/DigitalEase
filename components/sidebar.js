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

document.getElementById("sidebar").innerHTML = `
<nav>

  <h2 class="section-title">Features</h2>
  <div class="buttons">
    <a class="side-a"><button class="side-btn"><span class="ms">password</span>Password Generator</button></a>
    <a class="side-a"><button class="side-btn"><span class="ms">book_ribbon</span>Lessons</button></a>
    <a class="side-a"><button class="side-btn"><span class="ms">gpp_maybe</span>Phishing Simulator</button></a>
  </div>

  <hr class="account-divider">

  <h2 class="section-title">Account</h2>
  <div class="account-wrap">
    <img class="pfp" src="${meta.avatar_url}">

    <div class="account-info">
      <div>${meta.full_name}</div>

      <button class="sign-out-btn" id="sign-out-btn">
        <span>
          <span class="ms">logout</span>
          Sign Out
        </span>
      </button>
    </div>
  </div>

</nav>
`;

document
  .getElementById("sign-out-btn")
  ?.addEventListener("click", window.signOut);
