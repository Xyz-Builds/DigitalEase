import { supabase } from "././scripts/supabase.js";

async function loadVault() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("vault")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const vaultContainer = document.getElementById("vaultContainer");

  if (!vaultContainer) {
    console.error("Vault container not found");
    return;
  }

  if (data.length === 0) {
    vaultContainer.innerHTML = `
      <div class="empty-state">
        <h2>Your vault is empty</h2>
        <p>Generate and save a password to see it here.</p>
      </div>
    `;
    return;
  }

  data.forEach((entry) => {
    vaultContainer.innerHTML += `
      <div class="vault-card">
        <span class="vault-password">${entry.password}</span>
        <span class="vault-date">
          ${new Date(entry.created_at).toLocaleDateString()}
        </span>
      </div>
    `;
  });
}

loadVault();
