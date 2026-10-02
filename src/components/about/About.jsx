import { useEffect, useRef } from "react";
import "./about.css";
import porfileimg from "../../assets/profile.png";
import BalajiResume from "../../assets/Balaji_T.pdf";
function About() {
  const cardRef = useRef(null);
  const clipRef = useRef(null);
  const sceneRef = useRef(null);
  const ropeRefs = useRef({});
  const sectionRef = useRef(null);
  const entryPlayedRef = useRef(false);
  const dragHintRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const clip = clipRef.current;
    const scene = sceneRef.current;

    const {
      left,
      right,
      leftHighlight,
      rightHighlight,
      leftTexture,
      rightTexture,
    } = ropeRefs.current;

    if (!card || !clip || !scene) return;

    /* =========================================================
       ROPE ANCHORS
    ========================================================= */

    const LEFT_ANCHOR = {
      x: 150,
      y: -90,
    };

    const RIGHT_ANCHOR = {
      x: 280,
      y: -90,
    };

    /* =========================================================
       CARD SETTINGS
    ========================================================= */

    const CARD_TOP = 150;
    const CARD_W = 294;
    const CARD_H = 380;

    const ATTACH_OFFSET_Y = -18;

    /* =========================================================
       PHYSICS
    ========================================================= */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let velocityX = 0;
    let velocityY = 0;

    let rotation = 0;

    let dragging = false;
    let entryPlaying = false;

    let pointerStartX = 0;
    let pointerStartY = 0;

    let startX = 0;
    let startY = 0;

    /* =========================================================
       DRAG BOUNDS
    ========================================================= */

    let boundXNeg = -150;
    let boundXPos = 150;

    let boundYUp = -25;
    let boundYDown = 200;

    let animationFrame;

    function updateBounds() {
      const sceneRect = scene.getBoundingClientRect();

      const scale = sceneRect.width / 430;

      const cardLeft =
        sceneRect.left +
        (215 - CARD_W / 2) * scale;

      const cardRight =
        sceneRect.left +
        (215 + CARD_W / 2) * scale;

      boundXNeg =
        -(cardLeft - 8) / scale;

      boundXPos =
        (window.innerWidth - cardRight - 8) /
        scale;

      /*
        Allow the card to move upward
        almost to the top of the scene.
      */
      boundYUp =
        -(CARD_TOP - 20);

      const cardBottomAtRest =
        sceneRect.top +
        (CARD_TOP + CARD_H) * scale;

      boundYDown =
        (
          window.innerHeight -
          cardBottomAtRest +
          CARD_H * 0.55 * scale
        ) / scale;
    }

    /* =========================================================
       CARD ATTACHMENT POINT
    ========================================================= */

    function getAttachmentPoint() {
      const angle =
        (rotation * Math.PI) / 180;

      const localX = 0;
      const localY = ATTACH_OFFSET_Y;

      const rotatedX =
        localX * Math.cos(angle) -
        localY * Math.sin(angle);

      const rotatedY =
        localX * Math.sin(angle) +
        localY * Math.cos(angle);

      return {
        x: 215 + currentX + rotatedX,

        y:
          CARD_TOP +
          currentY +
          rotatedY,
      };
    }

    /* =========================================================
       ROPE CURVE
    ========================================================= */

    function buildRope(
      ax,
      ay,
      bx,
      by
    ) {
      const dx = bx - ax;
      const dy = by - ay;

      const distance =
        Math.hypot(dx, dy);

      /*
        Natural sag increases with distance.
      */

      const naturalSag =
        Math.min(
          72,
          18 + distance * 0.11
        );

      const REST_DISTANCE = 280;

      const stretch =
        Math.max(
          0,
          distance - REST_DISTANCE
        );

      const tension =
        Math.min(
          1,
          stretch / 300
        );

      const sag =
        naturalSag *
        (1 - tension * 0.72);

      const c1x =
        ax + dx * 0.3;

      const c1y =
        ay +
        dy * 0.3 +
        sag;

      const c2x =
        ax + dx * 0.7;

      const c2y =
        ay +
        dy * 0.7 +
        sag;

      return `
        M ${ax} ${ay}
        C
          ${c1x} ${c1y},
          ${c2x} ${c2y},
          ${bx} ${by}
      `;
    }

    /* =========================================================
       UPDATE ROPE
    ========================================================= */

    function updateRopes() {
      const attach =
        getAttachmentPoint();

      const leftPath =
        buildRope(
          LEFT_ANCHOR.x,
          LEFT_ANCHOR.y,
          attach.x,
          attach.y
        );

      const rightPath =
        buildRope(
          RIGHT_ANCHOR.x,
          RIGHT_ANCHOR.y,
          attach.x,
          attach.y
        );

      [
        left,
        leftHighlight,
        leftTexture,
      ].forEach((element) => {
        element?.setAttribute(
          "d",
          leftPath
        );
      });

      [
        right,
        rightHighlight,
        rightTexture,
      ].forEach((element) => {
        element?.setAttribute(
          "d",
          rightPath
        );
      });

      /*
        Clip follows rope endpoint.
      */

      clip.style.left =
        `${attach.x}px`;

      clip.style.top =
        `${attach.y}px`;

      clip.style.transform =
        `rotate(${rotation}deg)`;
    }

    /* =========================================================
       CARD TRANSFORM
    ========================================================= */

    function applyCardTransform() {
      card.style.transform = `
        translateX(
          calc(
            -50% +
            ${currentX}px
          )
        )

        translateY(
          ${currentY}px
        )

        rotate(
          ${rotation}deg
        )
      `;

      updateRopes();
    }

    /* =========================================================
       NORMAL PHYSICS ANIMATION
    ========================================================= */

    function animate() {
      const spring =
        dragging
          ? 0.20
          : 0.075;

      const friction =
        dragging
          ? 0.80
          : 0.90;

      velocityX +=
        (
          targetX -
          currentX
        ) * spring;

      velocityY +=
        (
          targetY -
          currentY
        ) * spring;

      velocityX *= friction;
      velocityY *= friction;

      currentX += velocityX;
      currentY += velocityY;

      /* =====================================================
         CARD ROTATION
      ====================================================== */

      const attach =
        getAttachmentPoint();

      const ropeCenterX =
        (
          LEFT_ANCHOR.x +
          RIGHT_ANCHOR.x
        ) / 2;

      const ropeCenterY =
        (
          LEFT_ANCHOR.y +
          RIGHT_ANCHOR.y
        ) / 2;

      const dx =
        attach.x -
        ropeCenterX;

      const dy =
        attach.y -
        ropeCenterY;

      const ropeAngle =
        Math.atan2(dy, dx) *
        180 /
        Math.PI;

      let targetRotation =
        ropeAngle - 90;

      targetRotation =
        Math.max(
          -60,
          Math.min(
            60,
            targetRotation
          )
        );

      if (dragging) {
        targetRotation +=
          velocityX * 0.01;
      }

      rotation +=
        (
          targetRotation -
          rotation
        ) * 0.12;

      applyCardTransform();

      animationFrame =
        requestAnimationFrame(
          animate
        );
    }

    /* =========================================================
       NATURAL FIRST-VIEW ENTRY
    =========================================================
       The card behaves like a real hanging object:

       1. It drops with gravity.
       2. The sudden stop creates angular momentum.
       3. The card swings like a damped pendulum.
       4. Each swing becomes smaller naturally.
       5. It settles back to the hanging position.

       This is intentionally physics-driven instead of using
       fixed x/y/rotation keyframes.
    ========================================================= */

    function playEntryAnimation() {
      if (entryPlayedRef.current) return;

      entryPlayedRef.current = true;
      entryPlaying = true;

      targetX = 0;
      targetY = 0;
      velocityX = 0;
      velocityY = 0;

      /* -----------------------------------------------
         DROP SETTINGS
      ------------------------------------------------ */

      const DROP_DISTANCE = 165;
      const DROP_DURATION = 480;

      /* -----------------------------------------------
         PENDULUM SETTINGS

         The effective length is deliberately close to the
         visible hanging distance. This keeps the swing
         natural without making the card travel too far.
      ------------------------------------------------ */

      const PENDULUM_LENGTH = 225;
      const SWING_FREQUENCY = 6.5;
      const SWING_DAMPING = 0.30;

      /*
        The drop ends with a small sideways impulse.
        Negative means the first swing goes LEFT.
      */
      const IMPACT_ANGULAR_VELOCITY = -2.45;

      let swingAngle = 0;
      let swingVelocity =
        IMPACT_ANGULAR_VELOCITY;

      let lastTime = performance.now();
      const entryStart = lastTime;

      function animateEntry(now) {
        const deltaTime = Math.min(
          0.032,
          (now - lastTime) / 1000
        );

        lastTime = now;

        const elapsed =
          now - entryStart;

        /* =============================================
           PHASE 1 — GRAVITY DROP
        ============================================== */

        if (elapsed < DROP_DURATION) {
          const progress =
            elapsed / DROP_DURATION;

          /*
            Smooth acceleration downward.
            Starts gently and becomes faster near the end.
          */
          const fallProgress =
            progress * progress;

          currentX = 0;

          currentY =
            -DROP_DISTANCE +
            DROP_DISTANCE * fallProgress;

          /*
            Very small rotation while dropping.
            The real swing starts when the drop ends.
          */
          rotation =
            -2.2 * Math.sin(progress * Math.PI);

          applyCardTransform();

          animationFrame =
            requestAnimationFrame(
              animateEntry
            );

          return;
        }

        /* =============================================
           PHASE 2 — DAMPED PENDULUM
        ============================================== */

        /*
          Damped pendulum equation:

          angular acceleration =
            gravity component
            - damping

          This creates natural decreasing swings rather
          than manually timed left/right movements.
        */
        const angularAcceleration =
          -(
            SWING_FREQUENCY *
            SWING_FREQUENCY
          ) *
            Math.sin(swingAngle) -
          (
            2 *
            SWING_DAMPING *
            SWING_FREQUENCY
          ) *
            swingVelocity;

        swingVelocity +=
          angularAcceleration *
          deltaTime;

        swingAngle +=
          swingVelocity *
          deltaTime;

        /* =============================================
           CARD POSITION
        ============================================== */

        currentX =
          PENDULUM_LENGTH *
          Math.sin(swingAngle);

        /*
          Pendulum rises slightly while moving sideways.
          This is what makes it feel like it is actually
          hanging from the ropes.
        */
        currentY =
          -PENDULUM_LENGTH *
          (
            1 -
            Math.cos(swingAngle)
          );

        /*
          Card follows the hanging angle.
        */
        rotation =
          swingAngle *
          180 /
          Math.PI;

        /* =============================================
           NATURAL SETTLE
        ============================================== */

        if (
          Math.abs(swingAngle) < 0.0015 &&
          Math.abs(swingVelocity) < 0.012
        ) {
          currentX = 0;
          currentY = 0;
          rotation = 0;

          targetX = 0;
          targetY = 0;

          velocityX = 0;
          velocityY = 0;

          entryPlaying = false;

          applyCardTransform();

          animationFrame =
            requestAnimationFrame(
              animate
            );

          return;
        }

        applyCardTransform();

        animationFrame =
          requestAnimationFrame(
            animateEntry
          );
      }

      /* -----------------------------------------------
         INITIAL POSITION
      ------------------------------------------------ */

      currentX = 0;
      currentY = -DROP_DISTANCE;
      rotation = 0;

      swingAngle = 0;
      swingVelocity =
        IMPACT_ANGULAR_VELOCITY;

      lastTime =
        performance.now();

      applyCardTransform();

      animationFrame =
        requestAnimationFrame(
          animateEntry
        );
    }

    /* =========================================================
       POINTER DOWN
    ========================================================= */

    function handlePointerDown(event) {
      if (entryPlaying) return;

      // Never start dragging when an interactive element is clicked.
      const interactive = event.target.closest(
        "a, button, input, textarea, select"
      );

      if (interactive) return;

      dragging = true;

      card.setPointerCapture(
        event.pointerId
      );

      updateBounds();

      pointerStartX =
        event.clientX;

      pointerStartY =
        event.clientY;

      startX = targetX;
      startY = targetY;
    }

    /* =========================================================
       POINTER MOVE
    ========================================================= */

    function handlePointerMove(event) {
      if (!dragging) return;

      const dx =
        event.clientX -
        pointerStartX;

      const dy =
        event.clientY -
        pointerStartY;

      targetX =
        Math.max(
          boundXNeg,

          Math.min(
            boundXPos,

            startX + dx
          )
        );

      targetY =
        Math.max(
          boundYUp,

          Math.min(
            boundYDown,

            startY + dy
          )
        );
    }

    /* =========================================================
       RELEASE CARD
    ========================================================= */

    function releaseCard() {
      if (!dragging) return;

      dragging = false;

      /*
        Return card to hanging position.
      */

      targetX = 0;
      targetY = 0;
    }

    /* =========================================================
       START
    ========================================================= */

    updateBounds();

    /*
      Keep the card above the scene until About becomes visible.
      This prevents the entry animation from playing somewhere
      else on the page.
    */
    currentX = 0;
    currentY = -165;
    rotation = 0;

    /*
      Keep both the card and the drag hint hidden until the
      required amount of the About section is visible.

      Desktop: 80%
      Mobile / tablet: 30%
    */
    card.style.opacity = "0";
    card.style.visibility = "hidden";

    if (dragHintRef.current) {
      dragHintRef.current.style.opacity = "0";
      dragHintRef.current.style.visibility = "hidden";
    }


    updateRopes();
    applyCardTransform();

    /*
      Mobile uses 30% because the About section becomes much
      taller on smaller screens. Desktop keeps the 80% trigger.
    */
    const section = sectionRef.current;

    const isMobile =
      window.matchMedia("(max-width: 990px)").matches;

    const visibilityThreshold =
      isMobile ? 0.3 : 0.8;

    const observer =
      section
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];

              if (
                entry.isIntersecting &&
                entry.intersectionRatio >=
                  visibilityThreshold &&
                !entryPlayedRef.current
              ) {
                /*
                  Reveal the card when the required amount
                  of the About section is visible.
                */
                card.style.visibility = "visible";
                card.style.opacity = "1";

                if (dragHintRef.current) {
                  dragHintRef.current.style.visibility = "visible";
                  dragHintRef.current.style.opacity = "1";
                }

                playEntryAnimation();

                observer.disconnect();
              }
            },
            {
              threshold: visibilityThreshold,
            }
          )
        : null;

    if (observer && section) {
      observer.observe(section);
    }

    card.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    card.addEventListener(
      "pointermove",
      handlePointerMove
    );

    card.addEventListener(
      "pointerup",
      releaseCard
    );

    card.addEventListener(
      "pointercancel",
      releaseCard
    );

    card.addEventListener(
      "lostpointercapture",
      releaseCard
    );

    window.addEventListener(
      "resize",
      updateBounds
    );

    return () => {
      observer?.disconnect();

      cancelAnimationFrame(
        animationFrame
      );

      card.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      card.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      card.removeEventListener(
        "pointerup",
        releaseCard
      );

      card.removeEventListener(
        "pointercancel",
        releaseCard
      );

      card.removeEventListener(
        "lostpointercapture",
        releaseCard
      );

      window.removeEventListener(
        "resize",
        updateBounds
      );
    };
  }, []);

  const setRopeRef =
    (key) =>
    (element) => {
      ropeRefs.current[key] =
        element;
    };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
    >

      <div className="about-wrapper">

        {/* =====================================================
            ABOUT CONTENT
        ====================================================== */}

        <div className="about-content" data-reveal="left">

          <div className="about-label">
            About Me
          </div>

          <h1 className="about-title">
            Behind the{" "}
            <span>Code.</span>
          </h1>

          <p className="about-description">
            I'm{" "}
            <strong>Balaji T</strong>, a
            Computer Science and Engineering
            graduate with a strong foundation
            in programming, databases, and web
            development. I'm currently
            developing my skills through{" "}
            <strong>
              Python Full Stack Development
            </strong>{" "}
            training, with a strong focus on{" "}
            <strong>
              Python, Django, REST APIs, and SQL
            </strong>.
          </p>

          <p className="about-description">
            I also work with{" "}
            <strong>
              React and Tailwind CSS
            </strong>{" "}
            to build clean and responsive
            frontend experiences, while using{" "}
            <strong>
              Git and GitHub
            </strong>{" "}
            for version control and project
            management. I'm particularly
            interested in backend development,
            working with databases, building
            APIs, and connecting them with
            modern frontend applications. I'm
            currently looking for an opportunity
            as a{" "}
            <strong>
              Python/Django Developer
            </strong>{" "}
            where I can apply my skills, work on
            real-world projects, learn from
            experienced developers, and grow as
            a professional.
          </p>

          <div className="about-details">

            <AboutDetail
              label="Education"
              value="BE / CSE Graduate"
            />

            <AboutDetail
              label="Primary Stack"
              value="Python / Django"
            />

            <AboutDetail
              label="Looking for"
              value="Software Developer Opportunity"
            />

          </div>

        </div>

        {/* =====================================================
            CARD AREA
        ====================================================== */}

        <div className="card-area">

          <div
            ref={sceneRef}
            className="scene"
          >

            {/* =================================================
                ROPE
            ================================================== */}

            <svg
              className="rope-layer"
              viewBox="0 0 430 620"
              preserveAspectRatio="none"
              aria-hidden="true"
            >

              <defs>

                <linearGradient
                  id="ropeGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#16181b"
                  />

                  <stop
                    offset="20%"
                    stopColor="#4a4d52"
                  />

                  <stop
                    offset="38%"
                    stopColor="#1b1d20"
                  />

                  <stop
                    offset="55%"
                    stopColor="#5e6167"
                  />

                  <stop
                    offset="72%"
                    stopColor="#222327"
                  />

                  <stop
                    offset="88%"
                    stopColor="#48494e"
                  />

                  <stop
                    offset="100%"
                    stopColor="#131416"
                  />
                </linearGradient>

              </defs>

              <path
                ref={setRopeRef(
                  "leftTexture"
                )}
                className="rope-texture"
              />

              <path
                ref={setRopeRef(
                  "rightTexture"
                )}
                className="rope-texture"
              />

              <path
                ref={setRopeRef("left")}
                className="rope"
              />

              <path
                ref={setRopeRef("right")}
                className="rope"
              />

              <path
                ref={setRopeRef(
                  "leftHighlight"
                )}
                className="rope-highlight"
              />

              <path
                ref={setRopeRef(
                  "rightHighlight"
                )}
                className="rope-highlight"
              />

            </svg>

            {/* =================================================
                METAL CLIP
            ================================================== */}

            <div
              ref={clipRef}
              className="clip"
            >
              <div className="clip-ring" />
              <div className="clip-body" />
            </div>

            <div
              ref={dragHintRef}
              className="about-drag-hint"
              aria-hidden="true"
            >
              <span className="about-drag-hint-icon">↔</span>
              <span>DRAG TO EXPLORE</span>
            </div>

            {/* =================================================
                ID CARD
            ================================================== */}
