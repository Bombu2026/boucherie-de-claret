"use client";

import { useState } from "react";

type AuthTab = "connexion" | "inscription";

interface UserInfo {
  nom: string;
  email: string;
  telephone: string;
}

interface ConnexionFields {
  email: string;
  password: string;
}

interface InscriptionFields {
  nom: string;
  email: string;
  telephone: string;
  password: string;
  confirm: string;
}

const CONN_INIT: ConnexionFields = { email: "", password: "" };
const INS_INIT: InscriptionFields = {
  nom: "",
  email: "",
  telephone: "",
  password: "",
  confirm: "",
};

export default function ComptePage() {
  const [tab, setTab] = useState<AuthTab>("connexion");
  const [connFields, setConnFields] = useState<ConnexionFields>(CONN_INIT);
  const [insFields, setInsFields] = useState<InscriptionFields>(INS_INIT);
  const [connError, setConnError] = useState<string | null>(null);
  const [insErrors, setInsErrors] = useState<Partial<InscriptionFields>>({});

  // Simulated auth state
  const [user, setUser] = useState<UserInfo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editFields, setEditFields] = useState<UserInfo>({ nom: "", email: "", telephone: "" });
  const [saveConfirm, setSaveConfirm] = useState(false);

  // --- Connexion ---
  function handleConnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConnFields((p) => ({ ...p, [e.target.name]: e.target.value }));
    setConnError(null);
  }

  function handleConnSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!connFields.email || !connFields.password) {
      setConnError("Veuillez remplir tous les champs.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(connFields.email)) {
      setConnError("Adresse email invalide.");
      return;
    }
    // Simulation : on accepte toujours la connexion
    setUser({
      nom: connFields.email.split("@")[0],
      email: connFields.email,
      telephone: "",
    });
    setConnFields(CONN_INIT);
  }

  // --- Inscription ---
  function handleInsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInsFields((p) => ({ ...p, [e.target.name]: e.target.value }));
    setInsErrors((p) => ({ ...p, [e.target.name]: undefined }));
  }

  function validateIns(): boolean {
    const errs: Partial<InscriptionFields> = {};
    if (!insFields.nom.trim() || insFields.nom.trim().length < 2)
      errs.nom = "Nom requis (2 caractères minimum)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(insFields.email))
      errs.email = "Email invalide";
    if (insFields.telephone && !/^[\d\s\+\-\.]{8,15}$/.test(insFields.telephone.replace(/\s/g, "")))
      errs.telephone = "Numéro invalide";
    if (!insFields.password || insFields.password.length < 8)
      errs.password = "Mot de passe : 8 caractères minimum";
    if (insFields.password !== insFields.confirm)
      errs.confirm = "Les mots de passe ne correspondent pas";
    setInsErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleInsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateIns()) return;
    setUser({
      nom: insFields.nom,
      email: insFields.email,
      telephone: insFields.telephone,
    });
    setInsFields(INS_INIT);
  }

  // --- Edition profil ---
  function startEdit() {
    if (!user) return;
    setEditFields({ ...user });
    setEditMode(true);
    setSaveConfirm(false);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditFields((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    setUser({ ...editFields });
    setEditMode(false);
    setSaveConfirm(true);
    setTimeout(() => setSaveConfirm(false), 3000);
  }

  // --- Déconnexion ---
  function handleLogout() {
    setUser(null);
  }

  // ========================
  // Authenticated view
  // ========================
  if (user) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)]">
        <div className="bg-[var(--color-primary)] py-14 px-6 text-center">
          <h1 className="font-serif text-4xl font-bold text-white">Mon compte</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Bonjour, <span className="text-[var(--color-gold)] font-medium">{user.nom}</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
          {/* Informations personnelles */}
          <div className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                Informations personnelles
              </h2>
              {!editMode && (
                <button
                  onClick={startEdit}
                  className="text-sm text-[var(--color-accent)] hover:underline font-medium"
                >
                  Modifier
                </button>
              )}
            </div>

            {saveConfirm && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-700 text-sm">
                Informations mises à jour.
              </div>
            )}

            {editMode ? (
              <form onSubmit={handleEditSave} className="space-y-4">
                <Field
                  label="Nom"
                  name="nom"
                  value={editFields.nom}
                  onChange={handleEditChange}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={editFields.email}
                  onChange={handleEditChange}
                  autoComplete="email"
                />
                <Field
                  label="Téléphone"
                  name="telephone"
                  type="tel"
                  value={editFields.telephone}
                  onChange={handleEditChange}
                  autoComplete="tel"
                  placeholder="06 00 00 00 00"
                />
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="border border-gray-200 text-gray-500 hover:text-[var(--color-primary)] px-6 py-2 rounded-lg text-sm transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-sm">
                <InfoRow label="Nom" value={user.nom} />
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Téléphone" value={user.telephone || "Non renseigné"} />
              </div>
            )}
          </div>

          {/* Historique commandes */}
          <div className="bg-white rounded-2xl border border-[var(--color-cream-dark)] p-8">
            <h2 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-6">
              Historique des commandes
            </h2>
            <div className="text-center py-10 text-gray-400">
              <div className="text-5xl mb-4 opacity-40">📦</div>
              <p className="font-medium">Aucune commande pour le moment</p>
              <p className="text-sm mt-1">
                Vos commandes apparaîtront ici une fois passées.
              </p>
            </div>
          </div>

          {/* Déconnexion */}
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-[var(--color-accent)] transition-colors underline"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // Auth form
  // ========================
  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
            Mon compte
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Connectez-vous pour accéder à vos commandes et préférences.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-cream-dark)] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[var(--color-cream-dark)]">
            {(["connexion", "inscription"] as AuthTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                  tab === t
                    ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] bg-white"
                    : "text-gray-400 hover:text-[var(--color-primary)] bg-[var(--color-cream)]"
                }`}
              >
                {t === "connexion" ? "Connexion" : "Créer un compte"}
              </button>
            ))}
          </div>

          <div className="p-8">
            {tab === "connexion" ? (
              <form onSubmit={handleConnSubmit} noValidate className="space-y-4">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={connFields.email}
                  onChange={handleConnChange}
                  autoComplete="email"
                  placeholder="jean@exemple.fr"
                />
                <Field
                  label="Mot de passe"
                  name="password"
                  type="password"
                  value={connFields.password}
                  onChange={handleConnChange}
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                {connError && (
                  <p className="text-red-500 text-xs">{connError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                >
                  Se connecter
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  MVP — toute combinaison email / mot de passe est acceptée.
                </p>
              </form>
            ) : (
              <form onSubmit={handleInsSubmit} noValidate className="space-y-4">
                <Field
                  label="Nom complet"
                  name="nom"
                  value={insFields.nom}
                  onChange={handleInsChange}
                  autoComplete="name"
                  placeholder="Jean Dupont"
                  error={insErrors.nom}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={insFields.email}
                  onChange={handleInsChange}
                  autoComplete="email"
                  placeholder="jean@exemple.fr"
                  error={insErrors.email}
                />
                <Field
                  label="Téléphone (optionnel)"
                  name="telephone"
                  type="tel"
                  value={insFields.telephone}
                  onChange={handleInsChange}
                  autoComplete="tel"
                  placeholder="06 00 00 00 00"
                  error={insErrors.telephone}
                />
                <Field
                  label="Mot de passe"
                  name="password"
                  type="password"
                  value={insFields.password}
                  onChange={handleInsChange}
                  autoComplete="new-password"
                  placeholder="8 caractères minimum"
                  error={insErrors.password}
                />
                <Field
                  label="Confirmer le mot de passe"
                  name="confirm"
                  type="password"
                  value={insFields.confirm}
                  onChange={handleInsChange}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  error={insErrors.confirm}
                />
                <button
                  type="submit"
                  className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                >
                  Créer mon compte
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`field-${name}`}
        className="block text-sm font-medium text-[var(--color-primary)] mb-1.5"
      >
        {label}
      </label>
      <input
        id={`field-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-[var(--color-cream)] focus:outline-none transition-colors ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-[var(--color-accent)]"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 py-2 border-b border-[var(--color-cream-dark)] last:border-0">
      <span className="text-gray-400 w-24 shrink-0">{label}</span>
      <span className="text-[var(--color-primary)] font-medium">{value}</span>
    </div>
  );
}
