import { useEffect, useRef, useState } from "react";

/**
 * Portfolio — Wissem Zidi
 * Cybersecurity Engineering Student, Year 3/5
 *
 * Single-file React component. No backend, no external state.
 * Replace the placeholder copy (bio, projects, links, email) with your own.
 */

const TERMINAL_SCRIPT = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "wissem_zidi" },
  { type: "cmd", text: "cat role.txt" },
  { type: "out", text: "cybersecurity engineering student — year 3/5" },
  { type: "cmd", text: "./authenticate --portfolio" },
  { type: "out", text: "ACCESS GRANTED", accent: true },
];

const SKILL_GROUPS = [
  {
    label: "Offensive",
    tag: "OFFSEC",
    items: [
      "Penetration testing",
      "Vulnerability assessment",
      "Web app security (OWASP Top 10)",
      "CTF & exploit fundamentals",
    ],
  },
  {
    label: "Defensive",
    tag: "DEFSEC",
    items: [
      "Network security",
      "SIEM & log analysis",
      "Incident response basics",
      "Applied cryptography",
    ],
  },
  {
    label: "Tooling",
    tag: "TOOLS",
    items: ["Kali Linux", "Wireshark", "Burp Suite", "Nmap", "Metasploit"],
  },
  {
    label: "Languages",
    tag: "LANG",
    items: ["Python", "C", "Bash", "SQL"],
  },
];

const TIMELINE = [
  {
    year: "Year 1",
    title: "Foundations",
    desc: "Mathematics, programming fundamentals, intro to computer networks.",
    status: "done",
  },
  {
    year: "Year 2",
    title: "Systems & Networks",
    desc: "Operating systems, systems administration, network protocols.",
    status: "done",
  },
  {
    year: "Year 3",
    title: "Security Core",
    desc: "Cryptography, penetration testing, security architecture.",
    status: "current",
  },
  {
    year: "Year 4",
    title: "Specialization",
    desc: "Focused track — offensive security / cloud & infra security (planned).",
    status: "upcoming",
  },
  {
    year: "Year 5",
    title: "Capstone",
    desc: "Engineering thesis and industry final project.",
    status: "upcoming",
  },
];

const PROJECTS = [
  {
    title: "Network Intrusion Detection Lab",
    desc: "A home lab simulating common attack chains and catching them with Suricata and an ELK-based alerting pipeline.",
    tags: ["Suricata", "ELK", "Networking"],
  },
  {
    title: "Vulnerable Web App Assessment",
    desc: "Manual penetration test of a deliberately vulnerable application, documented against the OWASP Top 10 with remediation notes.",
    tags: ["Burp Suite", "OWASP", "Reporting"],
  },
  {
    title: "CTF Writeups",
    desc: "Ongoing collection of writeups from HackTheBox and TryHackMe rooms, covering web, crypto, and privilege escalation challenges.",
    tags: ["CTF", "HackTheBox", "TryHackMe"],
  },
];

