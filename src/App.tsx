import { useEffect, useMemo, useState } from "react";

const navLinks = [
  { label: "Concept", href: "#concept" },
  { label: "Menu Economics", href: "#menu" },
  { label: "Operations", href: "#operations" },
  { label: "Launch", href: "#launch" },
  { label: "Contact", href: "#contact" },
];

const conceptMetrics = [
  {
    number: "01",
    title: "Position",
    text: "Clarify who the concept is for, why it wins, and how it should show up in market.",
  },
  {
    number: "02",
    title: "Price",
    text: "Shape pricing and menu mix around contribution margin, customer behavior, and value perception.",
  },
  {
    number: "03",
    title: "Perform",
    text: "Build the operating routines, controls, and review cadence that protect consistency.",
  },
];

const menuServices = [
  {
    label: "Recipe Costing",
    title: "Ingredient-level clarity",
    text: "Map portions, yields, prep loss, packaging, and supplier prices into accurate item costs.",
  },
  {
    label: "Menu Engineering",
    title: "Mix and margin logic",
    text: "Understand which items drive volume, margin, attachment, operational pressure, and brand value.",
  },
  {
    label: "Supplier Structure",
    title: "Better buying decisions",
    text: "Review supplier dependencies, quality thresholds, price volatility, and substitution risk.",
  },
  {
    label: "Performance Review",
    title: "Weekly operator rhythm",
    text: "Track sales mix, wastage, labor, food cost, delivery economics, and branch-level variance.",
  },
];

const operations = [
  "Front-of-house and back-of-house flow mapping",
  "Team roles, shift structure, and service standards",
  "Inventory controls, wastage review, and purchasing rhythm",
  "Branch reporting and accountability routines",
];

const launchSteps = [
  {
    label: "Discover",
    title: "Concept and commercial audit",
    text: "Review the offer, customer profile, market position, menu logic, location assumptions, and economics.",
  },
  {
    label: "Design",
    title: "Model, menu, and operating plan",
    text: "Define the commercial model, menu architecture, staffing needs, supplier structure, and readiness plan.",
  },
  {
    label: "Execute",
    title: "Launch controls and cadence",
    text: "Support rollout through checklists, training priorities, performance reporting, and post-launch review.",
  },
];

const insights = [
  {
    title: "Concept",
    text: "Audience, positioning, offer, and brand promise.",
  },
  {
    title: "Economics",
    text: "Menu cost, pricing, margin, suppliers, and labor logic.",
  },
  {
    title: "Scale",
    text: "Standards, controls, reporting, and multi-location readiness.",
  },
];

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-38% 0px -54% 0px",
        threshold: 0,
      },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

function useReveal() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    revealItems.forEach((item, index) => {
      item.setAttribute("style", `transition-delay: ${Math.min(index % 4, 3) * 70}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);
  const activeSection = useActiveSection(sectionIds);

  useReveal();

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Nova Consulting F&B home">
          <span className="brand-mark">N</span>
          <span>
            <strong>Nova Consulting</strong>
            <small>F&B Advisory</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav ${isMenuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              className={activeSection === link.href.slice(1) ? "is-active" : undefined}
              href={link.href}
              key={link.label}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow reveal">Dubai-based F&B advisory</p>
            <h1 className="reveal">F&B consulting for restaurants, cafes, and food concepts.</h1>
            <p className="hero-copy reveal">
              We help operators shape sharper concepts, stronger menu economics, cleaner service
              flows, and launch plans built for profitable growth.
            </p>

            <div className="hero-actions reveal">
              <a className="primary-link" href="mailto:info@novasphereconsulting.com">
                Start a conversation
              </a>
              <a className="text-link" href="#concept">
                Explore the work
              </a>
            </div>
          </div>
        </section>

        <section className="section intro-grid" id="concept">
          <div className="section-copy reveal">
            <p className="eyebrow">Concept strategy</p>
            <h2>A food concept needs more than a good idea.</h2>
            <p>
              We connect the customer promise to the operating model behind it: audience, pricing,
              product mix, service format, staffing assumptions, supplier structure, and the numbers
              that decide whether the concept can scale.
            </p>
          </div>

          <div className="metric-grid">
            {conceptMetrics.map((metric) => (
              <article className="metric-card reveal" key={metric.title}>
                <span>{metric.number}</span>
                <strong>{metric.title}</strong>
                <p>{metric.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section service-section" id="menu">
          <div className="section-heading reveal">
            <p className="eyebrow">Menu economics</p>
            <h2>Make profitability visible before the rush begins.</h2>
          </div>

          <div className="service-grid">
            {menuServices.map((service) => (
              <article className="service-card reveal" key={service.title}>
                <span>{service.label}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section" id="operations">
          <div className="image-band reveal" aria-label="Restaurant operations scene" />

          <div className="section-copy reveal">
            <p className="eyebrow">Operations</p>
            <h2>Design the service flow before pressure exposes it.</h2>
            <p>
              We help teams translate the concept into daily execution: prep rhythm, station setup,
              staffing structure, order flow, quality control, opening checklists, and manager
              routines.
            </p>

            <ul className="check-list">
              {operations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section roadmap" id="launch">
          <div className="section-heading reveal">
            <p className="eyebrow">Launch roadmap</p>
            <h2>From concept to opening day, with fewer blind spots.</h2>
          </div>

          <ol className="timeline">
            {launchSteps.map((step) => (
              <li className="reveal" key={step.title}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section insight-strip">
          {insights.map((insight) => (
            <article className="reveal" key={insight.title}>
              <strong>{insight.title}</strong>
              <span>{insight.text}</span>
            </article>
          ))}
        </section>

        <section className="contact-section" id="contact">
          <div className="reveal">
            <p className="eyebrow">Next step</p>
            <h2>Build the food business behind the brand.</h2>
            <p>
              Share your concept, launch plan, or current operating challenge. We will help shape the
              right advisory path.
            </p>
          </div>

          <a className="primary-link reveal" href="mailto:info@novasphereconsulting.com">
            Start a conversation
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 Nova Consulting F&B.</span>
        <span>Dubai, United Arab Emirates</span>
      </footer>
    </>
  );
}
