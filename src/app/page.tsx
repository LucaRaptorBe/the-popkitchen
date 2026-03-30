"use client";

import { useState, useEffect } from "react";

/* ───────── data ───────── */

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Concept", href: "#concept" },
  { label: "Carte", href: "#menu" },
  { label: "Événements", href: "#events" },
  { label: "Contact", href: "#contact" },
];

const MENU_CATEGORIES = [
  {
    title: "Bowls du Monde",
    emoji: "🍜",
    items: [
      {
        name: "Bibimbap Coréen",
        desc: "Riz, légumes sautés, œuf, sauce gochujang",
        price: "12,50€",
        tags: ["Halal", "Sans lactose"],
      },
      {
        name: "Poké Bowl Hawaïen",
        desc: "Riz vinaigré, saumon, avocat, edamame, sauce sésame",
        price: "13,90€",
        tags: ["Sans gluten"],
      },
      {
        name: "Buddha Bowl",
        desc: "Quinoa, patate douce rôtie, pois chiches, tahini",
        price: "11,90€",
        tags: ["Végétarien", "Sans gluten"],
      },
    ],
  },
  {
    title: "Plats Signature",
    emoji: "🍛",
    items: [
      {
        name: "Curry Thaï au Lait de Coco",
        desc: "Poulet, légumes croquants, lait de coco, basilic thaï",
        price: "13,50€",
        tags: ["Halal", "Sans gluten", "Sans lactose"],
      },
      {
        name: "Tacos Colombiens",
        desc: "Tortillas maison, viande épicée, guacamole, pico de gallo",
        price: "12,90€",
        tags: ["Halal"],
      },
      {
        name: "Nems Maison",
        desc: "Nems croustillants, sauce nuoc-mâm, salade fraîche",
        price: "10,90€",
        tags: ["Halal"],
      },
    ],
  },
  {
    title: "Douceurs & Boissons",
    emoji: "🍵",
    items: [
      {
        name: "Mochi Glacé",
        desc: "Pistache, matcha, noix de coco, sésame noir, fruit de la passion",
        price: "3,50€",
        tags: ["Sans gluten"],
      },
      {
        name: "Matcha Latte",
        desc: "Matcha premium, lait au choix, mousse onctueuse",
        price: "5,50€",
        tags: ["Végétarien"],
      },
      {
        name: "Cheesecake du Jour",
        desc: "Fraise, caramel beurre salé, ou sésame noir",
        price: "6,50€",
        tags: ["Végétarien"],
      },
    ],
  },
];

const EVENTS = [
  {
    title: "Yoga & Brunch du Monde",
    desc: "Une session yoga suivie d'un brunch aux saveurs du monde. Corps et esprit nourris.",
    icon: "🧘",
    date: "Chaque dimanche",
  },
  {
    title: "Soirée Latino",
    desc: "Nourriture colombienne, musique latine et soirée culturelle. Ambiance garantie!",
    icon: "💃",
    date: "1er samedi du mois",
  },
  {
    title: "Atelier Kimchi",
    desc: "Apprenez à préparer le kimchi traditionnel coréen avec notre chef.",
    icon: "🥬",
    date: "Sur réservation",
  },
];

/* ───────── components ───────── */

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Decorative flourish top */}
        <path
          d="M60 8 C80 2, 120 2, 140 8"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M55 6 C57 4, 59 5, 60 8"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M145 6 C143 4, 141 5, 140 8"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />

        {/* THE */}
        <text
          x="100"
          y="18"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="9"
          letterSpacing="6"
          fill="currentColor"
          opacity="0.8"
        >
          THE
        </text>

        {/* PopKitchen */}
        <text
          x="100"
          y="40"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="22"
          fontWeight="500"
          fontStyle="italic"
          fill="currentColor"
        >
          Popkitchen
        </text>

        {/* CUISINE DU MONDE */}
        <text
          x="100"
          y="52"
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="5.5"
          letterSpacing="3"
          fill="currentColor"
          opacity="0.6"
        >
          CUISINE DU MONDE
        </text>

        {/* Decorative flourish bottom */}
        <path
          d="M60 55 C80 60, 120 60, 140 55"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

