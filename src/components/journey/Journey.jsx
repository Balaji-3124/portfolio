import { useEffect, useRef, useState } from "react";

import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import "./Journey.css";

const journeyData = [
  {
    id: "diploma",
    year: "2020 — Jun 2022",
    title: "Diploma in EEE",
    subtitle: "The beginning",
    description:
      "Completed my Diploma in Electrical & Electronics Engineering and built the foundation for my technical journey.",
    tags: ["Diploma", "EEE"],
  },
  {
    id: "work",
    year: "Jul 2022 — Jul 2023",
    title: "Work Experience",
    subtitle: "Real-world exposure",
    description:
      "Worked in the manufacturing industry and gained practical experience in discipline, teamwork and professional responsibility.",
    tags: ["Work Experience", "Industry", "Teamwork"],
  },
  {
    id: "be",
    year: "Aug 2023 — Jun 2026",
    title: "B.E. Computer Science",
    subtitle: "A new direction",
    description:
      "Started my B.E. in Computer Science and Engineering and moved my career path toward software development and IT.",
    tags: ["B.E. CSE", "Software", "IT"],
  },
  {
    id: "events",
    year: "2024",
    title: "Technical Events",
    subtitle: "Learning beyond the classroom",
    description:
      "Participated in hackathons, symposiums and technical events, gaining exposure to teamwork, problem solving and new technologies.",
    tags: ["Hackathons", "Symposiums", "Technical Events"],
  },
  {
    id: "appin",
    year: "Jul 2025 — Aug 2025",
    title: "Appin Technology",
    subtitle: "Practical training",
    description:
      "Completed a development-focused training experience and strengthened practical skills through hands-on learning and teamwork.",
    tags: ["MERN Stack", "Training", "Teamwork"],
  },
  {
    id: "qspiders",
    year: "2026 — Now",
    title: "QSpiders",
    subtitle: "Strengthening the foundation",
    description:
      "Currently continuing technical training at QSpiders, focusing on Python, Django, SQL, REST APIs and interview preparation.",
    tags: ["Python", "Django", "SQL", "REST API"],
  },
];

const ROAD_PATH = `
  M 55 670
  C 45 560, 190 600, 275 505
  C 360 410, 155 370, 290 275
  C 420 180, 585 235, 635 65
`;

const STAGE_POSITIONS = [
  2,
  28,
  48,
  68,
  79,
  96,
];

const SIGNAL_ADJUSTMENTS = [
  { x: -5, y: 0 },
  { x: 0, y: 0 },
  { x: -10, y: -10 },
  { x: 20, y: 0 },
  { x: 5, y: 0 },
  { x: 0, y: 0 },
];

const MESSAGE_ADJUSTMENTS = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 20, y: -10 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

// Place the .glb file at public/models/car.glb (Vite/CRA/Next
// all serve /public at the site root), or replace this with a
// bundler asset import (e.g. Vite: `import CAR_MODEL_URL from
// "./assets/car.glb?url"`).
const CAR_MODEL_URL = "/models/car.glb";

// Length of the model along its forward (Z) axis in its own
// units, taken from its bounding box. Used so the car keeps a
// sensible, consistent on-screen size no matter how it was
// modeled/exported.
const CAR_LENGTH_UNITS = 4.91;

// Desired on-screen length (px) of the car at each breakpoint,
// matched to the old bike icon's sizing steps.
const CAR_SCREEN_LENGTHS = [
  { maxWidth: 480, length: 46 },
  { maxWidth: 768, length: 56 },
  { maxWidth: 1100, length: 68 },
  { maxWidth: Infinity, length: 82 },
];

function getCarScale() {
  const width =
    typeof window !== "undefined"
      ? window.innerWidth
      : 1400;

  const match =
    CAR_SCREEN_LENGTHS.find(
      (entry) => width <= entry.maxWidth
    ) ||
    CAR_SCREEN_LENGTHS[
      CAR_SCREEN_LENGTHS.length - 1
    ];

  return match.length / CAR_LENGTH_UNITS;
}

// How long the car waits at a stage before auto-advancing to
// the next one (loops back to the first after the last).
const AUTO_ADVANCE_MS = 3500;

