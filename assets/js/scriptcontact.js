// CONTACT PAGE JS (page-only; global.js handles header/footer/nav)

(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const subjectEl = document.getElementById("subject");
  const messageEl = document.getElementById("message");

  const errName = document.getElementById("errName");
  const errEmail = document.getElementById("errEmail");
  const errSubject = document.getElementById("errSubject");
  const errMessage = document.getElementById("errMessage");

  const successEl = document.getElementById("formSuccess");

  function setError(el, msg) {
    if (!el) return;
    el.textContent = msg || "";
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  }

  function trimVal(el) {
    return String(el?.value || "").trim();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear
    setError(errName, "");
    setError(errEmail, "");
    setError(errSubject, "");
    setError(errMessage, "");
    if (successEl) successEl.textContent = "";

    const name = trimVal(nameEl);
    const email = trimVal(emailEl);
    const subject = trimVal(subjectEl);
    const message = trimVal(messageEl);

    let ok = true;

    if (name.length < 2) { setError(errName, "Please enter your name."); ok = false; }
    if (!isEmail(email)) { setError(errEmail, "Please enter a valid email."); ok = false; }
    if (subject.length < 3) { setError(errSubject, "Please enter a subject."); ok = false; }
    if (message.length < 10) { setError(errMessage, "Please write a longer message (min 10 chars)."); ok = false; }

    if (!ok) return;

    // Build mailto
    const to = "alalapathfinders@gmail.com";
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `${message}\n\n` +
      `— Sent from Al-Ala Pathfinders website`;

    const mailto =
      `mailto:${encodeURIComponent(to)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    if (successEl) {
      successEl.textContent = "Opening your email app…";
    }

    // Optional reset
    // form.reset();
  });
})();
