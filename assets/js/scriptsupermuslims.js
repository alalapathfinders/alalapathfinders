/* Portal page data-driven builder
   - To make a new portal, copy this file or keep one file and change the "course" object.
*/

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

// Footer year (if not already handled elsewhere)
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ========= EDIT THIS COURSE OBJECT ========= */
const course = {
  title: " ",
  heroImg: "assets/images/SMBanner.png", // your top banner image
  description:
  "Build noble character and manners through Islamic teachings.\n\n" +
  "Discover how great Muslims contributed to science, education, leadership, and society.\n\n" +
  "Develop a love for Jannah and a desire to live a life pleasing to Allah.",

  stars: [
    // use real images later (recommended: 200x200 jpg/png)
    { name: "Fizza Sheraz", img: "assets/images/walija.png" },
    { name: "Ezzah Jahangir", img: "assets/images/ezzah.png" },
    { name: "Zomaha Shahzad", img: "assets/images/hafsa.png" },
  ],
  syllabusItems: [
  { name: "Super Character (Adab)", img: "assets/images/adab.png" },
  { name: "Super Builders of Islam", img: "assets/images/builders.png" },
  { name: "Super Goal: Jannah", img: "assets/images/jannah.png" },
],

  resourceImages: {
    workbook: "assets/images/book.png",
    star: "assets/images/starstudent.png",
    recording: "assets/images/mic.png",
    quiz: "assets/images/quiz.png",
  },


  days: [
    {
      label: "Day 1 (20 July 2026)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1BahiwPW9TNlls-bMzBkD3AKlerit4hCO/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1eD5I-N6iQj-s6LtDKEUyJ3A4FNTzgBYT/view?usp=sharing",
        recordingUrl: "https://youtu.be/E1DHwN_qy-0",      // or Google Drive share link
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeAHaklu9_sGqEErv5NEYRloIxoTh0ar7GiUI5rgFd2VE30Cg/viewform",             // Google Form
      },
    },
    {
      label: "Day 2 (21 July 2026)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1jYf_217BeDkDOehWsgArRmfIPTWWt_N9/view?usp=sharing",
        starStudentsPdf: "#",
        recordingUrl: "https://youtu.be/NqWpKlYpygc",      // or Google Drive share link
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLScxtf_ucokm6wkoZT357bmFKACnAFBY2fhAQv5-nLtxOzt4oQ/viewform",             // Google Form
      },
    },
    {
      label: "Day 3 (22 July 2026)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",      // or Google Drive share link
        quizUrl: "#",             // Google Form
      },
    },
    {
      label: "Day 4 (23 July 2026)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",      // or Google Drive share link
        quizUrl: "#",             // Google Form
      },
    },
    {
      label: "Day 5 (24 July 2026)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",      // or Google Drive share link
        quizUrl: "#",             // Google Form
      },
    },
  ],
};
/* ========= STOP EDIT ========= */

function el(id){ return document.getElementById(id); }

function buildPills(){
  const wrap = el("coursePills");
  if (!wrap) return;
  wrap.innerHTML = course.pills.map(p => `
    <span class="portal-pill">
      <i class="fa-solid ${p.icon}"></i> ${p.text}
    </span>
  `).join("");
}

function buildStars(){
  const wrap = el("courseStars");
  if (!wrap) return;
  wrap.innerHTML = course.stars.map(s => `
    <div class="star">
      <img class="star__img" src="${s.img}" alt="${s.name}">
      <div class="star__name">${s.name}</div>
    </div>
  `).join("");
}

function buildDays(){
  const wrap = el("daysList");
  if (!wrap) return;

  wrap.innerHTML = course.days.map((d, idx) => {
    const r = d.resources || {};
    const safe = (v) => (v && v !== "#") ? v : null;

    const wb = safe(r.workbookPdf);
    const ss = safe(r.starStudentsPdf);
    const rec = safe(r.recordingUrl);
    const quiz = safe(r.quizUrl);

    // Optional: show workbook PDF preview when available
    const preview = wb ? `
      
      ` : "";

    return `
      <div class="day" data-index="${idx}">
        <button class="day__btn" type="button" aria-expanded="false">
          <span>${d.label}</span>
          <span class="day__chev">˅</span>
        </button>

       <div class="day__panel" role="region">
  <div class="day__resources">

    <div class="resgrid">

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.workbook}" alt="Workbook" />
        <div class="rescard__title">Workbook</div>
        ${wb
          ? `<a class="rescard__btn rescard__btn--primary" href="${wb}" target="_blank" rel="noopener">Open</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.star}" alt="Star Students" />
        <div class="rescard__title">Star Students List</div>
        ${ss
          ? `<a class="rescard__btn" href="${ss}" target="_blank" rel="noopener">Open</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.recording}" alt="Recording" />
        <div class="rescard__title">Class Recording</div>
        ${rec
          ? `<a class="rescard__btn" href="${rec}" target="_blank" rel="noopener">Watch</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.quiz}" alt="Quiz" />
        <div class="rescard__title">Quiz</div>
        ${quiz
          ? `<a class="rescard__btn rescard__btn--primary" href="${quiz}" target="_blank" rel="noopener">Open</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

    </div>

    ${preview}

  </div>
</div>

      </div>
    `;
  }).join("");

  // Accordion behavior
  wrap.querySelectorAll(".day").forEach(dayEl => {
    const btn = dayEl.querySelector(".day__btn");
    const panel = dayEl.querySelector(".day__panel");

    btn.addEventListener("click", () => {
      const open = dayEl.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

function initPortal(){
  if (el("courseTitle")) el("courseTitle").textContent = course.title;
  if (el("courseHeroImg")) el("courseHeroImg").src = course.heroImg;
  const descEl = el("courseDesc");
if (descEl) {
  // Split by new lines into bullet points
  const points = (course.description || "")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  descEl.innerHTML = points.map(p => `<li>${p}</li>`).join("");
}

  buildPills();
buildStars();
buildSyllabus();
buildDays();

}

document.addEventListener("DOMContentLoaded", initPortal);
function buildSyllabus(){
  const wrap = el("courseSyllabus");
  if (!wrap) return;

  wrap.innerHTML = course.syllabusItems.map(item => `
    <div class="star">
      <img class="star__img" src="${item.img}" alt="${item.name}">
      <div class="star__name">${item.name}</div>
    </div>
  `).join("");
}