function Journey() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [signalPositions, setSignalPositions] = useState([]);

  const roadPathRef = useRef(null);
  const roadContainerRef = useRef(null);
  const carCanvasRef = useRef(null);

  const threeRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    car: null,
    halfW: 0,
    halfH: 0,
  });

  const carAnimFrameRef = useRef(null);
  const currentCarPercentRef = useRef(
    STAGE_POSITIONS[2]
  );
  const isInitialCarRender = useRef(true);

  const active = journeyData[activeIndex];

  const getPathScale = () => {
    const container = roadContainerRef.current;

    if (!container) {
      return { scaleX: 1, scaleY: 1 };
    }

    const svgWidth = 700;
    const svgHeight = 700;

    return {
      scaleX: container.clientWidth / svgWidth,
      scaleY: container.clientHeight / svgHeight,
    };
  };

  const renderScene = () => {
    const three = threeRef.current;

    if (
      three.renderer &&
      three.scene &&
      three.camera
    ) {
      three.renderer.render(
        three.scene,
        three.camera
      );
    }
  };

  const getCarPlacement = (percentage) => {
    const path = roadPathRef.current;
    const three = threeRef.current;

    if (!path) return null;

    const totalLength = path.getTotalLength();

    const distance =
      totalLength * (percentage / 100);

    const point = path.getPointAtLength(distance);

    const lookAhead = Math.min(
      distance + 2,
      totalLength
    );

    const nextPoint =
      path.getPointAtLength(lookAhead);

    const { scaleX, scaleY } = getPathScale();

    const px = point.x * scaleX;
    const py = point.y * scaleY;

    const dx = (nextPoint.x - point.x) * scaleX;
    const dy = (nextPoint.y - point.y) * scaleY;

    const worldX = px - three.halfW;
    const worldZ = py - three.halfH;

    // Model's forward axis is +Z (front wheels sit at a
    // larger Z than the rear wheels). Rotating around Y by
    // this angle points +Z at (dx, dy) in screen space.
    const angle = Math.atan2(dx, dy);

    return { worldX, worldZ, angle };
  };

  const positionCar = (percentage) => {
    const three = threeRef.current;
    const placement = getCarPlacement(percentage);

    if (!placement || !three.car) return;

    three.car.position.set(
      placement.worldX,
      0,
      placement.worldZ
    );

    three.car.rotation.y = placement.angle;

    renderScene();
  };

  const animateCarTo = (targetPercentage) => {
    cancelAnimationFrame(
      carAnimFrameRef.current
    );

    const startPercentage =
      currentCarPercentRef.current;

    const distance = Math.abs(
      targetPercentage - startPercentage
    );

    const duration = Math.min(
      2600,
      Math.max(1500, distance * 26)
    );

    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;

      const t = Math.min(elapsed / duration, 1);

      const eased =
        t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const currentPercentage =
        startPercentage +
        (targetPercentage - startPercentage) *
          eased;

      positionCar(currentPercentage);

      if (t < 1) {
        carAnimFrameRef.current =
          requestAnimationFrame(step);
      } else {
        currentCarPercentRef.current =
          targetPercentage;
      }
    };

    carAnimFrameRef.current =
      requestAnimationFrame(step);
  };

  useEffect(() => {
    const calculateSignalPositions = () => {
      const path = roadPathRef.current;
      const container = roadContainerRef.current;

      if (!path || !container) return;

      const totalLength = path.getTotalLength();

      const svgWidth = 700;
      const svgHeight = 700;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const scaleX = containerWidth / svgWidth;
      const scaleY = containerHeight / svgHeight;

      const positions = STAGE_POSITIONS.map(
        (percentage, index) => {
          const distance =
            totalLength * (percentage / 100);

          const point =
            path.getPointAtLength(distance);

          const lookAhead = Math.min(
            distance + 2,
            totalLength
          );

          const nextPoint =
            path.getPointAtLength(lookAhead);

          const dx = nextPoint.x - point.x;
          const dy = nextPoint.y - point.y;

          const length = Math.sqrt(
            dx * dx + dy * dy
          );

          const nx = -dy / length;
          const ny = dx / length;

          const side =
            index % 2 === 0 ? -1 : 1;

          const offset = 75;

          const sideExtraOffset =
            side === -1 ? 8 : 0;

          const adjustment =
            SIGNAL_ADJUSTMENTS[index] || {
              x: 0,
              y: 0,
            };

          const signalX =
            point.x +
            nx * offset * side +
            sideExtraOffset +
            adjustment.x;

          const signalY =
            point.y +
            ny * offset * side +
            adjustment.y;

          const x = signalX * scaleX;
          const y = signalY * scaleY;

          return {
            x,
            y,
            side,
          };
        }
      );

      setSignalPositions(positions);
    };

    calculateSignalPositions();

    window.addEventListener(
      "resize",
      calculateSignalPositions
    );

    return () => {
      window.removeEventListener(
        "resize",
        calculateSignalPositions
      );
    };
  }, []);

  useEffect(() => {
    const canvas = carCanvasRef.current;
    const container = roadContainerRef.current;

    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2)
    );

    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace =
        THREE.SRGBColorSpace;
    } else if ("outputEncoding" in renderer) {
      renderer.outputEncoding =
        THREE.sRGBEncoding;
    }

    const scene = new THREE.Scene();

    const hemiLight = new THREE.HemisphereLight(
      0xffffff,
      0x3a2a1a,
      0.9
    );
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(
      0xffffff,
      1.15
    );
    sunLight.position.set(200, 450, 150);
    scene.add(sunLight);

    // Orthographic + a straight top-down view, so world
    // (x, z) maps 1:1 onto container pixels with no
    // perspective skew — the car lines up exactly with the
    // 2D road path.
    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0.1,
      5000
    );
    camera.position.set(0, 600, 0);
    camera.up.set(0, 0, -1);
    camera.lookAt(0, 0, 0);

    threeRef.current = {
      renderer,
      scene,
      camera,
      car: null,
      halfW: 0,
      halfH: 0,
    };

    const resizeThree = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      renderer.setSize(width, height, false);

      const halfW = width / 2;
      const halfH = height / 2;

      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();

      threeRef.current.halfW = halfW;
      threeRef.current.halfH = halfH;

      if (threeRef.current.car) {
        threeRef.current.car.scale.setScalar(
          getCarScale()
        );
      }

      positionCar(currentCarPercentRef.current);
    };

    resizeThree();

    const loader = new GLTFLoader();

    loader.load(
      CAR_MODEL_URL,
      (gltf) => {
        const car = gltf.scene;

        car.scale.setScalar(getCarScale());

        threeRef.current.car = car;

        scene.add(car);

        positionCar(
          currentCarPercentRef.current
        );
      },
      undefined,
      (error) => {
        console.error(
          "Journey: failed to load car model",
          error
        );
      }
    );

    window.addEventListener(
      "resize",
      resizeThree
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeThree
      );

      cancelAnimationFrame(
        carAnimFrameRef.current
      );

      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (isInitialCarRender.current) {
      isInitialCarRender.current = false;

      return;
    }

    animateCarTo(STAGE_POSITIONS[activeIndex]);

    return () =>
      cancelAnimationFrame(
        carAnimFrameRef.current
      );
  }, [activeIndex]);

  useEffect(() => {
    const autoAdvanceTimer = setTimeout(() => {
      setActiveIndex(
        (prev) =>
          (prev + 1) % journeyData.length
      );
    }, AUTO_ADVANCE_MS);

    return () =>
      clearTimeout(autoAdvanceTimer);
  }, [activeIndex]);

  const previousJourney = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? journeyData.length - 1
        : prev - 1
    );
  };

  const nextJourney = () => {
    setActiveIndex((prev) =>
      prev === journeyData.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <section
      className="journey-section"
      id="journey"
    >
      <div className="journey-wrapper">

        <div className="journey-intro">

          <div className="journey-small-title">
            <span></span>
            The route so far
          </div>

          <h2>
            My <em>Journey</em>
          </h2>

          <p>
            From a different path to tech,
            <br />
            every step shaped my growth.
          </p>

        </div>

        <div className="journey-main">

          <div
            className="journey-road-container"
            ref={roadContainerRef}
          >

            <svg
              className="journey-road-svg"
              viewBox="0 0 700 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >

              <defs>

                <linearGradient
                  id="roadProgressGradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >

                  <stop
                    offset="0%"
                    stopColor="#ff9f40"
                  />

                  <stop
                    offset="100%"
                    stopColor="#ffcf8f"
                  />

                </linearGradient>

              </defs>

              <path
                className="road-shadow"
                pathLength="1"
                d={ROAD_PATH}
              />

              <path
                ref={roadPathRef}
                className="road"
                pathLength="1"
                d={ROAD_PATH}
              />

              <path
                className="road-center"
                d={ROAD_PATH}
              />

            </svg>

            <canvas
              ref={carCanvasRef}
              className="journey-car-canvas"
              aria-hidden="true"
            />

            <div className="journey-signal-layer">

              {journeyData.map((item, index) => {

                const position =
                  signalPositions[index];

                if (!position) return null;

                const messageAdjustment =
                  MESSAGE_ADJUSTMENTS[index] || {
                    x: 0,
                    y: 0,
                  };

                return (
                  <div
                    key={item.id}
                    className={`journey-signal ${
                      activeIndex === index
                        ? "active"
                        : ""
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                    }}
                  >

                    <span className="signal-body">

                      <span className="signal-light red"></span>

                      <span className="signal-light yellow"></span>

                      <span className="signal-light green"></span>

                    </span>

                    <span className="signal-pole"></span>

                    <span className="signal-foot"></span>

                    <div
                      className={`signal-message ${
                        position.side === -1
                          ? "signal-message-left"
                          : "signal-message-right"
                      }`}
                      style={{
                        "--message-x": `${messageAdjustment.x}px`,
                        "--message-y": `${messageAdjustment.y}px`,
                      }}
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          setActiveIndex(index);
                        }
                      }}
                    >

                      <div className="signal-message-gloss"></div>

                      <small>
                        {item.year}
                      </small>

                      <strong>
                        {item.title}
                      </strong>

                      <span>
                        {item.subtitle}
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          <div className="journey-detail">

            <div
              className="journey-detail-card"
              key={active.id}
            >

              <div className="detail-top">

                <div className="detail-year">
                  {active.year}
                </div>

                <div className="detail-counter">
                  {String(activeIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(journeyData.length).padStart(2, "0")}
                </div>

              </div>

              <div className="detail-subtitle">
                {active.subtitle}
              </div>

              <h3>
                {active.title}
              </h3>

              <div className="detail-line"></div>

              <p>
                {active.description}
              </p>

              <div className="detail-tags">

                {active.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}

              </div>

              <div className="detail-bottom">

                <span>
                  Explore my path
                </span>

                <div className="detail-arrows">

                  <button
                    onClick={previousJourney}
                    aria-label="Previous journey"
                  >
                    <FiChevronLeft />
                  </button>

                  <button
                    onClick={nextJourney}
                    aria-label="Next journey"
                  >
                    <FiChevronRight />
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Journey;