const CERTS = [
  { name: "CompTIA Security+", status: "In progress" },
  { name: "eJPT", status: "Planned" },
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [heroReady, setHeroReady] = useState(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion.current) {
      setTypedLines(TERMINAL_SCRIPT);
      setHeroReady(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;

    function typeNext() {
      if (cancelled) return;
      if (lineIndex >= TERMINAL_SCRIPT.length) {
        setTimeout(() => setHeroReady(true), 200);
        return;
      }
      const line = TERMINAL_SCRIPT[lineIndex];
      if (charIndex <= line.text.length) {
        setCurrentText(line.text.slice(0, charIndex));
        charIndex++;
        setTimeout(typeNext, line.type === "cmd" ? 38 : 22);
      } else {
        setTypedLines((prev) => [...prev, line]);
        setCurrentText("");
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNext, line.type === "cmd" ? 260 : 380);
      }
    }
    const startTimer = setTimeout(typeNext, 400);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("wz-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(".wz-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [heroReady]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#path", label: "Path" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="wz-root">
      {/* NAV */}
      <nav className="wz-nav">
        <div className="wz-container wz-nav-inner">
          <div className="wz-logo">
            <span className="wz-logo-dot" />
            WZ
          </div>
          <div className="wz-nav-links">
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} data-idx={`0${i + 1}`}>
                {l.label}
              </a>
            ))}
          </div>
          <button
            className="wz-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
        <div
          className={`wz-container wz-mobile-menu ${menuOpen ? "open" : ""}`}
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <header className="wz-container wz-hero">
        <div>
          <div className="wz-eyebrow">System access</div>
          <h1 className="wz-name">Wissem Zidi</h1>
          <p className="wz-role">
            Cybersecurity engineering student focused on offensive security and
            the defensive tooling built to catch it. Third year of a five-year
            program — currently deep in cryptography, penetration testing, and
            security architecture.
          </p>
          <div className="wz-clearance">
            <span>Clearance</span>
            <span className="wz-clearance-bar">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`wz-clearance-seg ${n <= 3 ? "filled" : ""}`}
                />
              ))}
            </span>
            <span>Year 03 / 05</span>
          </div>
          <div className="wz-cta-row">
            <a href="#projects" className="wz-btn wz-btn-primary">
              View projects
            </a>
            <a href="#contact" className="wz-btn wz-btn-ghost">
              Get in touch
            </a>
          </div>
        </div>

        <div className="wz-terminal" aria-hidden="true">
          <div className="wz-terminal-head">
            <span className="wz-dot" />
            <span className="wz-dot" />
            <span className="wz-dot" />
            <span className="wz-terminal-title">
              session — wissem@portfolio
            </span>
          </div>
          <div className="wz-terminal-body">
            {typedLines.map((line, i) =>
              line.type === "cmd" ? (
                <div className="wz-line" key={i}>
                  <span className="wz-prompt">$</span>
                  {line.text}
                </div>
              ) : (
                <div
                  className={`wz-line wz-out ${line.accent ? "accent" : ""}`}
                  key={i}
                >
                  {line.text}
                </div>
              ),
            )}
            {!heroReady && currentText !== "" && (
              <div className="wz-line">
                <span className="wz-prompt">$</span>
                {currentText}
                <span className="wz-caret" />
              </div>
            )}
            {!heroReady &&
              currentText === "" &&
              typedLines.length < TERMINAL_SCRIPT.length && (
                <span className="wz-caret" />
              )}
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section className="wz-section" id="about">
        <div className="wz-container">
          <div className="wz-section-head wz-reveal">
            <span className="wz-section-num">01</span>
            <h2 className="wz-section-title">About</h2>
          </div>
          <div className="wz-about-grid wz-reveal">
            <div className="wz-about-text">
              <p>
                I'm <strong>Wissem Zidi</strong>, a third-year cybersecurity
                engineering student. My work sits at the intersection of
                breaking things on purpose and building the systems that notice
                when someone else tries to.
              </p>
              <p>
                Outside coursework, I spend time in home-lab environments —
                standing up vulnerable machines, testing detection pipelines,
                and working through CTF challenges to keep the practical side of
                security sharp alongside the theory.
              </p>
            </div>
            <div className="wz-facts">
              <div className="wz-fact">
                <div className="wz-fact-label">Program</div>
                <div className="wz-fact-value">
                  Cybersecurity Engineering — 5-year track
                </div>
              </div>
              <div className="wz-fact">
                <div className="wz-fact-label">Current stage</div>
                <div className="wz-fact-value">Year 3 — Security Core</div>
              </div>
              <div className="wz-fact">
                <div className="wz-fact-label">Focus</div>
                <div className="wz-fact-value">
                  Offensive security, network defense
                </div>
              </div>
              <div className="wz-fact">
                <div className="wz-fact-label">Based in</div>
                <div className="wz-fact-value">Tunis, Tunisia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="wz-section" id="skills">
        <div className="wz-container">
          <div className="wz-section-head wz-reveal">
            <span className="wz-section-num">02</span>
            <h2 className="wz-section-title">Skills</h2>
          </div>
          <div className="wz-skills-grid wz-reveal">
            {SKILL_GROUPS.map((g) => (
              <div className="wz-skill-card" key={g.label}>
                <div className="wz-skill-tag">{g.tag}</div>
                <div className="wz-skill-label">{g.label}</div>
                <ul className="wz-skill-items">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="wz-certs wz-reveal">
            {CERTS.map((c) => (
              <div className="wz-cert-chip" key={c.name}>
                <span>{c.name}</span>
                <span className="wz-cert-status">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATH / TIMELINE */}
      <section className="wz-section" id="path">
        <div className="wz-container">
          <div className="wz-section-head wz-reveal">
            <span className="wz-section-num">03</span>
            <h2 className="wz-section-title">Path</h2>
          </div>
          <div className="wz-timeline wz-reveal">
            {TIMELINE.map((t, i) => (
              <div className={`wz-tl-item ${t.status}`} key={t.year}>
                <div className="wz-tl-year">{t.year}</div>
                <div className="wz-tl-rail">
                  <div className="wz-tl-node" />
                  {i < TIMELINE.length - 1 && (
                    <div className="wz-tl-connector" />
                  )}
                </div>
                <div className="wz-tl-content">
                  <div className="wz-tl-title">
                    {t.title}
                    {t.status === "current" && (
                      <span className="wz-tl-badge">Current</span>
                    )}
                  </div>
                  <div className="wz-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="wz-section" id="projects">
        <div className="wz-container">
          <div className="wz-section-head wz-reveal">
            <span className="wz-section-num">04</span>
            <h2 className="wz-section-title">Projects</h2>
          </div>
          <div className="wz-projects-grid wz-reveal">
            {PROJECTS.map((p) => (
              <div className="wz-project-card" key={p.title}>
                <div className="wz-project-title">{p.title}</div>
                <div className="wz-project-desc">{p.desc}</div>
                <div className="wz-project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="wz-section" id="contact">
        <div className="wz-container">
          <div className="wz-section-head wz-reveal">
            <span className="wz-section-num">05</span>
            <h2 className="wz-section-title">Contact</h2>
          </div>
          <div className="wz-contact wz-reveal">
            <div className="wz-contact-title">
              Let's talk security, labs, or opportunities.
            </div>
            <div className="wz-contact-links">
              <a href="mailto:wissem.zidi.ofc@gmail.com">
                wissem.zidi.ofc@gmail.com
              </a>
              <a
                href="https://github.com/wissemzidi"
                target="_blank"
                rel="noreferrer"
              >
                github.com/wissemzidi
              </a>
              <a
                href="https://linkedin.com/in/wissemzidi"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/wissemzidi
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="wz-container wz-footer">
        <span>© {new Date().getFullYear()} Wissem Zidi</span>
        <span>Built with React</span>
      </footer>
    </div>
  );
}
