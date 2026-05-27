const words = [
  "We've got you.",
  "Stay safe online.",
  "Browse wihout fear.",
  "Safety made simple.",
  "Your shield online.",
];

const words2 = [
  "Get Started",
  "Start browsing safely.",
  "Your safety starts here.",
  "Begin your ease now.",
  "Your digital ease awaits.",
];

const el = document.getElementById("word");
const el2 = document.getElementById("word2");

function cycleWords(words, el) {
  if (!el) return;

  let i = 0;
  el.textContent = words[0];

  setInterval(() => {
    i = (i + 1) % words.length;
    el.classList.add("out");

    setTimeout(() => {
      el.textContent = words[i];
      el.classList.remove("out");
    }, 370);
  }, 2800);
}

cycleWords(words, el);
cycleWords(words2, el2);
