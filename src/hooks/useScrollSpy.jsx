import { useEffect, useState } from "react";

export function useScrollSpy({
  selector = "section[id]",
  heroId = "hero",
} = {}) {
  const [activeId, setActiveId] = useState(heroId);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = Array.from(document.querySelectorAll(selector));
    if (!sections.length) return;

    const nav = document.querySelector("[data-navbar]");
    const getNavH = () => (nav ? nav.getBoundingClientRect().height : 0);

    let ticking = false;

    const getActiveId = () => {
      const navH = getNavH();
      const viewportCenter = navH + (window.innerHeight - navH) / 2;

      let bestId = sections[0]?.id ?? heroId;
      let bestDist = Infinity;

      for (const el of sections) {
        const rect = el.getBoundingClientRect();

        if (rect.bottom <= navH || rect.top >= window.innerHeight) continue;

        const sectionCenter = rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      }

      return bestId;
    };

    const onScrollResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActiveId(getActiveId());
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);

    onScrollResize();
    return () => {
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [selector, heroId]);

  return activeId;
}
