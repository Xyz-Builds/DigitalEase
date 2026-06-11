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

function updatePassword() {
  const password = generatePassword(Number(lengthInput.value));

  generatedPass.textContent = password;

  if (saveVault.checked) {
    console.log("Save to vault:", password);
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
