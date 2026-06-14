import { supabase } from "./supabase.js";

export async function updateStreak() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("user_stats")
    .select("streak,last_activity_date")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(error);
    return;
  }

  if (!data) {
    const { error: insertError } = await supabase.from("user_stats").insert({
      user_id: user.id,
      streak: 1,
      last_activity_date: today,
    });

    if (insertError) {
      console.error(insertError);
    }

    return;
  }

  const currentStreak = data.streak || 0;
  const lastActivity = data.last_activity_date;

  if (lastActivity === today) {
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayString = yesterday.toISOString().split("T")[0];

  let newStreak;

  if (lastActivity === yesterdayString) {
    newStreak = currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const { error: updateError } = await supabase
    .from("user_stats")
    .update({
      streak: newStreak,
      last_activity_date: today,
    })
    .eq("user_id", user.id);

  if (updateError) {
    console.error(updateError);
  }
}
