import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in the middle of the
 * viewport, so the navbar can highlight the matching link.
 */
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // Only the band around the middle of the screen counts
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => io.observe(el));

    // Clear highlight when back at the hero
    const onScroll = () => {
      if (window.scrollY < 200) setActiveId(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [key]);

  return activeId;
}
