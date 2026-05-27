const base = document.currentScript.src.substring(
  0,
  document.currentScript.src.lastIndexOf("components/"),
);

document.getElementById("header").innerHTML = `
  <header>
    <a href="${base}index.html" class="logo-link">
      <img class="icon" src="${base}images/DigitalEase logo.png" alt="DigitalEase" />
    </a>

    <div class="buttons">
      <a href="${base}pages/about.html">About us</a>
      <a href="${base}pages/contact.html">Contact us</a>
    </div>

    <a href="${base}pages/signup.html" class="sign-up-btn">
      <span>Sign up <span class="ms">arrow_forward</span></span>
    </a>

    <button class="hamburger" aria-label="Open menu"><span class="ms">menu</button>

    <div class="mobile-menu">
      <div class="sec-btns">
        <a class="about-a menu-a" href="${base}pages/about.html"><button class="btn"><span class="ms">article_person</span>About us</button></a>
        <a class="contact-a menu-a" href="${base}pages/contact.html"><button class="btn"><span class="ms">chat</span>Contact us</button></a>
      </div>

      <hr class="account-divider">
      
      <div class="account-wrap">
        <span class="ms">account_circle</span>
        <div class="account-info">
          No Account
          <a class="sign-up-a menu-a" href="${base}pages/signup.html"><button class="btn"><span class="ms">person</span>Sign up</button></a>
        </div>
      </div>  
    </div>
  </header>
`;

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const mainBody = document.querySelector("main");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenu.classList.add("open");
  mainBody.classList.add("open");
});

document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("open") &&
    !mobileMenu.contains(e.target) &&
    e.target !== hamburger
  ) {
    mobileMenu.classList.remove("open");
    mainBody.classList.remove("open");
  }
});
