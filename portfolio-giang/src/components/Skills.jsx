export default function Skills({ skills, timeline }) {
  const list = skills || [];

  return (
    <section id="skills">
      <p className="sec-heading"><b>Skills &amp; Stack</b></p>

      <div className="skills-grid">
        <div className="skills-track">
          {/* render 2 lần toàn bộ skills để loop liền mạch (grid 3 hàng, tự chia cột) */}
          {[...list, ...list, ...list].map((s, i) => (
            <span className="skill-pill" key={`${i}-${s}`}>{s}</span>
          ))}
        </div>
      </div>

      <p className="sec-heading" style={{ marginTop: "3rem" }}><b>Timeline</b></p>
      <div className="timeline fade-in">
        {timeline && timeline.map((t, i) => (
          <div className="tl-item" key={i}>
            <div className="tl-left">
              <div className="tl-dot" />
              <div className="tl-line" />
            </div>
            <span className="tl-year">{t.year}</span>
            <div className="tl-content">
              <p className="tl-title">{t.title}</p>
              <p className="tl-sub">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}