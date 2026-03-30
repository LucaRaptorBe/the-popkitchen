"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const MENU = {
  bowls: {
    title: "Bowls du Monde",
    subtitle: "Un tour du monde dans votre bol",
    items: [
      {
        name: "Bibimbap Coréen",
        desc: "Riz, légumes sautés, œuf, sauce gochujang maison",
        price: "12,50",
        origin: "Corée",
        tags: ["halal", "sans-lactose"],
      },
      {
        name: "Poké Bowl Hawaïen",
        desc: "Riz vinaigré, saumon frais, avocat, edamame, sésame",
        price: "13,90",
        origin: "Hawaï",
        tags: ["sans-gluten"],
      },
      {
        name: "Buddha Bowl",
        desc: "Quinoa, patate douce rôtie, pois chiches, sauce tahini",
        price: "11,90",
        origin: "Mondial",
        tags: ["veg", "sans-gluten"],
      },
    ],
  },
  plats: {
    title: "Plats Signature",
    subtitle: "Les recettes qui ont fait notre réputation",
    items: [
      {
        name: "Curry Thaï Coco",
        desc: "Poulet, légumes croquants, lait de coco, basilic thaï",
        price: "13,50",
        origin: "Thaïlande",
        tags: ["halal", "sans-gluten", "sans-lactose"],
      },
      {
        name: "Tacos Colombiens",
        desc: "Tortillas maison, viande épicée, guacamole, pico de gallo",
        price: "12,90",
        origin: "Colombie",
        tags: ["halal"],
      },
      {
        name: "Nems Croustillants",
        desc: "Nems faits maison, sauce nuoc-mâm, salade fraîche",
        price: "10,90",
        origin: "Vietnam",
        tags: ["halal"],
      },
    ],
  },
  douceurs: {
    title: "Douceurs & Boissons",
    subtitle: "La touche sucrée de votre voyage",
    items: [
      {
        name: "Mochi Glacé",
        desc: "Pistache, matcha, coco, sésame noir, passion",
        price: "3,50",
        origin: "Japon",
        tags: ["sans-gluten"],
      },
      {
        name: "Matcha Latte",
        desc: "Matcha premium, lait au choix, mousse onctueuse",
        price: "5,50",
        origin: "Japon",
        tags: ["veg"],
      },
      {
        name: "Cheesecake du Jour",
        desc: "Fraise, caramel beurre salé, ou sésame noir",
        price: "6,50",
        origin: "New York",
        tags: ["veg"],
      },
    ],
  },
};

const EVENTS = [
  {
    title: "Yoga & Brunch\ndu Monde",
    desc: "Une session yoga suivie d'un brunch aux saveurs du monde. Corps et esprit nourris, dans une ambiance bienveillante.",
    when: "Chaque dimanche",
    visual: "01",
  },
  {
    title: "Soirée\nLatino",
    desc: "Nourriture colombienne, musique latine et soirée culturelle. Ambiance garantie, saveurs authentiques.",
    when: "1er samedi du mois",
    visual: "02",
  },
  {
    title: "Atelier\nKimchi",
    desc: "Apprenez à préparer le kimchi traditionnel coréen avec notre chef. Repartez avec votre bocal maison.",
    when: "Sur réservation",
    visual: "03",
  },
];

const MARQUEE_ITEMS = [
  "Bibimbap",
  "Curry Thaï",
  "Tacos",
  "Mochi",
  "Matcha",
  "Kimchi",
  "Poké Bowl",
  "Nems",
  "Cheesecake",
  "Buddha Bowl",
];

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal this element
            entry.target.classList.add("visible");
            // Also reveal any children with reveal classes
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((child) => child.classList.add("visible"));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container
    observer.observe(el);
    // Also observe direct reveal children
    el.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(
      (child) => observer.observe(child)
    );

    return () => observer.disconnect();
  }, []);

  return ref;
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

/* ═══════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════ */

