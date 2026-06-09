export default function Skills({ skills, timeline }) {
  return (
    <section id="skills">
      <p className="sec-heading"><b>Skills &amp; Stack</b></p>
      <div className="skills-cloud fade-in">
        {skills && skills.map(s => (
          <span className="skill-pill" key={s}>{s}</span>
        ))}
      </div>

      <p className="sec-heading" style={{ marginTop: "3rem" }}>// Timeline</p>
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