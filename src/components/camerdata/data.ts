/** Données statiques Camer Data (opérateurs, forfaits, constantes WhatsApp). */

export const WHATSAPP_NUMBER = "237679349788";

/** Construit un lien wa.me avec message encodé. */
export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export type OperatorId = "MTN" | "Orange" | "CAMTEL";

export interface Operator {
  id: OperatorId;
  name: string;
  subtitle: string;
  /** Classes utilitaires de marque (badge logo + accent). */
  badgeClass: string;
  ringClass: string;
  /** Fond dégradé de l'étape 2 selon l'opérateur. */
  planBg: string;
}

export const OPERATORS: Operator[] = [
  {
    id: "MTN",
    name: "MTN Cameroun",
    subtitle: "Forfaits 7 Go, 30 Go, Illimité",
    badgeClass: "bg-mtn-yellow text-mtn-blue",
    ringClass: "from-mtn-yellow/70 to-mtn-blue/40",
    planBg: "linear-gradient(160deg, #FFFBE6, #FFFDF0)",
  },
  {
    id: "Orange",
    name: "Orange Cameroun",
    subtitle: "Forfaits 7 Go, 30 Go, Illimité",
    badgeClass: "bg-orange-brand text-white",
    ringClass: "from-orange-brand/70 to-foreground/30",
    planBg: "linear-gradient(160deg, #FFF5F0, #FFF9F5)",
  },
  {
    id: "CAMTEL",
    name: "CAMTEL",
    subtitle: "Forfaits 7 Go, 30 Go, Illimité",
    badgeClass: "bg-camtel-blue text-white",
    ringClass: "from-camtel-blue/70 to-camtel-blue/20",
    planBg: "linear-gradient(160deg, #F0F7FF, #F5F9FF)",
  },
];

export interface Plan {
  id: string;
  data: string;
  validity: string;
  price: string;
  badge?: "Populaire" | "Premium";
}

export const PLANS: Plan[] = [
  { id: "7 Go", data: "7 Go", validity: "Validité : 7 jours", price: "1 200 FCFA" },
  {
    id: "30 Go",
    data: "30 Go",
    validity: "Validité : 30 jours",
    price: "2 500 FCFA",
    badge: "Populaire",
  },
  {
    id: "ILLIMITÉ",
    data: "ILLIMITÉ",
    validity: "Validité : 30 jours",
    price: "5 000 FCFA",
    badge: "Premium",
  },
];

export const TICKER_ITEMS = [
  "🟢 67**89 a commandé 7Go MTN via WhatsApp",
  "🟢 65**12 a reçu son forfait Illimité Orange",
  "🟢 68**45 vient d'activer 30Go CAMTEL",
];

/** Détection réseau à partir du préfixe du numéro. */
export const detectNetwork = (phone: string): OperatorId | null => {
  const p = phone.slice(0, 2);
  if (["67", "68"].includes(p)) return "MTN";
  if (["65", "69"].includes(p)) return "Orange";
  if (["62", "24", "23"].includes(p)) return "CAMTEL";
  return null;
};
