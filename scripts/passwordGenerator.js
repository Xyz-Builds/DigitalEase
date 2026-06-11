const generatedPass = document.getElementById("generatedPass");
const saveVault = document.getElementById("savePass");
const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

function generatePassword(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

async function savePassword(password) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.from("vault").insert({
    user_id: user.id,
    password,
  });

  if (error) {
    console.error(error);
  }
}

async function updatePassword() {
  const length = Number(lengthInput.value) || 16;

  const password = generatePassword(length);

  generatedPass.textContent = password;

  if (saveVault.checked) {
    await savePassword(password);
  }
}

updatePassword();

generateBtn.addEventListener("click", updatePassword);

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(generatedPass.textContent);

  copyBtn.innerHTML = '<span class="material-symbols-outlined">check</span>';

  setTimeout(() => {
    copyBtn.innerHTML =
      '<span class="material-symbols-outlined">content_copy</span>';
  }, 1500);
});
