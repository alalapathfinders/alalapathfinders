// Simple fade-in on scroll (optional)
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".story-lines p, .value-card");

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  items.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "0.6s ease";
    io.observe(el);
  });
});
