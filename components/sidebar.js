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

const { data: progress } = await supabase
  .from("lesson_progress")
  .select("lesson_id")
  .eq("user_id", user.id)
  .eq("completed", true)
  .order("lesson_id", { ascending: false })
  .limit(1);

let lessonHref = `${base}pages/dashboard/lessons.html?id=1`;

if (progress && progress.length > 0) {
  lessonHref = `${base}pages/dashboard/lessons.html?id=${progress[0].lesson_id + 1}`;
}

document.getElementById("sidebar").innerHTML = `
<nav>
  <h2 class="section-title">Dashboard</h2>

  <a class="side-a" href="${base}pages/dashboard/dashboard.html"><button class="side-btn"><span class="ms dashboard-ms">dashboard</span>Dashboard</button></a>

  <h2 class="section-title">Features</h2>
  <div class="side-buttons">
    <a class="side-a" href="${base}pages/dashboard/passwordGenerator.html"><button class="side-btn"><span class="ms">password</span>Password Generator</button></a>
    <a class="side-a" href="${lessonHref}"><button class="side-btn"><span class="ms">book_ribbon</span>Lessons</button></a>
    <a class="side-a" href="${base}pages/dashboard/phishingSim.html"><button class="side-btn"><span class="ms">gpp_maybe</span>Phishing Simulator</button></a>
    <a class="side-a" href="${base}pages/dashboard/vault.html"><button class="side-btn"><span class="ms">mobile_lock_landscape</span>Vault</button></a>
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
