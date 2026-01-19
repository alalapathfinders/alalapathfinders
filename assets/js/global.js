async function loadPartial(id, url) {
    const el = document.getElementById(id);
    if (!el) return false;
    
    try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
        el.innerHTML = await res.text();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function initFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initMobileNav() {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");
    
    if (!burger || !mobileMenu || !closeMenu) return;

    function openDrawer() {
        mobileMenu.classList.add("open");
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Close menu");
        document.body.style.overflow = "hidden";
    }
    
    function closeDrawer() {
        mobileMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
    }

    
    burger.addEventListener("click", () => {
        mobileMenu.classList.contains("open") ? closeDrawer() : openDrawer();
    });
    
    closeMenu.addEventListener("click", closeDrawer);
    
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) closeDrawer();
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDrawer();
    });
    
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeDrawer);
    });
    // If user rotates/expands screen, ensure menu isn't stuck open
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeDrawer();
    });

}

function initActiveNavLink() {
    const path = location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach((a) => {
        const href = a.getAttribute("href");
        if (!href) return;
        
        const hrefPage = href.split("/").pop();
        if (hrefPage === path) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
    });
}

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});

(async function boot() {
    const headerLoaded = await loadPartial("siteHeader", "partials/header.html");
    const footerLoaded = await loadPartial("siteFooter", "partials/footer.html");
    
    // Init shared behaviors AFTER partials exist
    if (footerLoaded) initFooterYear();
    if (headerLoaded) {
        initMobileNav();
        initActiveNavLink();
    }
})();