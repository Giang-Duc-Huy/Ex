export default function Projects({ projects }) {
  return (
    <section id="work">
      <p className="sec-heading">// Featured Projects</p>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div className="project-card fade-in" key={i} style={{ transitionDelay: `${i * 0.07}s` }}>
            <a href={p.gh || p.fig} target="_blank" rel="noreferrer">
              <div className="project-top">
                <span className="project-name">{p.name}</span>
                <div className="project-links" >
                  {p.gh && <a className="plink" href={p.gh} target="_blank" rel="noreferrer">⬡ GH</a>}
                  {p.fig && <a className="plink" href={p.fig} target="_blank" rel="noreferrer">◈ FIG</a>}
                </div>
              </div>
            </a>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}