function TagBadge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    Halal: "bg-emerald-100 text-emerald-800",
    Végétarien: "bg-green-100 text-green-800",
    "Sans gluten": "bg-amber-100 text-amber-800",
    "Sans lactose": "bg-sky-100 text-sky-800",
  };
  return (
    <span
      className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[label] ?? "bg-gray-100 text-gray-700"}`}
    >
      {label}
    </span>
  );
}

/* ───────── page ───────── */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "nav-blur bg-brown-dark/90 shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="text-white w-40">
            <Logo />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-gold text-sm font-medium tracking-wide transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/the_popkitchen/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-brown-dark/95 nav-blur px-6 pb-6 pt-2 space-y-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block text-white/80 hover:text-gold text-base font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image placeholder — warm restaurant ambiance */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="text-white mb-6 w-64 mx-auto">
            <Logo />
          </div>

          <p className="text-gold-light font-serif text-xl md:text-2xl italic mb-4">
            Comme chez mamie, mais globetrotteuse
          </p>

          <div className="flex items-center justify-center gap-3 text-white/70 text-sm mb-8">
            <span>Cantine</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Café</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Traiteur</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#menu"
              className="bg-copper hover:bg-copper-dark text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-copper/30 text-sm tracking-wide"
            >
              Découvrir la carte
            </a>
            <a
              href="#contact"
              className="border border-white/30 text-white hover:bg-white/10 font-medium px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide"
            >
              Nous trouver
            </a>
          </div>

          {/* Dietary badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10 text-white/60 text-xs">
            <span className="border border-white/20 rounded-full px-3 py-1">
              ☪ Halal
            </span>
            <span className="border border-white/20 rounded-full px-3 py-1">
              🌱 Végétarien
            </span>
            <span className="border border-white/20 rounded-full px-3 py-1">
              🌾 Sans gluten
            </span>
            <span className="border border-white/20 rounded-full px-3 py-1">
              🥛 Sans lactose
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </section>

      {/* ── CONCEPT ── */}
      <section id="concept" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-copper-dark mb-4">
              Notre Concept
            </h2>
            <p className="divider text-copper/60 text-sm tracking-[0.3em] uppercase max-w-xs mx-auto">
              Cuisine du Monde
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌍",
                title: "Globetrotteuse",
                text: "Des saveurs venues des quatre coins du monde, cuisinées avec amour et authenticité. Corée, Thaïlande, Colombie, Japon... chaque plat est un voyage.",
              },
              {
                icon: "👵",
                title: "Comme chez Mamie",
                text: "Le comfort food dans sa plus belle expression. Des recettes généreuses, faites maison, qui réchauffent le cœur et nourrissent l'âme.",
              },
              {
                icon: "🤝",
                title: "Pour Tous",
                text: "Halal, végétarien, sans gluten, sans lactose — ici tout le monde trouve son bonheur. La cuisine qui rassemble, sans exception.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-5xl mb-4 block">{card.icon}</span>
                <h3 className="font-serif text-2xl text-copper-dark mb-3">
                  {card.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-copper-dark mb-4">
              Notre Carte
            </h2>
            <p className="divider text-copper/60 text-sm tracking-[0.3em] uppercase max-w-xs mx-auto">
              Saveurs du Monde
            </p>
          </div>

          <div className="space-y-16">
            {MENU_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <h3 className="font-serif text-2xl md:text-3xl text-copper-dark mb-8 text-center">
                  <span className="mr-3">{cat.emoji}</span>
                  {cat.title}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="menu-card bg-white rounded-2xl p-6 shadow-sm border border-cream-dark/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-serif text-lg text-copper-dark font-medium">
                          {item.name}
                        </h4>
                        <span className="text-copper font-semibold text-sm whitespace-nowrap ml-3">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-foreground/60 text-sm leading-relaxed mb-3">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <TagBadge key={t} label={t} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-foreground/50 text-sm mt-12 italic">
            Carte indicative — nos plats changent au fil des saisons et de nos inspirations
          </p>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="py-24 bg-brown-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">
              Événements
            </h2>
            <p className="divider text-gold-light/40 text-sm tracking-[0.3em] uppercase max-w-xs mx-auto">
              Plus qu&apos;un restaurant
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {EVENTS.map((ev) => (
              <div
                key={ev.title}
                className="border border-white/10 rounded-2xl p-8 hover:border-gold/30 transition-colors bg-white/5"
              >
                <span className="text-4xl mb-4 block">{ev.icon}</span>
                <p className="text-gold/80 text-xs font-medium tracking-wider uppercase mb-2">
                  {ev.date}
                </p>
                <h3 className="font-serif text-xl text-white mb-3">
                  {ev.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {ev.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/the_popkitchen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 font-medium px-8 py-3 rounded-full transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Suivez-nous sur Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-copper-dark mb-4">
              Nous Trouver
            </h2>
            <p className="divider text-copper/60 text-sm tracking-[0.3em] uppercase max-w-xs mx-auto">
              Bienvenue
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl text-copper-dark mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Adresse
                </h3>
                <p className="text-foreground/70">
                  45 boulevard national<br />
                  13001 Marseille, France
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-copper-dark mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Horaires
                </h3>
                <div className="text-foreground/70 space-y-1">
                  <p>
                    <span className="font-medium text-foreground/90">Lundi — Samedi</span>
                    <br />
                    11h30 — 21h30
                  </p>
                  <p className="text-foreground/50 text-sm italic">
                    Dimanche : Fermé (sauf événements)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl text-copper-dark mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-copper" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Contact
                </h3>
                <p className="text-foreground/70">
                  <a href="tel:0491645188" className="hover:text-copper transition-colors">
                    04 91 64 51 88
                  </a>
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=45+boulevard+national+13001+Marseille"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-copper hover:bg-copper-dark text-white font-medium px-6 py-3 rounded-full transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
                Ouvrir dans Google Maps
              </a>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] bg-cream-dark">
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
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-brown-dark text-white/60 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white w-36">
              <Logo />
            </div>

            <div className="text-center md:text-right space-y-2 text-sm">
              <p>45 bd national, 13001 Marseille</p>
              <p>Lun–Sam : 11h30–21h30</p>
              <p>
                <a href="tel:0491645188" className="hover:text-gold transition-colors">
                  04 91 64 51 88
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} The PopKitchen. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/the_popkitchen/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
