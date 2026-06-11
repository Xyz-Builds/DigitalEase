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

window.signOut = async () => {
  await supabase.auth.signOut();
  window.location.href = `${base}pages/signup.html`;
};

document
  .getElementById("sign-out-btn")
  ?.addEventListener("click", window.signOut);

console.log(user.user_metadata);

document.getElementById("sidebar").innerHTML = `
<nav>

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
