import { useState, useEffect } from "react";

export default function Navbar({ activeSection, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["about", "work", "skills", "contact"];

  return (
    <>
      <nav>
        <span className="nav-logo"><img src="./images/Logo.png" alt="Logo" /></span>
        <ul className="nav-links">
          {navItems.map(id => (
            <li key={id}>
              <button
                className={activeSection === id ? "active" : ""}
                onClick={() => scrollTo(id)}
              >
                {id.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(id => (
          <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }}>
            {id.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}