<div
  ref={cardRef}
  className="card"
>
  <div className="card-status">
    <span className="status-dot" />
    Available for Work
  </div>

  <div className="card-image">
    <img
      src={porfileimg}
      alt="Balaji T"
    />
  </div>

  <div className="card-gradient" />

  <div className="card-content">
    <h2 className="card-name">
      Balaji T
    </h2>

    <div className="card-role">
      <span className="role-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 6 3 12l5 6" />
          <path d="m16 6 5 6-5 6" />
          <path d="m14 4-4 16" />
        </svg>
      </span>
      <span>Python Developer</span>
    </div>

    <div className="card-accent" />

    <p className="card-description">
      I build modern web applications and love to solve
      real-world problems with code.
    </p>

    <div className="card-stats">
      <div className="card-stat">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        </div>
        <div>
          <strong>4+</strong>
          <span>Projects</span>
        </div>
      </div>

      <div className="card-stat">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l3 2" />
          </svg>
        </div>
        <div>
          <strong>1+</strong>
          <span>Years Learning</span>
        </div>
      </div>

      <div className="card-stat">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 6 3 12l5 6" />
            <path d="m16 6 5 6-5 6" />
            <path d="m14 4-4 16" />
          </svg>
        </div>
        <div>
          <strong>10+</strong>
          <span>Technologies</span>
        </div>
      </div>
    </div>

    <div className="card-actions">
<a
  href="#contact"
  onPointerDown={(e) => e.stopPropagation()}
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="card-button card-button-primary"
>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <strong>Get In Touch</strong>
        <svg className="button-arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </a>

      <a
        href={BalajiResume}
        download
        className="card-button card-button-secondary"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
        <strong>Download CV</strong>
      </a>
    </div>
  </div>
</div>
          </div>

        </div>

      </div>
    </section>
  );
}

function AboutDetail({
  label,
  value,
}) {
  return (
    <div className="about-detail">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

export default About;