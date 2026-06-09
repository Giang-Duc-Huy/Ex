export default function Contact() {
  const contacts = [
    { icon: "⬡", label: "GitHub", href: "https://github.com/Giang-Duc-Huy" },
    { icon: "◈", label: "LinkedIn", href: "https://www.linkedin.com/in/hijang17" },
    { icon: "✉", label: "Email", href: "mailto:giangduchuy537@gmail.com" },
    { icon: "◉", label: "Figma", href: "https://www.figma.com/@hijang17" },
  ];

  return (
    <section id="contact">
      <p className="sec-heading"><b>Contact</b></p>
      <div className="contact-grid fade-in">
        {contacts.map(c => (
          <a className="contact-card" key={c.label} href={c.href} target="_blank" rel="noreferrer">
            <span className="contact-icon">{c.icon}</span>
            <span className="contact-lbl">{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}