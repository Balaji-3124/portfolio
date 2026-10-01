import { useState } from "react";
import Intro from "./components/intro/Intro";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Skills from "./components/skills/Skills";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Journey from "./components/journey/Journey";
import Projects from "./components/projects/Projects";
import useScrollReveal from "./hooks/useScrollReveal";

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  // Fade-up / left / right reveal for any [data-reveal] element.
  // Starts once the intro curtain is gone so Hero animates in view.
  useScrollReveal(introFinished);

  return (
    <>
      {/* =========================================
          PORTFOLIO CONTENT
          Always exists behind the intro
      ========================================= */}

      <Navbar />

      <Hero />
      <About />
      <Skills/>
      <Projects />
      <Journey/>
        <Contact />
        <Footer />
      {/* =========================================
          INTRO OVERLAY
      ========================================= */}

      {!introFinished && (
        <Intro
          onComplete={() => {
            setIntroFinished(true);
          }}
        />
      )}
    </>
  );
}

export default App;