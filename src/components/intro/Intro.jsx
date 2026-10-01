import { useEffect, useRef, useState } from "react";
import "./Intro.css";

const MIN_INTRO_TIME = 3500;
const FADE_DURATION = 800;
const BADGE_TEXT = "balaji-webs.netlify.app";

/* =========================================================
   ICON ROW
   The three small line-drawn icons above the heading.
   (Previously its own file, IntroIcons.jsx — merged in here
   since it's only ever used by Intro.)
========================================================= */

const ICONS = [
  {
    viewBox: "0 0 24 24",
    content: (
      <>
        <polyline points="8 6 2 12 8 18" />
        <polyline points="16 6 22 12 16 18" />
      </>
    ),
  },
  {
    viewBox: "0 0 24 24",
    content: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </>
    ),
  },
  {
    viewBox: "0 0 24 24",
    content: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.6 4 6 4 9s-1.4 6.4-4 9c-2.6-2.6-4-6.4-4-9s1.4-6.4 4-9z" />
      </>
    ),
  },
];

function IconRow({ show }) {
  return (
    <div className="icon-row">
      {ICONS.map((icon, index) => (
        <div
          key={index}
          className={`icon-circle ${show[index] ? "show" : ""}`}
        >
          <svg viewBox={icon.viewBox} xmlns="http://www.w3.org/2000/svg">
            {icon.content}
          </svg>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   INTRO
   (Previously split into Intro.jsx + Curtain.jsx — merged
   into one file since Curtain was only used here.)
========================================================= */

function Intro({ onComplete }) {
  const introStartTime = useRef(Date.now());
  const completedRef = useRef(false);

  const [iconShow, setIconShow] = useState([false, false, false]);
  const [dividerShow, setDividerShow] = useState(false);
  const [dividerFillShow, setDividerFillShow] = useState(false);

  const [welcomeShow, setWelcomeShow] = useState(false);
  const [toMyShow, setToMyShow] = useState(false);
  const [portfolioShow, setPortfolioShow] = useState(false);

  const [subtitleShow, setSubtitleShow] = useState(false);

  const [badgeShow, setBadgeShow] = useState(false);
  const [badgeText, setBadgeText] = useState("");

  const [contentFaded, setContentFaded] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  const [projectLoaded, setProjectLoaded] = useState(false);
  const [introAnimationFinished, setIntroAnimationFinished] =
    useState(false);

  // =========================================================
  // LOCK SCROLL WHILE THE INTRO IS ON SCREEN
  // Body scroll is restored automatically on unmount (App only
  // renders <Intro /> while !introFinished). Clicks are blocked
  // by .intro's pointer-events in Intro.css, which switches
  // back to none only once the curtain has opened.
  // =========================================================

  // useEffect(() => {
  //   const previousOverflow = document.body.style.overflow;
  //   document.body.style.overflow = "hidden";

  //   return () => {
  //     document.body.style.overflow = previousOverflow;
  //   };
  // }, []);
useEffect(() => {
  const preventScroll = (e) => {
    e.preventDefault();
  };

  window.addEventListener("wheel", preventScroll, {
    passive: false,
  });

  window.addEventListener("touchmove", preventScroll, {
    passive: false,
  });

  return () => {
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
  };
}, []);
  
  // =========================================================
  // INTRO ANIMATION
  // =========================================================

  useEffect(() => {
    const timers = [];
    const intervals = [];

    // Icons
    timers.push(
      setTimeout(() => {
        setIconShow((prev) => [true, prev[1], prev[2]]);
      }, 150)
    );

    timers.push(
      setTimeout(() => {
        setIconShow((prev) => [prev[0], true, prev[2]]);
      }, 300)
    );

    timers.push(
      setTimeout(() => {
        setIconShow((prev) => [prev[0], prev[1], true]);
      }, 450)
    );

    // Divider
    timers.push(
      setTimeout(() => {
        setDividerShow(true);

        const dividerTimer = setTimeout(() => {
          setDividerFillShow(true);
        }, 200);

        timers.push(dividerTimer);
      }, 300)
    );

    // Heading
    timers.push(
      setTimeout(() => {
        setWelcomeShow(true);
      }, 750)
    );

    timers.push(
      setTimeout(() => {
        setToMyShow(true);
      }, 900)
    );

    timers.push(
      setTimeout(() => {
        setPortfolioShow(true);
      }, 1250)
    );

    // Subtitle
    timers.push(
      setTimeout(() => {
        setSubtitleShow(true);
      }, 1750)
    );

    // Badge + typewriter
    timers.push(
      setTimeout(() => {
        setBadgeShow(true);

        const typeTimer = setTimeout(() => {
          let index = 0;

          const typeInterval = setInterval(() => {
            if (index <= BADGE_TEXT.length) {
              setBadgeText(BADGE_TEXT.slice(0, index));
              index += 1;
            } else {
              clearInterval(typeInterval);
              setIntroAnimationFinished(true);
            }
          }, 30);

          intervals.push(typeInterval);
        }, 250);

        timers.push(typeTimer);
      }, 2150)
    );

    // Page load
    const handleLoad = () => {
      setProjectLoaded(true);
    };

    if (document.readyState === "complete") {
      setProjectLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);

      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // =========================================================
  // FINISH INTRO
  // =========================================================

  useEffect(() => {
    if (!introAnimationFinished || !projectLoaded) {
      return;
    }

    const elapsed = Date.now() - introStartTime.current;

    const remaining = Math.max(0, MIN_INTRO_TIME - elapsed);

    let curtainTimer;

    const finishTimer = setTimeout(() => {
      // Fade intro content
      setContentFaded(true);

      // Wait for fade, then open curtain
      curtainTimer = setTimeout(() => {
        setCurtainOpen(true);
      }, FADE_DURATION);
    }, remaining);

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(curtainTimer);
    };
  }, [introAnimationFinished, projectLoaded]);

  // =========================================================
  // CURTAIN TRANSITION COMPLETE
  // =========================================================

  const handleCurtainTransitionEnd = (event) => {
    if (event.propertyName !== "transform") {
      return;
    }

    if (!curtainOpen) {
      return;
    }

    if (completedRef.current) {
      return;
    }

    completedRef.current = true;

    onComplete?.();
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className={`intro ${curtainOpen ? "intro-open" : ""}`}>
      <div
        className={`curtain ${curtainOpen ? "is-open" : ""}`}
        onTransitionEnd={handleCurtainTransitionEnd}
      >
        <svg
          viewBox="0 0 1000 1300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 H1000 V1120 Q500,950 0,1120 Z" />
        </svg>

        <div className="curtain-content">
          <div className={`content ${contentFaded ? "fade-out" : ""}`}>
            <IconRow show={iconShow} />

            <h1 className="heading">
              <span className="line">
                <span
                  className={`part from-left ${
                    welcomeShow ? "show" : ""
                  }`}
                >
                  Welcome
                </span>

                <span
                  className={`part from-right ${
                    toMyShow ? "show" : ""
                  }`}
                >
                  to my
                </span>
              </span>

              <span className="line">
                <span
                  className={`part from-bottom ${
                    portfolioShow ? "show" : ""
                  }`}
                >
                  Portfolio
                </span>
              </span>
            </h1>

            <p className={`subtitle ${subtitleShow ? "show" : ""}`}>
              Python Developer &amp; Full-Stack Builder
            </p>

            <div className={`badge ${badgeShow ? "show" : ""}`}>
              <span>{badgeText}</span>
              <span className="cursor" />
            </div>

            <div
              className={`divider-track ${dividerShow ? "show" : ""}`}
            >
              <div
                className={`divider-fill ${
                  dividerFillShow ? "show" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;