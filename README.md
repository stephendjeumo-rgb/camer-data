# Camer Data WhatsApp Connect

Agis comme un expert Senior UI/UX et Développeur Fullstack React/Tailwind. Crée une landing page one-page moderne, fluide et 100% orientée conversion pour "Camer Data", plateforme de recharge internet au Cameroun. 



Le site doit conserver le design premium existant (Glassmorphism, Bleu Sarcelle #0F4C75, Vert Émeraude #10B981, effets Shimmer, bandes filantes) mais basculer intégralement vers un modèle "WhatsApp First". Toute interaction d'achat doit rediriger vers WhatsApp avec un message pré-structuré.



═══════════════════════════════════════════════════════════

️ CONTRAINTES STRICTES & DONNÉES CIBLES

═══════════════════════════════════════════════════════════

- NUMÉRO WHATSAPP BUSINESS : 237679349788 (à utiliser dans TOUS les liens wa.me).

- INTERDIT ABSOLU : Pas de rouge, pas de modal de paiement, pas de checkout complexe, PAS DE PAGE DE SUCCÈS, pas de case à cocher, pas de lien CamerPay direct visible.

- DESIGN : Mobile-First, Glassmorphism (backdrop-blur-md, bg-white/40, border-white/30), coins rounded-2xl, ombres douces.

- TYPOGRAPHIE : Inter ou Poppins, moderne et très lisible.

- NAVBAR FIXE : Transparente → bg-white/80 backdrop-blur-md au scroll (scrollY > 50), hauteur 70px, z-index élevé. Logo "Camer Data" à gauche, mailto:contact@camerdata.cm à droite.



═══════════════════════════════════════════════════════════

🔄 PARCOURS UTILISATEUR & LOGIQUE WHATSAPP (ÉTAT REACT)

═══════════════════════════════════════════════════════════

Utilise useState pour gérer : selectedOperator, selectedPlan, userPhone, paymentNetwork. 

Tous les boutons d'action doivent générer dynamiquement des liens wa.me via encodeURIComponent().



1️⃣ HEADER & HERO (CONSERVER STYLE EXISTANT, MODIFIER CTA)

- Titre : "Votre forfait internet activé via WhatsApp en 30 secondes."

- Sous-titre : "MTN, Orange et CAMTEL. Commandez directement avec un agent Camer Data."

- Badge confiance vert : "✅ +250 activations réussies ce mois-ci".

- CTA Principal Hero : Bouton vert shimmer "💬 Commander sur WhatsApp maintenant".

  → Lien statique : https://wa.me/237679349788?text=Bonjour%20Camer%20Data%20%F0%9F%91%8B%2C%20j'aimerais%20recharger%20mon%20forfait%20internet.%20Pouvez-vous%20m'aider%20%3F



2️⃣ BANDES FILANTES (MARQUEE + TICKER - CONSERVER EXACTEMENT)

- Marquee images : 3 flyers Camer Data (placeholders image1.jpg, image2.jpg, image3.jpg), défilement infini horizontal lent (25s), fondu aux bords, hauteur 220px, zoom léger au survol.

- Ticker activité : Barre fine glassmorphism sous le marquee. Messages continus : "🟢 67**89 a commandé 7Go MTN via WhatsApp", "🟢 65**12 a reçu son forfait Illimité Orange", "🟢 68**45 vient d'activer 30Go CAMTEL".



3️⃣ ÉTAPE 1 — CHOIX OPÉRATEUR (AVEC EXPLICATION SOUS TITRE)

- Indicateur visuel : "Étape 1 sur 3".

- Titre : "Choisissez votre opérateur".

- Explication sous titre : "Sélectionnez l'opérateur du numéro à recharger. Nous détecterons automatiquement le réseau de paiement compatible."

- 3 grandes cartes cliquables alignées (empilées sur mobile) :

  • Carte MTN : Jaune (#FFCC00) + Bleu (#004B8D), logo visible, "MTN Cameroun", "Forfaits 7 Go, 30 Go, Illimité", bordure/dégradé MTN, hover élévation+brillance.

  • Carte Orange : Orange (#FF6600) + Noir, logo visible, "Orange Cameroun", mêmes sous-textes, couleurs Orange.

  • Carte CAMTEL : Bleu (#0066CC) + Blanc, logo visible, "CAMTEL", mêmes sous-textes, couleurs CAMTEL.

- AU CLIC : Mettre à jour `selectedOperator` + bordure verte brillante active + scroll smooth vers Étape 2.



4️ ÉTAPE 2 — CHOIX FORFAIT (DÉGRADÉS PAR OPÉRATEUR + EXPLICATION)

- Indicateur : "Étape 2 sur 3".

- Titre dynamique : "Forfaits {selectedOperator}".

- Explication sous titre : "Sélectionnez le forfait adapté à vos besoins. Tous sont disponibles 24h/24."

- Fond dégradé subtil selon opérateur choisi : MTN (#FFFBE6→#FFFDF0), Orange (#FFF5F0→#FFF9F5), CAMTEL (#F0F7FF→#F5F9FF).

- 3 cartes glassmorphism avec bordures colorées subtiles :

  * Carte 1 : "7 Go" | "Validité : 7 jours" | "1 200 FCFA"

  * Carte 2 (Badge "Populaire", bordure verte brillante) : "30 Go" | "Validité : 30 jours" | "2 500 FCFA"

  * Carte 3 (Badge "Premium") : "ILLIMITÉ" | "Validité : 30 jours" | "5 000 FCFA"

- BOUTON "Sélectionner" sur chaque carte : Au clic, met à jour `selectedPlan` + scroll smooth vers Étape 3.



5️ ÉTAPE 3 — FORMULAIRE WHATSAPP & RÉSEAU PAIEMENT (CŒUR DU SYSTÈME)

- Indicateur : "Étape 3 sur 3".

- Titre : "Finalisez votre commande sur WhatsApp".

- Explication sous titre : "Entrez votre numéro et choisissez comment payer. Vous serez redirigé vers WhatsApp avec toutes les infos pré-remplies pour une activation immédiate."

- Champ Numéro : "+237" verrouillé, input 6XX XXX XXX. Détection auto opérateur (67/68→icône MTN, 65/69→icône Orange). Met à jour `userPhone`.

- Sélecteur Réseau Paiement : 2 boutons larges "MTN Mobile Money" / "Orange Money". Un seul choix possible. Met à jour `paymentNetwork`.

- RÉCAPITULATIF VISUEL DYNAMIQUE : Affiche en temps réel "Forfait [X] [Op] | Numéro : +237... | Paiement : [Réseau]" dans une carte glassmorphism.

- BOUTON FINAL "💬 Envoyer ma commande sur WhatsApp" :

  * Type : `<a>` tag, PAS button onClick.

  * Disabled si phone.length < 9 ou plan/operator/paymentNetwork === null. Tooltip : "Veuillez remplir tous les champs".

  * Effet Shimmer vert émeraude conservé, large, bien visible.

  * LIEN DYNAMIQUE GÉNÉRÉ VIA USEMEMO :

    const message = `Bonjour Camer Data ! 👋\nJe souhaite commander :\n📱 Forfait : ${selectedPlan} (${selectedOperator})\n Numéro à recharger : +237${userPhone}\n💳 Réseau de paiement : ${paymentNetwork}\n\nMerci de procéder à l'activation ! ✅`;

    href={`https://wa.me/237679349788?text=${encodeURIComponent(message)}`}



6️ SECTION "COMMENT ÇA MARCHE ?" (TEXTE MIS À JOUR)

- Titre : "Comment ça marche ?"

- Sous-titre : "Un processus simple en 3 étapes, pensé pour être rapide et sécurisé."

- 3 colonnes avec icônes Lucide dans cercles verts :

  * "Choisissez" → "Sélectionnez votre opérateur et forfait. Tous nos forfaits sont disponibles 24h/24."

  * "Commandez" → "Remplissez vos infos et cliquez sur WhatsApp. Un agent Camer Data prend en charge votre commande instantanément."

  * "Recevez" → "Payez via Mobile Money et recevez votre SMS d'activation en quelques secondes. Simple et fiable !"



7️⃣ BOUTON FLOTTANT WHATSAPP (FIXE BAS DROITE - AMORÇAGE CONVERSION)

- Position fixed bottom-6 right-6, z-index 50.

- Couleur : Vert WhatsApp officiel #25D366 (pour reconnaissance universelle).

- Icône WhatsApp Lucide 28px, ombre portée, effet pulsation CSS (scale 1→1.05→1 infinite 2s).

- Tooltip au survol : "Besoin d'aide ? Écrivez-nous !"

- Lien : https://wa.me/237679349788?text=Bonjour%20Camer%20Data%20%F0%9F%91%8B%2C%20j'ai%20une%20question%20sur%20mes%20forfaits%20internet.%20Pouvez-vous%20m'orienter%20%3F

- Ce message est conçu pour amorcer la conversion sans pression.



8️⃣ FOOTER MINIMALISTE

- "© 2026 Camer Data. Tous droits réservés."

- Email : contact@camerdata.cm

- Aucun lien social, aucun autre bouton.



═══════════════════════════════════════════════════════════

️ SPÉCIFICATIONS TECHNIQUES DE GÉNÉRATION

═══════════════════════════════════════════════════════════

- Framework : React + Tailwind CSS + Framer Motion (transitions étapes, shimmer, pulsation bouton flottant).

- États React : selectedOperator, selectedPlan, userPhone, paymentNetwork.

- Génération dynamique URL WhatsApp : useMemo recalculé à chaque changement d'état.

- Validation : Bouton désactivé tant que conditions non remplies.

- Scroll smooth natif + scrollIntoView({behavior:'smooth'}) pour navigation entre étapes.

- Accessibilité : aria-labels, contrastes WCAG AA, navigation clavier.

- Placeholders faciles à remplacer : image1.jpg, image2.jpg, image3.jpg.

- Code propre, bien commenté, composants réutilisables.



═══════════════════════════════════════════════════════════

🎯 OBJECTIF FINAL

═══════════════════════════════════════════════════════════

Chaque visiteur doit quitter le site avec un message WhatsApp prêt à envoyer, contenant TOUTES les infos nécessaires (Opérateur + Forfait + Numéro + Réseau Paiement) pour que l'agent n'ait qu'à dire "OK, voici le lien de paiement" et activer. Zéro friction, zéro page de succès, 100% conversationnel, design premium conservé.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://camer-data.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9447a9cd-9bf6-426c-ba3e-a21a6fbfc295).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
