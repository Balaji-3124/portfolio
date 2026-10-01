import { useEffect, useLayoutEffect } from "react";

/**
 * Global scroll-reveal.
 * Any element with data-reveal="up | left | right" (and an optional
 * data-reveal-delay="200" in ms) fades in when it enters the viewport.
 * Styles live in src/index.css.
 */
export default function useScrollReveal(enabled = true) {
  // Hide [data-reveal] elements before first paint (no flash)
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    return () => root.classList.remove("reveal-ready");
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const seen = new WeakSet();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    const observe = (node) => {
      if (seen.has(node)) return;
      seen.add(node);
      const delay = node.getAttribute("data-reveal-delay");
      if (delay) node.style.setProperty("--reveal-delay", `${delay}ms`);
      io.observe(node);
    };

    const scan = (scope) =>
      scope.querySelectorAll("[data-reveal]").forEach(observe);

    scan(document);

    // Pick up elements rendered later (conditional / lazy content)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.matches("[data-reveal]")) observe(n);
          scan(n);
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [enabled]);
}
