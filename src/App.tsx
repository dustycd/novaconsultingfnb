import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import financialHero from "./assets/financial-hero.png";

type NavLink = {
  label: string;
  href: string;
  path?: string;
  sectionId?: string;
};

const navLinks: NavLink[] = [
  { label: "Concept", href: "/#concept", sectionId: "concept" },
  { label: "Menu Economics", href: "/#menu", sectionId: "menu" },
  { label: "Operations", href: "/#operations", sectionId: "operations" },
  { label: "Launch", href: "/#launch", sectionId: "launch" },
  { label: "Financial Advisory", href: "/financial-advisory", path: "/financial-advisory" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
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

const financialAdvisory = {
  slug: "financial-advisory",
  eyebrow: "Financial advisory",
  navLabel: "Financial Advisory",
  title: "Financial clarity for sharper business decisions.",
  accent: "business decisions.",
  intro:
    "We help leadership teams understand their numbers, build reliable planning rhythms, and turn financial visibility into confident growth decisions.",
  outcomes: [
    {
      marker: "01",
      title: "Planning with confidence",
      text: "Budgets, forecasts, and scenarios that give founders and executives a clearer view of what comes next.",
    },
    {
      marker: "02",
      title: "Stronger profitability",
      text: "Cost structure, pricing, and margin reviews that reveal where performance can improve.",
    },
    {
      marker: "03",
      title: "Better leadership rhythm",
      text: "Reporting packs and KPI dashboards that keep decisions focused, timely, and accountable.",
    },
  ],
  scopeTitle: "What we cover",
  scope: [
    "Financial planning, budgeting, and cash-flow forecasting",
    "Management reporting, KPI dashboards, and decision support",
    "Profitability analysis, cost structure review, and pricing visibility",
    "Growth planning, investment readiness, and board-level financial narratives",
  ],
  deepDive: {
    eyebrow: "Finance operating system",
    title: "From scattered numbers to a decision-ready finance rhythm.",
    text:
      "We organize the finance function around the questions leadership actually needs answered: where cash is moving, which activities create margin, and what the next investment decision should depend on.",
    items: [
      {
        marker: "F",
        title: "Forecasting and scenarios",
        text: "Build base, stretch, and downside models so growth decisions are not made from a single assumption.",
      },
      {
        marker: "D",
        title: "Performance dashboards",
        text: "Translate accounting data into a concise view of revenue, margin, working capital, and cash conversion.",
      },
      {
        marker: "P",
        title: "Profitability levers",
        text: "Identify pricing, cost, mix, and capacity levers that can improve operating performance.",
      },
      {
        marker: "L",
        title: "Leadership cadence",
        text: "Create review routines with clear ownership, action items, and decisions the team can follow through.",
      },
    ],
  },
  process: [
    "Assess the current financial structure, reporting habits, and decision bottlenecks.",
    "Build the planning models, dashboards, and reporting cadence your team needs.",
    "Review performance regularly so leadership can act on the numbers, not chase them.",
  ],
  idealFor: [
    "Companies preparing for growth or expansion",
    "Teams that need clearer reporting and forecasting",
    "Founders looking for practical finance leadership without building a full finance department immediately",
  ],
  engagement: {
    eyebrow: "Engagement rhythm",
    title: "A practical cadence your team can keep using.",
    steps: [
      {
        label: "Weeks 1-2",
        title: "Diagnostic and data map",
        text: "We review the chart of accounts, reporting flow, cash position, and the decisions currently slowed by missing visibility.",
      },
      {
        label: "Weeks 3-6",
        title: "Models, dashboards, and reporting pack",
        text: "We build the tools and review format around your actual revenue model, cost structure, and leadership priorities.",
      },
      {
        label: "Ongoing",
        title: "Review, sharpen, and act",
        text: "We keep the rhythm alive through monthly reviews, scenario updates, and action tracking tied to the numbers.",
      },
    ],
  },
};

function isNavLinkActive(link: NavLink, activeSection: string, pathname: string) {
  if (link.path) {
    return pathname === link.path;
  }

  return pathname === "/" && link.sectionId === activeSection;
}

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

function HomePage() {
  return (
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
  );
}

function FinancialAdvisoryPage() {
  const heroStyle = {
    "--financial-hero-image": `url("${financialHero}")`,
  } as CSSProperties;

  return (
    <main className={`financial-detail financial-detail--${financialAdvisory.slug}`}>
      <section className="financial-hero" style={heroStyle}>
        <div className="financial-hero__content">
          <div className="financial-breadcrumb reveal">
            <a href="/">Home</a>
            <span>/</span>
            <span>{financialAdvisory.navLabel}</span>
          </div>

          <p className="eyebrow reveal">{financialAdvisory.eyebrow}</p>

          <h1 className="reveal">
            {financialAdvisory.title.replace(financialAdvisory.accent, "")}
            <em>{financialAdvisory.accent}</em>
          </h1>

          <p className="financial-hero__copy reveal">{financialAdvisory.intro}</p>

          <div className="hero-actions reveal">
            <a className="primary-link" href="mailto:info@novasphereconsulting.com">
              Book a consultation
            </a>
            <a className="text-link" href="/#menu">
              Explore F&B services
            </a>
          </div>
        </div>
      </section>

      <section className="financial-section">
        <div className="financial-section-heading reveal">
          <p className="eyebrow">Outcomes</p>
          <h2>Built around practical progress.</h2>
        </div>

        <div className="financial-card-grid financial-card-grid--three">
          {financialAdvisory.outcomes.map((item) => (
            <article className="financial-card reveal" key={item.title}>
              <span className="financial-marker">{item.marker}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="financial-section financial-deep-dive">
        <div className="financial-deep-copy reveal">
          <p className="eyebrow">{financialAdvisory.deepDive.eyebrow}</p>
          <h2>{financialAdvisory.deepDive.title}</h2>
          <p>{financialAdvisory.deepDive.text}</p>
        </div>

        <div className="financial-card-grid financial-card-grid--two">
          {financialAdvisory.deepDive.items.map((item) => (
            <article className="financial-card reveal" key={item.title}>
              <span className="financial-marker">{item.marker}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="financial-section financial-split">
        <div className="reveal">
          <p className="eyebrow">{financialAdvisory.scopeTitle}</p>
          <h2>Clear workstreams, measurable decisions.</h2>
        </div>

        <div className="financial-list-panel">
          {financialAdvisory.scope.map((item) => (
            <p className="reveal" key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="financial-section financial-split">
        <div className="reveal">
          <p className="eyebrow">Approach</p>
          <h2>A focused process from diagnosis to execution.</h2>
        </div>

        <ol className="financial-process">
          {financialAdvisory.process.map((step, index) => (
            <li className="reveal" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="financial-section financial-split">
        <div className="reveal">
          <p className="eyebrow">Best fit</p>
          <h2>Designed for leaders who need structure without noise.</h2>
        </div>

        <div className="financial-list-panel">
          {financialAdvisory.idealFor.map((item) => (
            <p className="reveal" key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="financial-section">
        <div className="financial-section-heading reveal">
          <p className="eyebrow">{financialAdvisory.engagement.eyebrow}</p>
          <h2>{financialAdvisory.engagement.title}</h2>
        </div>

        <div className="financial-card-grid financial-card-grid--three">
          {financialAdvisory.engagement.steps.map((step) => (
            <article className="financial-card financial-card--timeline reveal" key={step.title}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="financial-final" id="contact">
        <div className="reveal">
          <p className="eyebrow">Next step</p>
          <h2>Let’s shape the right advisory path for your business.</h2>
        </div>
        <a className="primary-link reveal" href="mailto:info@novasphereconsulting.com">
          Start a conversation
        </a>
      </section>
    </main>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = window.location.pathname;
  const sectionIds = useMemo(
    () => navLinks.flatMap((link) => (link.sectionId ? [link.sectionId] : [])),
    [],
  );
  const activeSection = useActiveSection(sectionIds);
  const isFinancialAdvisoryPage = pathname === "/financial-advisory";

  useReveal();

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/#home" aria-label="NovaSphere Consulting home">
          <img
            className="brand-logo"
            src="/logo.png"
            alt="NovaSphere Consulting"
            width="1101"
            height="291"
          />
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
              className={isNavLinkActive(link, activeSection, pathname) ? "is-active" : undefined}
              href={link.href}
              key={link.label}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {isFinancialAdvisoryPage ? <FinancialAdvisoryPage /> : <HomePage />}

      <footer className="site-footer">
        <span>© 2026 Nova Consulting F&B.</span>
        <span>Dubai, United Arab Emirates</span>
      </footer>
    </>
  );
}
