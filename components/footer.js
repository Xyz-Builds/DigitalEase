document.getElementById("footer").innerHTML = `
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="../../index.html" class="footer-logo">
        <img class="logo" src="../../images/DigitalEase logo.png">
      </a>
      <p class="footer-tagline">
        Helping you navigate the internet safely. Simple tools, clear guidance, and real protection for everyday users.
      </p>
    </div>

    <div>
      <p class="footer-col-title">Navigate</p>
      <ul class="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="../../pages/about.html">About</a></li>
        <li><a href="../../pages/features.html">Features</a></li>
        <li><a href="../../pages/contact.html">Contact</a></li>
      </ul>
    </div>

    <div>
      <p class="footer-col-title">Legal</p>
      <ul class="footer-links">
        <li><a href="../../components/files/privacy-policy.html">Privacy Policy</a></li>
        <li><a href="../../components/files/terms-of-service.html">Terms of Service</a></li>
      </ul>
    </div>

  </div>

  <hr class="footer-divider" />

  <div class="footer-bottom">
    <p class="footer-copy">
      © ${new Date().getFullYear()} <span>DigitalEase</span>. All rights reserved.
    </p>
    <div class="footer-badge">
      Secured & privacy-first
    </div>
  </div>
`;
