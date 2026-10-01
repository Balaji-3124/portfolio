import "./Hero.css";
import balajiPhoto from "../../assets/balaji-photo.png";

function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Background (color) spans the full section width. Content
          is constrained and centered inside .hero-inner so it
          doesn't sprawl edge-to-edge on ultra-wide screens. */}
      <div className="hero-inner">
        <p className="hero-name">BALAJI</p>

        <img
          className="hero-photo"
          src={balajiPhoto}
          alt="Balaji"
          fetchPriority="high"
        />

        <section
          className="hero-panel hero-intro"
          data-reveal="left"
          data-reveal-delay="150"
        >
          <h1>
            Hi, I'm Balaji
            <br />
            <span>Python Developer</span>
            <br />
            &amp; Full-Stack Builder
          </h1>

          <ul>
            <li>
              <span className="hero-tick">+</span>
              Python, Django &amp; FastAPI
            </li>

            <li>
              <span className="hero-tick">+</span>
              React &amp; modern front-end
            </li>

            <li>
              <span className="hero-tick">+</span>
              SQL &amp; database design
            </li>
          </ul>
        </section>

        <section
          className="hero-panel hero-stats"
          data-reveal="right"
          data-reveal-delay="300"
        >
          <div className="hero-stat-light">
            <div className="hero-num">
              6<sup>+</sup>
            </div>

            <p>Live production projects</p>
          </div>

          <div className="hero-stat-dark">
            <div className="hero-num">
              100<sup>%</sup>
            </div>

            <p>Client satisfaction &amp; scalability</p>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Hero;