import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Mail, MessageCircle, Rocket, ShieldCheck, Sparkles } from "lucide-react";

import logoAsset from "@/assets/camerdata-logo.png.asset.json";
import flyer1 from "@/assets/image1.png";
import flyer2 from "@/assets/image2.png";
import flyer3 from "@/assets/image3.png";
import flyer4 from "@/assets/image4.png";
import {
  OPERATORS,
  PLANS,
  TICKER_ITEMS,
  detectNetwork,
  waLink,
  type OperatorId,
} from "@/components/camerdata/data";
import { OperatorMark, SectionHeader } from "@/components/camerdata/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Camer Data — Recharge internet MTN, Orange, CAMTEL via WhatsApp" },
      {
        name: "description",
        content:
          "Commandez votre forfait internet MTN, Orange ou CAMTEL en 30 secondes via WhatsApp. Paiement Mobile Money, activation immédiate au Cameroun.",
      },
      { property: "og:title", content: "Camer Data — Forfait internet activé via WhatsApp" },
      {
        property: "og:description",
        content:
          "MTN, Orange et CAMTEL. Commandez directement avec un agent Camer Data et recevez votre activation en quelques secondes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HERO_WA = waLink(
  "Bonjour Camer Data 👋, j'aimerais recharger mon forfait internet. Pouvez-vous m'aider ?",
);
const FLOAT_WA = waLink(
  "Bonjour Camer Data 👋, j'ai une question sur mes forfaits internet. Pouvez-vous m'orienter ?",
);

const FLYERS = [flyer1, flyer2, flyer3];

