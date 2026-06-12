import ThreeDModel from "./ThreeDModel";

export default function Hero({ scrollTo, canvasSize, heroRef }) {
  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-inner">
        <div>
          <p className="hero-tag"><b>Software Engineer</b></p>
          <h1 className="hero-name">
            Giang<br />
            <span>Duc Huy</span>
          </h1>
          <br />
          <p className="hero-role"><b>Full Stack + UI/UX</b></p>
          <p className="hero-desc">
            Building scalable systems &amp; crafting intuitive interfaces. HCMC-based, global mindset.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("work")}>View Work</button>
            <button className="btn-secondary" onClick={() => scrollTo("contact")}>Resume</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="hero-3d">
            {/* Floating particles */}
            <div className="hero-3d-particles">
              <div className="particle" />
              <div className="particle" />
              <div className="particle" />
              <div className="particle" />
              <div className="particle" />
              <div className="particle" />
            </div>

            <ThreeDModel size={canvasSize} />
          </div>
        </div>
      </div>
    </section>
  );
}