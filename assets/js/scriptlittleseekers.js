/* =========================================================
  PORTAL BUILDER (Reusable)
  - Works with ANY number of days
  - Works even if teachers/syllabus are empty
========================================================= */

function el(id){ return document.getElementById(id); }

/* ========= EDIT THIS COURSE OBJECT ========= */
const course = {
  title: "Little Seekers",
  heroImg: "assets/images/LSBanner.png",
  description:
    "Recognize and understand the names and attributes of Allah in a meaningful way.\n\n" +
    "Learn from Islamic heroes and apply their values in daily life.\n\n" +
    "Express faith creatively through stories, crafts, and interactive activities.",

  // Teachers
  stars: [
    { name: "Ezzah Jahangir", img: "assets/images/ezzah.png" },
    { name: "Walija Khalid", img: "assets/images/walija.png" },
  ],

  // Syllabus
  syllabusItems: [
    { name: "Legends of Islam", img: "assets/images/legends.png" },
    { name: "Names of Allah SWT", img: "assets/images/names.jpg" },
  ],

  // Resource icons
  resourceImages: {
    workbook: "assets/images/book.png",
    star: "assets/images/starstudent.png",
    recording: "assets/images/mic.png",
    quiz: "assets/images/quiz.png",
  },

  // Days (add/remove freely)
  days: [
    {
      label: "Day 1 (11 July 2024)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
    {
      label: "Day 2 (12 July 2024)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
    {
      label: "Day 3 (13 July 2024)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
    {
      label: "Day 4 (15 July 2024)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
        {
      label: "Day 5 (16 July 2024)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
  ],
};
/* ========= STOP EDIT ========= */

function safeLink(v){
  return (v && v !== "#") ? v : null;
}

function buildPeople(list, targetId){
  const wrap = el(targetId);
  if (!wrap) return;

  if (!Array.isArray(list) || list.length === 0){
    wrap.innerHTML = `<div class="portal-empty">Coming soon</div>`;
    return;
  }

  wrap.innerHTML = list.map(item => `
    <div class="star">
      <img class="star__img" src="${item.img}" alt="${item.name}">
      <div class="star__name">${item.name}</div>
    </div>
  `).join("");
}

function buildDays(){
  const wrap = el("daysList");
  if (!wrap) return;

  const days = Array.isArray(course.days) ? course.days : [];

  if (days.length === 0){
    wrap.innerHTML = `<div class="portal-empty">Days will be uploaded soon.</div>`;
    return;
  }

  wrap.innerHTML = days.map((d, idx) => {
    const r = d.resources || {};
    const wb = safeLink(r.workbookPdf);
    const ss = safeLink(r.starStudentsPdf);
    const rec = safeLink(r.recordingUrl);
    const quiz = safeLink(r.quizUrl);

    return `
      <div class="day" data-index="${idx}">
        <button class="day__btn" type="button" aria-expanded="false">
          <span>${d.label || `Day ${idx + 1}`}</span>
          <span class="day__chev">˅</span>
        </button>

        <div class="day__panel" role="region">
          <div class="resgrid">

            <div class="rescard">
              <img class="rescard__img" src="${course.resourceImages.workbook}" alt="Workbook" />
              <div class="rescard__title">Workbook</div>
              ${wb
                ? `<a class="rescard__btn" href="${wb}" target="_blank" rel="noopener">Open</a>`
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
                ? `<a class="rescard__btn" href="${quiz}" target="_blank" rel="noopener">Open</a>`
                : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
              }
            </div>

          </div>
        </div>
      </div>
    `;
  }).join("");

  // Accordion
  wrap.querySelectorAll(".day").forEach(dayEl => {
    const btn = dayEl.querySelector(".day__btn");
    btn.addEventListener("click", () => {
      const open = dayEl.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

function initPortal(){
  if (el("courseTitle")) el("courseTitle").textContent = course.title || "";
  if (el("courseHeroImg")) el("courseHeroImg").src = course.heroImg || "";

  const descEl = el("courseDesc");
  if (descEl){
    const points = (course.description || "")
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    descEl.innerHTML = points.map(p => `<li>${p}</li>`).join("");
  }

  // Teachers + Syllabus
  buildPeople(course.stars, "courseStars");
  buildPeople(course.syllabusItems, "courseSyllabus");

  // Days
  buildDays();
}

document.addEventListener("DOMContentLoaded", initPortal);