function Index() {
  // ---------- États du parcours ----------
  const [selectedOperator, setSelectedOperator] = useState<OperatorId | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState("");
  const [paymentNetwork, setPaymentNetwork] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const step2Ref = useRef<HTMLElement>(null);
  const step3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  const activeOperator = OPERATORS.find((o) => o.id === selectedOperator) ?? null;
  const phoneNetwork = detectNetwork(userPhone);

  const isComplete =
    userPhone.length >= 9 && !!selectedPlan && !!selectedOperator && !!paymentNetwork;

  // ---------- Lien WhatsApp final (recalculé à chaque changement d'état) ----------
  const finalWaHref = useMemo(() => {
    const message = `Bonjour Camer Data ! 👋\nJe souhaite commander :\n📱 Forfait : ${selectedPlan} (${selectedOperator})\n📞 Numéro à recharger : +237${userPhone}\n💳 Réseau de paiement : ${paymentNetwork}\n\nMerci de procéder à l'activation ! ✅`;
    return `https://wa.me/237679349788?text=${encodeURIComponent(message)}`;
  }, [selectedPlan, selectedOperator, userPhone, paymentNetwork]);

  return (
    <div className="min-h-screen bg-background">
      {/* ══════════ NAVBAR FIXE ══════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[70px] transition-all duration-300 ${
          scrolled ? "border-b border-white/40 bg-white/80 backdrop-blur-md shadow-sm" : ""
        }`}
      >
        <nav
          className="mx-auto flex h-full max-w-6xl items-center justify-between px-4"
          aria-label="Navigation principale"
        >
          <a href="#top" className="flex items-center gap-2" aria-label="Camer Data, accueil">
            <img src={logoAsset.url} alt="Camer Data" className="h-9 w-auto" width={220} />
          </a>
          <a
            href="mailto:contact@camerdata.cm"
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/50 px-3.5 py-2 text-xs font-semibold text-primary backdrop-blur-md transition hover:bg-white/80 sm:text-sm"
          >
            <Mail size={16} aria-hidden="true" />
            <span className="hidden sm:inline">contact@camerdata.cm</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </nav>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section id="top" className="hero-bg relative overflow-hidden px-4 pb-14 pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-semibold text-accent sm:text-sm">
            <CheckCircle2 size={16} aria-hidden="true" />
            +250 activations réussies ce mois-ci
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl">
            Votre forfait internet activé via WhatsApp en 30 secondes.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            MTN, Orange et CAMTEL. Commandez directement avec un agent Camer Data.
          </p>

          <a
            href={HERO_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 sm:w-auto"
            aria-label="Commander sur WhatsApp maintenant"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Commander sur WhatsApp maintenant
          </a>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={14} aria-hidden="true" /> Paiement Mobile Money · Activation immédiate
          </p>
        </motion.div>
      </section>

      {/* ══════════ MARQUEE FLYERS ══════════ */}
      <section aria-label="Nos offres en images" className="py-6">
        <div className="edge-fade overflow-hidden">
          <div className="marquee-track flex w-max gap-5 px-5">
            {[...FLYERS, ...FLYERS].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Flyer promotionnel Camer Data"
                loading="lazy"
                className="h-[220px] w-auto rounded-2xl object-cover shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-[1.04]"
              />
            ))}
          </div>
        </div>

        {/* Ticker d'activité */}
        <div className="glass mx-4 mt-5 overflow-hidden rounded-2xl py-2.5">
          <div className="ticker-track flex w-max gap-10 px-6 text-xs font-medium text-primary sm:text-sm">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className="whitespace-nowrap">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ÉTAPE 1 — OPÉRATEUR ══════════ */}
      <section id="etape-1" className="px-4 py-16">
        <SectionHeader
          step={1}
          title="Choisissez votre opérateur"
          description="Sélectionnez l'opérateur du numéro à recharger. Nous détecterons automatiquement le réseau de paiement compatible."
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {OPERATORS.map((op) => {
            const active = selectedOperator === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => {
                  setSelectedOperator(op.id);
                  setSelectedPlan(null);
                  scrollTo(step2Ref);
                }}
                aria-pressed={active}
                aria-label={`Choisir ${op.name}`}
                className={`glass group relative rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active ? "ring-2 ring-accent shadow-[var(--shadow-glow)]" : ""
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${op.ringClass}`}
                  aria-hidden="true"
                />
                <OperatorMark label={op.id} className={op.badgeClass} />
                <h3 className="mt-4 text-lg font-bold text-primary">{op.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{op.subtitle}</p>
                {active && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                    <CheckCircle2 size={14} aria-hidden="true" /> Sélectionné
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ══════════ ÉTAPE 2 — FORFAITS ══════════ */}
      <section
        id="etape-2"
        ref={step2Ref}
        className="px-4 py-16 transition-all duration-500"
        style={activeOperator ? { backgroundImage: activeOperator.planBg } : undefined}
      >
        <SectionHeader
          step={2}
          title={`Forfaits ${selectedOperator ?? "disponibles"}`}
          description="Sélectionnez le forfait adapté à vos besoins. Tous sont disponibles 24h/24."
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {PLANS.map((plan) => {
            const active = selectedPlan === plan.id;
            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45 }}
                className={`glass relative flex flex-col rounded-2xl p-6 ${
                  plan.badge === "Populaire" || active ? "ring-2 ring-accent" : ""
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      plan.badge === "Populaire"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-3xl font-extrabold text-primary">{plan.data}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.validity}</p>
                <p className="mt-4 text-2xl font-bold text-accent">{plan.price}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    scrollTo(step3Ref);
                  }}
                  aria-label={`Sélectionner le forfait ${plan.data}`}
                  className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
                    active
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {active ? "Sélectionné ✓" : "Sélectionner"}
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ══════════ ÉTAPE 3 — FORMULAIRE WHATSAPP ══════════ */}
      <section id="etape-3" ref={step3Ref} className="px-4 py-16">
        <SectionHeader
          step={3}
          title="Finalisez votre commande sur WhatsApp"
          description="Entrez votre numéro et choisissez comment payer. Vous serez redirigé vers WhatsApp avec toutes les infos pré-remplies pour une activation immédiate."
        />

        <div className="glass mx-auto mt-10 max-w-2xl rounded-2xl p-6 sm:p-8">
          {/* Numéro */}
          <label htmlFor="phone" className="block text-sm font-semibold text-primary">
            Numéro à recharger
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2.5 backdrop-blur-md focus-within:ring-2 focus-within:ring-accent">
            <span className="text-sm font-bold text-primary">+237</span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="6XX XXX XXX"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
              className="w-full bg-transparent text-base text-primary outline-none placeholder:text-muted-foreground"
              aria-describedby="phone-hint"
            />
            {phoneNetwork && (
              <OperatorMark
                label={phoneNetwork}
                className={`!h-7 !min-w-14 !px-2 !text-[11px] ${
                  OPERATORS.find((o) => o.id === phoneNetwork)!.badgeClass
                }`}
              />
            )}
          </div>
          <p id="phone-hint" className="mt-1.5 text-xs text-muted-foreground">
            9 chiffres, sans indicatif. Le réseau est détecté automatiquement.
          </p>

          {/* Réseau de paiement */}
          <p className="mt-6 text-sm font-semibold text-primary">Réseau de paiement</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {["MTN Mobile Money", "Orange Money"].map((net) => {
              const active = paymentNetwork === net;
              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => setPaymentNetwork(net)}
                  aria-pressed={active}
                  className={`rounded-xl border px-4 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                    active
                      ? "border-accent bg-accent/12 text-accent ring-2 ring-accent"
                      : "border-white/60 bg-white/60 text-primary"
                  }`}
                >
                  {net}
                </button>
              );
            })}
          </div>

          {/* Récapitulatif dynamique */}
          <div className="glass mt-6 rounded-2xl p-4 text-sm">
            <p className="flex items-center gap-2 font-semibold text-primary">
              <Sparkles size={16} aria-hidden="true" /> Récapitulatif
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground" aria-live="polite">
              Forfait&nbsp;
              <strong className="text-primary">{selectedPlan ?? "—"}</strong>&nbsp;
              <strong className="text-primary">{selectedOperator ?? "—"}</strong> | Numéro :{" "}
              <strong className="text-primary">+237{userPhone || "—"}</strong> | Paiement :{" "}
              <strong className="text-primary">{paymentNetwork ?? "—"}</strong>
            </p>
          </div>

          {/* CTA final */}
          <div className="group relative mt-6">
            <a
              href={isComplete ? finalWaHref : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!isComplete}
              tabIndex={isComplete ? 0 : -1}
              aria-label="Envoyer ma commande sur WhatsApp"
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold transition ${
                isComplete
                  ? "shimmer bg-accent text-accent-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              }`}
            >
              <MessageCircle size={20} aria-hidden="true" />
              Envoyer ma commande sur WhatsApp
            </a>
            {!isComplete && (
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground opacity-0 transition group-hover:opacity-100"
              >
                Veuillez remplir tous les champs
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ COMMENT ÇA MARCHE ══════════ */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Un processus simple en 3 étapes, pensé pour être rapide et sécurisé.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Choisissez",
              text: "Sélectionnez votre opérateur et forfait. Tous nos forfaits sont disponibles 24h/24.",
            },
            {
              icon: MessageCircle,
              title: "Commandez",
              text: "Remplissez vos infos et cliquez sur WhatsApp. Un agent Camer Data prend en charge votre commande instantanément.",
            },
            {
              icon: Rocket,
              title: "Recevez",
              text: "Payez via Mobile Money et recevez votre SMS d'activation en quelques secondes. Simple et fiable !",
            },
          ].map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 Camer Data. Tous droits réservés.</p>
        <a href="mailto:contact@camerdata.cm" className="mt-1 inline-block font-medium text-primary">
          contact@camerdata.cm
        </a>
      </footer>

      {/* ══════════ BOUTON FLOTTANT WHATSAPP ══════════ */}
      <div className="group fixed bottom-6 right-6 z-50">
        <a
          href={FLOAT_WA}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Besoin d'aide ? Écrivez-nous sur WhatsApp"
          className="pulse-soft flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[var(--shadow-glow)] transition hover:scale-105"
        >
          <MessageCircle size={28} aria-hidden="true" />
        </a>
        <span
          role="tooltip"
          className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground opacity-0 transition group-hover:opacity-100"
        >
          Besoin d'aide ? Écrivez-nous !
        </span>
      </div>
    </div>
  );
}
