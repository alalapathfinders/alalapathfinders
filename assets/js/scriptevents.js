/* Prevent reload jolt: allow animations only after full load */
window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

/* =========================================================
  1) FOOTER YEAR
========================================================= */
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* =========================================================
  2) MOBILE NAV DRAWER (Burger Open/Close)
========================================================= */
(() => {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  // If any element is missing, do nothing (prevents console errors)
  if (!burger || !mobileMenu || !closeMenu) return;

  function openDrawer() {
    mobileMenu.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Toggle on burger click
  burger.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeDrawer() : openDrawer();
  });

  // Close icon
  closeMenu.addEventListener("click", closeDrawer);

  // Close when clicking backdrop (not the menu card)
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeDrawer();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Close after clicking any link inside mobile menu
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
})();


