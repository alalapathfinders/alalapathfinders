// =====================================================================
// SCRIPTTEAM.JS — Our Team page only
// Builds department members + alumni cards (TEXT ONLY, no images)
// =====================================================================

(function () {
  const memberGrids = document.querySelectorAll(".members-grid[data-members]");
  const alumniGrid = document.querySelector(".alumni-grid[data-alumni='true']");

  const membersByDept = {
    ops: [
      { name: "Hadiyah Asim", role: "Operations Team Member", pos: "Grade 7 Student" },
      { name: "Manha Ali", role: "Operations Team Member", pos: "Grade 7 Student" },
      { name: "Maryam Idrees", role: "Operations Team Member", pos: "Senior 2 Student" },
      { name: "Shumaim Zuberi", role: "Operations Team Member", pos: "Grade 7 Student" },
      { name: "Syeda Qaswa", role: "Operations Team Member", pos: "Grade 7 Student" },
    ],
    pub: [
      { name: "Eshaal Sheikh", role: "Publications Team Member", pos: "Grade 7 Student" },
      { name: "Hareem Toor", role: "Publications Team Member", pos: "Grade 7 Student" },
      { name: "Sarah Farooqui", role: "Publications Team Member", pos: "Grade 8 Student" },
      { name: "Zohaa Iftikhar", role: "Publications Team Member", pos: "Grade 7 Student" },
    ],
    gfx: [
      { name: "Maryam Waqar", role: "Graphics & Media Team Member", pos: "Senior 2 Student" },
      { name: "Azwa Fatima", role: "Graphics & Media Team Member", pos: "Senior 1 Student" },
    ],
  };

  const alumni = [
    { name: "Aafia Azfar", role: "Alumni", pos: "Class of 2023" },
    { name: "Aiman Abdullah", role: "Alumni", pos: "Class of 2024" },
    { name: "Arwa Fatima", role: "Alumni", pos: "Class of 2022" },

    { name: "Ayesha Farooqui", role: "Alumni", pos: "Class of 2022" },
    { name: "Inaya Shahzad", role: "Alumni", pos: "Class of 2026" },
    { name: "Kashmala Waqas", role: "Alumni", pos: "Class of 2024" },

    { name: "Khairun Nisa", role: "Alumni", pos: "Class of 2024" },
    { name: "Mahjabeen Sajad", role: "Alumni", pos: "Class of 2022" },
    { name: "Walija Khalid", role: "Alumni", pos: "Class of 2026" },

    { name: "Zomaha Shahzad", role: "Alumni", pos: "Class of 2022" },
  ];

  function personCard(m) {
    const role = m.role || "Team Member";
    const name = m.name || "Name";
    const pos = m.pos || "";

    return `
      <article class="member-card member-card--text">
        <div class="member-text">
          <h5 class="member-name">${name}</h5>
          <div class="member-role">${role}</div>
          ${pos ? `<div class="member-pos">${pos}</div>` : ""}
        </div>
      </article>
    `;
  }

  memberGrids.forEach((grid) => {
    const key = grid.getAttribute("data-members");
    const arr = membersByDept[key] || [];

    if (!arr.length) {
      grid.innerHTML = `
        <div class="empty-note">
          <em>Member cards will be added here.</em>
        </div>
      `;
      return;
    }

    grid.innerHTML = arr.map(personCard).join("");
  });

  if (alumniGrid) {
    alumniGrid.innerHTML = alumni.map(personCard).join("");
  }
})();