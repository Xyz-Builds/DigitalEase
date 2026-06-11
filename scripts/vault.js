import { supabase } from "././scripts/supabase.js";

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  console.error("No user logged in");
} else {
  const { data, error } = await supabase
    .from("vault")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    const vaultContainer = document.getElementById("vaultContainer");

    if (!vaultContainer) {
      console.error("Vault container not found");
    } else {
      if (data.length === 0) {
        vaultContainer.innerHTML = `
          <div class="empty-state">
            <h2>Your vault is empty</h2>
            <p>Generate and save a password to see it here.</p>
          </div>
        `;
      } else {
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
    }
  }
}
