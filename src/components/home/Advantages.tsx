const items = [
  {
    title: "Livraison offerte",
    subtitle: "Dès 100\u00a0€ d'achat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Click & Collect",
    subtitle: "Retrait en boutique gratuit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Qualité Premium",
    subtitle: "Viandes d'exception sélectionnées",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function Advantages() {
  return (
    <section className="bg-cream py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-4">
              <span className="text-accent">{item.icon}</span>
              <div>
                <p className="font-serif text-lg font-bold text-primary">{item.title}</p>
                <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
