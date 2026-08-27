/** Petits composants réutilisables de la landing Camer Data. */
import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Indicateur d'étape (ex: "Étape 1 sur 3"). */
export function StepBadge({ step }: { step: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-accent/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      Étape {step} sur 3
    </span>
  );
}

/** En-tête de section : badge + titre + explication. */
export function SectionHeader({
  step,
  title,
  description,
}: {
  step: number;
  title: ReactNode;
  description: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <StepBadge step={step} />
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </motion.header>
  );
}

/** Logo textuel d'opérateur (pastille de marque). */
export function OperatorMark({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex h-12 min-w-24 items-center justify-center rounded-xl px-4 text-lg font-extrabold tracking-tight shadow-sm ${className}`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