function Tag({ type }: { type: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    halal: { label: "Halal", cls: "tag-halal" },
    veg: { label: "Végétarien", cls: "tag-veg" },
    "sans-gluten": { label: "Sans gluten", cls: "tag-gluten" },
    "sans-lactose": { label: "Sans lactose", cls: "tag-lactose" },
  };
  const t = map[type];
  if (!t) return null;
  return (
    <span className={`inline-block text-[10px] tracking-wide font-medium px-2.5 py-1 rounded-full ${t.cls}`}>
      {t.label}
    </span>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="line-ornament mb-4">
      <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-clay-light font-medium">
        {text}
      </span>
    </div>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const scrolled = useScrollNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof MENU>("bowls");

  const conceptRef = useReveal();
  const menuRef = useReveal();
  const eventsRef = useReveal();
  const contactRef = useReveal();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const NAV = [
    { label: "Concept", href: "#concept" },
    { label: "Carte", href: "#carte" },
    { label: "Événements", href: "#evenements" },
    { label: "Contact", href: "#contact" },
  ];

  const currentMenu = MENU[activeCategory];

  return (
    <div className="grain">
      {/* ════════════════════════════════════
          NAVIGATION
          ════════════════════════════════════ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "nav-glass bg-espresso/85 py-3 shadow-[0_4px_30px_rgba(28,18,16,0.15)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex flex-col items-center text-white">
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
              The
            </span>
            <span className="font-serif text-xl md:text-2xl italic -mt-1 group-hover:text-terracotta-light transition-colors">
              Popkitchen
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/70 hover:text-white text-[13px] font-medium tracking-wider uppercase transition-colors duration-300
                  after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-terracotta-light after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/the_popkitchen/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-terracotta-light transition-colors duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white w-8 h-8 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-white transition-all duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-white transition-all duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pt-4 pb-8 space-y-5 bg-espresso/95 nav-glass">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block text-white/80 hover:text-terracotta-light text-lg font-serif italic transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════
          HERO
          ════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 hero-bg bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/40 to-espresso/80" />
        {/* Warm color wash */}
        <div className="absolute inset-0 bg-gradient-to-tr from-terracotta/10 via-transparent to-gold-warm/5" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Overline */}
          <div className="hero-text-anim hero-text-anim-1">
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-parchment/50 font-medium">
              Cantine &bull; Caf&eacute; &bull; Traiteur
            </span>
          </div>

          {/* Logo / Title */}
          <div className="hero-text-anim hero-text-anim-2 mt-6 mb-2">
            <span className="block font-sans text-[11px] md:text-xs tracking-[0.6em] uppercase text-parchment/40 font-light">
              The
            </span>
            <h1 className="font-serif text-[3.2rem] sm:text-7xl md:text-9xl lg:text-[10rem] italic text-parchment leading-[0.85] -mt-1">
              Popkitchen
            </h1>
          </div>

          {/* Cuisine du Monde badge */}
          <div className="hero-text-anim hero-text-anim-3 flex items-center justify-center gap-5 my-8 md:my-10">
            <span className="w-10 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-terracotta-light/50" />
            <span className="font-sans text-[13px] md:text-[15px] tracking-[0.35em] uppercase text-parchment font-medium">
              Cuisine du Monde
            </span>
            <span className="w-10 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-terracotta-light/50" />
          </div>

          {/* Tagline */}
          <p className="hero-text-anim hero-text-anim-4 font-hand text-2xl md:text-3xl text-parchment/70 mb-10">
            Comme chez mamie, mais globetrotteuse
          </p>

          {/* CTA */}
          <div className="hero-text-anim hero-text-anim-5 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#carte"
              className="group relative bg-terracotta hover:bg-terracotta-dark text-parchment font-sans font-medium text-[13px] tracking-wider uppercase px-10 py-4 rounded-full transition-all duration-400
                shadow-[0_4px_20px_rgba(193,114,71,0.3)] hover:shadow-[0_8px_30px_rgba(193,114,71,0.4)]"
            >
              D&eacute;couvrir la carte
            </a>
            <a
              href="#contact"
              className="text-parchment/60 hover:text-parchment font-sans text-[13px] tracking-wider uppercase border border-parchment/20 hover:border-parchment/40 px-10 py-4 rounded-full transition-all duration-400"
            >
              Nous trouver
            </a>
          </div>
        </div>

        {/* Dietary strip at bottom */}
        <div className="absolute bottom-0 inset-x-0 py-6 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-6">
            {[
              { icon: "\u262A", label: "Halal" },
              { icon: "\uD83C\uDF31", label: "V\u00e9g\u00e9tarien" },
              { icon: "\uD83C\uDF3E", label: "Sans gluten" },
              { icon: "\uD83E\uDD5B", label: "Sans lactose" },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 bg-parchment/10 border border-parchment/15 text-parchment/70 text-[11px] tracking-wider font-medium px-4 py-2 rounded-full backdrop-blur-sm"
              >
                <span className="text-sm">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 scroll-indicator">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-parchment/30 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════
          MARQUEE STRIP
          ════════════════════════════════════ */}
      <div className="bg-espresso py-4 overflow-hidden border-y border-parchment/5">
        <div className="marquee-track flex whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center mx-6 md:mx-10">
              <span className="font-serif italic text-lg md:text-xl text-parchment/20">
                {item}
              </span>
              <span className="ml-6 md:ml-10 w-1.5 h-1.5 rounded-full bg-terracotta/30" />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          CONCEPT
          ════════════════════════════════════ */}
      <section id="concept" className="section-warm py-28 md:py-36" ref={conceptRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section header */}
          <div className="text-center mb-20 reveal">
            <SectionLabel text="Notre philosophie" />
            <h2 className="font-serif text-5xl md:text-7xl italic text-espresso leading-tight">
              Un voyage<br />
              <span className="text-terracotta">dans chaque assiette</span>
            </h2>
          </div>

          {/* Asymmetric concept grid */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 stagger">
            {/* Card 1 — large */}
            <div className="md:col-span-7 reveal-left">
              <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-[0_2px_30px_rgba(28,18,16,0.04)] border border-parchment-dark/40 overflow-hidden group">
                <div className="absolute top-0 right-0 font-serif text-[120px] md:text-[180px] leading-none text-terracotta/[0.04] -mt-6 -mr-4 select-none pointer-events-none">
                  01
                </div>
                <div className="relative z-10">
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-terracotta font-semibold">
                    Globetrotteuse
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl italic text-espresso mt-3 mb-5 leading-snug">
                    Des saveurs venues<br />des quatre coins du monde
                  </h3>
                  <p className="text-clay text-[15px] leading-relaxed max-w-lg">
                    Cor&eacute;e, Tha&iuml;lande, Colombie, Japon... Chaque plat est un voyage.
                    Nous puisons dans les traditions culinaires du monde entier pour cr&eacute;er
                    une cuisine authentique, g&eacute;n&eacute;reuse et pleine de caract&egrave;re.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 — stacked */}
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
              <div className="reveal-right bg-espresso rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 font-serif text-[100px] leading-none text-parchment/[0.04] -mt-4 -mr-2 select-none pointer-events-none">
                  02
                </div>
                <div className="relative z-10">
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-terracotta-light font-semibold">
                    Comfort Food
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl italic text-parchment mt-3 mb-4 leading-snug">
                    Comme chez mamie
                  </h3>
                  <p className="text-parchment/50 text-[14px] leading-relaxed">
                    Le comfort food dans sa plus belle expression. Des recettes g&eacute;n&eacute;reuses,
                    faites maison, qui r&eacute;chauffent le c&oelig;ur.
                  </p>
                </div>
              </div>

              <div className="reveal-right bg-gradient-to-br from-terracotta to-terracotta-dark rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 font-serif text-[100px] leading-none text-white/[0.06] -mt-4 -mr-2 select-none pointer-events-none">
                  03
                </div>
                <div className="relative z-10">
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-parchment/70 font-semibold">
                    Inclusif
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl italic text-parchment mt-3 mb-4 leading-snug">
                    Pour tous, sans exception
                  </h3>
                  <p className="text-parchment/60 text-[14px] leading-relaxed">
                    Halal, v&eacute;g&eacute;tarien, sans gluten, sans lactose &mdash;
                    ici tout le monde trouve son bonheur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MENU / CARTE
          ════════════════════════════════════ */}
      <section id="carte" className="py-28 md:py-36 bg-parchment-light" ref={menuRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <SectionLabel text="Notre carte" />
            <h2 className="font-serif text-5xl md:text-7xl italic text-espresso leading-tight">
              Saveurs du Monde
            </h2>
            <p className="mt-4 font-hand text-xl text-clay">
              Des plats qui voyagent pour vous
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-14 reveal">
            {(Object.keys(MENU) as (keyof typeof MENU)[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`font-sans text-[12px] md:text-[13px] tracking-wider uppercase font-medium px-5 md:px-7 py-2.5 rounded-full transition-all duration-400 ${
                  activeCategory === key
                    ? "bg-espresso text-parchment shadow-lg"
                    : "text-clay hover:text-espresso hover:bg-parchment-dark/50"
                }`}
              >
                {key === "bowls" ? "Bowls" : key === "plats" ? "Plats" : "Douceurs"}
              </button>
            ))}
          </div>

          {/* Category title */}
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl md:text-4xl italic text-espresso">
              {currentMenu.title}
            </h3>
            <p className="font-sans text-sm text-clay-light mt-2">{currentMenu.subtitle}</p>
          </div>

          {/* Menu cards grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 stagger">
            {currentMenu.items.map((item) => (
              <div
                key={item.name}
                className="menu-item bg-white rounded-2xl p-7 md:p-8 border border-parchment-dark/30 relative overflow-hidden reveal"
              >
                {/* Origin badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-terracotta font-semibold">
                    {item.origin}
                  </span>
                  <span className="font-serif text-2xl md:text-3xl italic text-espresso">
                    {item.price}
                    <span className="text-sm text-clay-light ml-0.5">&euro;</span>
                  </span>
                </div>

                {/* Divider */}
                <div className="w-full h-[0.5px] bg-parchment-dark/60 mb-5" />

                {/* Name and desc */}
                <h4 className="font-serif text-xl md:text-2xl italic text-espresso mb-2 leading-tight">
                  {item.name}
                </h4>
                <p className="text-clay text-[13px] leading-relaxed mb-5">
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <Tag key={t} type={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-clay-light text-[13px] mt-14 font-serif italic">
            Carte indicative &mdash; nos plats changent au fil des saisons et de nos inspirations
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          EVENTS
          ════════════════════════════════════ */}
      <section id="evenements" className="section-dark py-28 md:py-36 relative" ref={eventsRef}>
        {/* Atmospheric warm glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold-warm/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-20 reveal">
            <div className="line-ornament mb-4">
              <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-parchment/30 font-medium">
                Plus qu&rsquo;un restaurant
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl italic text-parchment leading-tight">
              &Eacute;v&eacute;nements
            </h2>
          </div>

          {/* Event cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 stagger">
            {EVENTS.map((ev) => (
              <div
                key={ev.visual}
                className="event-card reveal bg-parchment/[0.03] border border-parchment/[0.08] rounded-2xl p-8 md:p-10"
              >
                {/* Large number */}
                <span className="block font-serif text-6xl italic text-terracotta/20 leading-none mb-6">
                  {ev.visual}
                </span>

                {/* When */}
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-warm font-semibold">
                  {ev.when}
                </span>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl italic text-parchment mt-3 mb-4 leading-snug whitespace-pre-line">
                  {ev.title}
                </h3>

                {/* Desc */}
                <p className="text-parchment/40 text-[14px] leading-relaxed">
                  {ev.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="text-center mt-16 reveal">
            <a
              href="https://www.instagram.com/the_popkitchen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-gold-warm/30 text-gold-warm hover:text-gold-bright hover:border-gold-warm/50 hover:bg-gold-warm/5 font-sans text-[13px] tracking-wider uppercase font-medium px-10 py-4 rounded-full transition-all duration-400"
            >
              <InstagramIcon className="w-4 h-4" />
              Suivez-nous sur Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          GALERIE
          ════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-parchment overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 text-center">
          <SectionLabel text="Notre univers" />
          <h2 className="font-serif text-4xl md:text-5xl italic text-espresso">
            Vu sur Instagram
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 px-2 md:px-6">
          {[
            { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80", alt: "Bibimbap coréen" },
            { src: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80", alt: "Curry thaï" },
            { src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80", alt: "Tacos" },
            { src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80", alt: "Mochi glacé" },
            { src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80", alt: "Bowls colorés" },
            { src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", alt: "Plats du monde" },
            { src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80", alt: "Matcha latte" },
            { src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80", alt: "Brunch" },
          ].map((img, i) => (
            <a
              key={i}
              href="https://www.instagram.com/the_popkitchen/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon className="w-6 h-6 text-parchment opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          CONTACT
          ════════════════════════════════════ */}
      <section id="contact" className="section-warm py-28 md:py-36" ref={contactRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-20 reveal">
            <SectionLabel text="Rendez-vous" />
            <h2 className="font-serif text-5xl md:text-7xl italic text-espresso leading-tight">
              Nous trouver
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Info column */}
            <div className="md:col-span-5 space-y-10 reveal-left">
              {/* Address */}
              <div>
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-terracotta font-semibold">
                  Adresse
                </span>
                <p className="font-serif text-2xl italic text-espresso mt-2 leading-snug">
                  45 boulevard national
                </p>
                <p className="font-serif text-2xl italic text-espresso">
                  13001 Marseille
                </p>
              </div>

              {/* Hours */}
              <div>
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-terracotta font-semibold">
                  Horaires
                </span>
                <p className="font-serif text-2xl italic text-espresso mt-2">
                  Lundi &mdash; Samedi
                </p>
                <p className="font-sans text-lg text-clay mt-1">
                  11h30 &mdash; 21h30
                </p>
                <p className="font-sans text-sm text-clay-light mt-2 italic">
                  Dimanche : ferm&eacute; (sauf &eacute;v&eacute;nements)
                </p>
              </div>

              {/* Phone */}
              <div>
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-terracotta font-semibold">
                  T&eacute;l&eacute;phone
                </span>
                <a
                  href="tel:0491645188"
                  className="block font-serif text-2xl italic text-espresso mt-2 hover:text-terracotta transition-colors"
                >
                  04 91 64 51 88
                </a>
              </div>

              {/* CTA */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=45+boulevard+national+13001+Marseille"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-espresso hover:bg-espresso-mid text-parchment font-sans text-[13px] tracking-wider uppercase font-medium px-8 py-4 rounded-full transition-all duration-400 shadow-[0_4px_20px_rgba(28,18,16,0.15)]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Ouvrir dans Google Maps
              </a>
            </div>

            {/* Map */}
            <div className="md:col-span-7 reveal-right">
              <div className="map-frame shadow-[0_4px_40px_rgba(28,18,16,0.08)] h-[420px] md:h-[500px]">
                <iframe
                  title="The PopKitchen — Marseille"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.1!2d5.3837!3d43.2965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0c6e0e0e0e1%3A0x0!2s45+Boulevard+National%2C+13001+Marseille!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
          ════════════════════════════════════ */}
      <footer className="bg-espresso py-16 md:py-20 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-terracotta/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
            {/* Logo */}
            <div>
              <span className="block font-sans text-[9px] tracking-[0.45em] uppercase text-parchment/30">
                The
              </span>
              <span className="block font-serif text-3xl italic text-parchment/80 -mt-1">
                Popkitchen
              </span>
              <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-parchment/20 mt-2">
                Cuisine du Monde
              </span>
            </div>

            {/* Info */}
            <div className="space-y-3 text-[13px] text-parchment/40">
              <p>45 bd national, 13001 Marseille</p>
              <p>Lundi &ndash; Samedi : 11h30 &ndash; 21h30</p>
              <p>
                <a href="tel:0491645188" className="hover:text-terracotta-light transition-colors">
                  04 91 64 51 88
                </a>
              </p>
            </div>

            {/* Social */}
            <div className="md:text-right">
              <a
                href="https://www.instagram.com/the_popkitchen/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-parchment/40 hover:text-terracotta-light transition-colors text-[13px]"
              >
                <InstagramIcon className="w-4 h-4" />
                @the_popkitchen
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-parchment/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-parchment/20 tracking-wide">
              &copy; {new Date().getFullYear()} The PopKitchen. Tous droits r&eacute;serv&eacute;s.
            </p>
            <p className="font-hand text-sm text-parchment/15">
              Fait avec amour &agrave; Marseille
            </p>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════
          STICKY MOBILE PHONE BUTTON
          ════════════════════════════════════ */}
      <a
        href="tel:0491645188"
        className="fixed bottom-6 right-6 z-40 md:hidden bg-terracotta hover:bg-terracotta-dark text-parchment w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(193,114,71,0.4)] transition-all duration-300 active:scale-95"
        aria-label="Appeler le restaurant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </a>
    </div>
  );
}
