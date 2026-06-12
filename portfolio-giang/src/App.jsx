import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { PORTFOLIO_DATA } from "./constants/portfolioData";

import "./styles/portfolio.css";

const SECTIONS = ["hero", "about", "work", "skills", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [canvasSize, setCanvasSize] = useState(320);

  const heroRef = useRef(null);

  // ── Cursor tracking ──────────────────────────────────────────
  useEffect(() => {
    const handleMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // ── Hover cursor ring ────────────────────────────────────────
  useEffect(() => {
    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);
    const interactives = document.querySelectorAll(
      "a, button, .project-card, .contact-card, .skill-pill"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });
    return () => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  // ── Scroll spy ───────────────────────────────────────────────
  // Dùng getBoundingClientRect() — chính xác hơn offsetTop
  // vì không bị ảnh hưởng bởi positioned ancestors
  useEffect(() => {
    const getActiveSection = () => {
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      // Chạm đáy trang → active contact
      if (scrollY + windowH >= docH - 10) {
        return SECTIONS[SECTIONS.length - 1];
      }

      // Section nào có top <= 50% viewport thì active
      // Duyệt ngược để lấy section thấp nhất thỏa điều kiện
      const mid = windowH * 0.5;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.getBoundingClientRect().top <= mid) {
          return SECTIONS[i];
        }
      }
      return "hero";
    };

    const handleScroll = () => setActiveSection(getActiveSection());

    // Chạy ngay lần đầu
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── scrollTo: set active ngay khi click, không chờ scroll event
  const scrollTo = (id) => {
    setActiveSection(id); // highlight ngay lập tức
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Canvas responsive ────────────────────────────────────────
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

  // ── Scroll reveal ─────────────────────────────────────────────
  useEffect(() => {
    const STAGGER_SELECTORS = [
      ".project-card",
      ".skill-pill",
      ".tl-item",
      ".contact-card",
    ];
    const SINGLE_SELECTORS = [".sec-heading", ".about-card"];

    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observed = new WeakSet();

    const observeAll = () => {
      STAGGER_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el, i) => {
          if (!observed.has(el)) {
            el.style.setProperty("--i", i);
            revealIO.observe(el);
            observed.add(el);
          }
        });
      });
      SINGLE_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (!observed.has(el)) {
            revealIO.observe(el);
            observed.add(el);
          }
        });
      });
    };

    observeAll();
    const mutationObs = new MutationObserver(observeAll);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealIO.disconnect();
      mutationObs.disconnect();
    };
  }, []);

  return (
    <>
      <div className="scanline" />
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div
        className={`cursor-ring ${hovering ? "hover" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
      />

      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      <Hero scrollTo={scrollTo} canvasSize={canvasSize} heroRef={heroRef} />

      <About data={PORTFOLIO_DATA} />
      <Projects projects={PORTFOLIO_DATA.projects} />
      <Skills skills={PORTFOLIO_DATA.skills} timeline={PORTFOLIO_DATA.timeline} />
      <Contact />

      <footer>
        <p>· Giang Duc Huy · HCMC © 2026</p>
      </footer>
    </>
  );
}