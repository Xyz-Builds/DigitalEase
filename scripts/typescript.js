const words = [
  "We've got you.",
  "Stay safe online.",
  "Browse wihout fear.",
  "Safety made simple.",
  "Your shield online.",
];
let i = 0;
const el = document.getElementById("word");

el.textContent = words[0];

setInterval(() => {
  i = (i + 1) % words.length;

  el.classList.add("out");

  setTimeout(() => {
    el.textContent = words[i];
    el.classList.remove("out");
  }, 370);
}, 2800);
