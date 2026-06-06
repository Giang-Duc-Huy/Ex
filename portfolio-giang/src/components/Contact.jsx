export default function Contact() {
  const contacts = [
    { icon: "⬡", label: "GitHub", href: "https://github.com" },
    { icon: "◈", label: "LinkedIn", href: "https://linkedin.com" },
    { icon: "✉", label: "Email", href: "mailto:dev@example.com" },
    { icon: "◉", label: "Figma", href: "https://figma.com" },
  ];

  return (
    <section id="contact">
      <p className="sec-heading">// Contact</p>
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