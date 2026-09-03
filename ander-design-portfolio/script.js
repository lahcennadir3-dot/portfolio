/* =========================================================
   ANDER DESIGN — Portfolio Script
   - Mobile nav toggle
   - Scroll-triggered reveal animations (staggered)
   - Work filter tabs
   - Footer year
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setFooterYear();
  initMobileNav();
  initScrollReveal();
  initWorkFilters();
});

/* ---------- Footer year ---------- */
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close menu after tapping a link (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- Scroll reveal ----------
   Elements with .reveal fade + rise into place once they enter
   the viewport. Items revealed in the same batch (e.g. a grid
   of work cards) get a small stagger so they don't all snap
   in at once. */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblingsInSameParent = Array.from(
          el.parentElement.children
        ).filter((c) => c.classList.contains("reveal"));
        const indexInGroup = siblingsInSameParent.indexOf(el);
        const delay = Math.min(indexInGroup, 5) * 80;

        window.setTimeout(() => el.classList.add("is-visible"), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Work filter tabs ---------- */
function initWorkFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".work-card");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });

      cards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}
