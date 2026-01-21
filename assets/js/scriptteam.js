// =====================================================================
// SCRIPTTEAM.JS — Our Team page only
// - global.js already loads header/footer + nav behavior
// - Here we only build the "members" cards (easy to expand later)
// =====================================================================

(function () {
  const memberGrids = document.querySelectorAll(".members-grid[data-members]");
  if (!memberGrids.length) return;

  // EDIT THIS DATA anytime (add/remove members freely)
  const membersByDept = {
    ops: [
      // { name: "Name", role: "Team Member", img: "assets/images/team/members/ops-1.png" },
    ],
    pub: [
      // { name: "Name", role: "Team Member", img: "assets/images/team/members/pub-1.png" },
    ],
    gfx: [
      // { name: "Name", role: "Team Member", img: "assets/images/team/members/gfx-1.png" },
    ],
    media: [
      // { name: "Name", role: "Team Member", img: "assets/images/team/members/media-1.png" },
    ],
  };

function memberCard(m) {
  const img = m.img || "assets/images/team/placeholder.png";
  const role = m.role || "Team Member";
  const name = m.name || "Name";

  return `
    <article class="member-card">
      <div class="member-avatar">
        <img src="${img}" alt="${name}" />
      </div>
      <div>
        <h5 class="member-name">${name}</h5>
        <div class="member-role">${role}</div>
      </div>
    </article>
  `;
}

  memberGrids.forEach((grid) => {
    const key = grid.getAttribute("data-members");
    const arr = membersByDept[key] || [];

    if (!arr.length) {
      // Clean placeholder when empty (keeps layout nice)
      grid.innerHTML = `
        <div class="empty-note">
          <em>Member cards will be added here.</em>
        </div>
      `;
      // tiny inline styles via CSS class already? We'll add minimal rule by injecting once.
      return;
    }

    grid.innerHTML = arr.map(memberCard).join("");
  });

})();
