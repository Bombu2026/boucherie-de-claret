"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

interface FormFields {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

const INITIAL: FormFields = { nom: "", email: "", sujet: "", message: "" };

const SUJETS = [
  "Renseignement produit",
  "Commande en cours",
  "Problème de livraison",
  "Partenariat / Pro",
  "Autre",
];

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [status, setStatus] = useState<FormState>("idle");

  function validate(): boolean {
    const newErrors: Partial<FormFields> = {};
    if (!fields.nom.trim() || fields.nom.trim().length < 2)
      newErrors.nom = "Nom requis (2 caractères minimum)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      newErrors.email = "Adresse email invalide";
    if (!fields.sujet.trim())
      newErrors.sujet = "Veuillez choisir un sujet";
    if (!fields.message.trim() || fields.message.trim().length < 10)
      newErrors.message = "Message requis (10 caractères minimum)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus("success");
        setFields(INITIAL);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-serif text-xl font-bold text-green-800 mb-2">
          Message envoyé !
        </h3>
        <p className="text-green-700 text-sm">
          Nous vous répondrons dans les meilleurs délais, généralement sous 24h.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-green-700 underline hover:no-underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Nom */}
      <div>
        <label
          htmlFor="contact-nom"
          className="block text-sm font-medium text-[var(--color-primary)] mb-1.5"
        >
          Nom complet <span className="text-[var(--color-accent)]">*</span>
        </label>
        <input
          id="contact-nom"
          name="nom"
          type="text"
          autoComplete="name"
          value={fields.nom}
          onChange={handleChange}
          placeholder="Jean Dupont"
          className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none transition-colors ${
            errors.nom
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-[var(--color-accent)]"
          }`}
        />
        {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-[var(--color-primary)] mb-1.5"
        >
          Email <span className="text-[var(--color-accent)]">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={handleChange}
          placeholder="jean@exemple.fr"
          className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none transition-colors ${
            errors.email
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-[var(--color-accent)]"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Sujet */}
      <div>
        <label
          htmlFor="contact-sujet"
          className="block text-sm font-medium text-[var(--color-primary)] mb-1.5"
        >
          Sujet <span className="text-[var(--color-accent)]">*</span>
        </label>
        <select
          id="contact-sujet"
          name="sujet"
          value={fields.sujet}
          onChange={handleChange}
          className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none transition-colors appearance-none cursor-pointer ${
            errors.sujet
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-[var(--color-accent)]"
          }`}
        >
          <option value="">Choisir un sujet…</option>
          {SUJETS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.sujet && <p className="text-red-500 text-xs mt-1">{errors.sujet}</p>}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[var(--color-primary)] mb-1.5"
        >
          Message <span className="text-[var(--color-accent)]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          placeholder="Votre message…"
          className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none transition-colors resize-none ${
            errors.message
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-[var(--color-accent)]"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-base"
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
