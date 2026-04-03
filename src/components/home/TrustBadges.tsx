const badges = [
  {
    title: "Emballage sous vide",
    subtitle: "Conservation optimale",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="8" width="18" height="10" rx="2" />
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <path d="M9 13h6" />
      </svg>
    ),
  },
  {
    title: "Chaîne du froid",
    subtitle: "Respectée de A à Z",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Livraison 48h",
    subtitle: "Fraîcheur garantie",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Origine contrôlée",
    subtitle: "Traçabilité complète",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-sm border border-gray-100 hover:border-accent/20 hover:shadow-sm transition-all duration-200"
            >
              <span className="text-accent">{badge.icon}</span>
              <div>
                <p className="font-semibold text-primary text-sm">{badge.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
