import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface ContactBody {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 }
    );
  }

  const { nom, email, sujet, message } = body as Partial<ContactBody>;

  if (!nom || typeof nom !== "string" || nom.trim().length < 2) {
    return NextResponse.json(
      { error: "Le nom est requis (2 caractères minimum)" },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide" },
      { status: 400 }
    );
  }

  if (!sujet || typeof sujet !== "string" || sujet.trim().length < 3) {
    return NextResponse.json(
      { error: "Le sujet est requis (3 caractères minimum)" },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Le message est requis (10 caractères minimum)" },
      { status: 400 }
    );
  }

  // MVP : log uniquement, pas d'envoi email réel
  console.log("[Contact] Nouveau message :", {
    nom: nom.trim(),
    email: email.trim(),
    sujet: sujet.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    { success: true, message: "Votre message a bien été envoyé." },
    { status: 200 }
  );
}
