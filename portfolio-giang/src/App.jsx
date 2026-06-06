import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { PORTFOLIO_DATA } from "./constants/portfolioData";

import "./styles/portfolio.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [canvasSize, setCanvasSize] = useState(320);

  const heroRef = useRef(null);

  // Cursor tracking
  useEffect(() => {
    const handleMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    ["hero", "about", "work", "skills", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Canvas responsive
  useEffect(() => {
    const update = () => {
      if (heroRef.current) {
        setCanvasSize(Math.min(320, heroRef.current.clientWidth - 40));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Scroll reveal — add class "visible" when elements enter viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target); // chỉ trigger 1 lần
          }
        });
      },
      { threshold: 0.15 }
    );

    // Stagger index cho từng nhóm riêng
    const groups = [
      ".project-card",
      ".skill-pill",
      ".tl-item",
      ".contact-card",
    ];

    groups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.style.setProperty("--i", i);
        io.observe(el);
      });
    });

    // Không cần stagger cho các element đơn lẻ
    document.querySelectorAll(".sec-heading, .about-card").forEach((el) => {
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="scanline" />
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div className={`cursor-ring ${hovering ? "hover" : ""}`} style={{ left: cursor.x, top: cursor.y }} />

      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      <Hero scrollTo={scrollTo} canvasSize={canvasSize} heroRef={heroRef} />

      <About data={PORTFOLIO_DATA} />
      <Projects projects={PORTFOLIO_DATA.projects} />
      <Skills skills={PORTFOLIO_DATA.skills} timeline={PORTFOLIO_DATA.timeline} />
      <Contact />

      <footer>
        <p>{'{ \'DEV\' }'} · Built with React · HCMC © 2026</p>
      </footer>
    </>
  );
}