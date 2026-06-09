export default function About({ data }) {
  return (
    <section id="about">
      <p className="sec-heading"><b>About</b></p>
      <div className="about-card fade-in">
        <div className="about-avatar">{data.avatarInitial}</div>
        <div>
          <p className="about-name">{data.name}</p>
          <p className="about-uni">{data.university}</p>
          <p className="about-bio">{data.bio}</p>
          {/* stats */}
        </div>
      </div>
    </section>
  );
}