# Fermi Archive Gateway

Gateway per accedere rapidamente a materiali didattici Moodle e progetti web pubblicati online.

## Descrizione

Include:
- **Materiali didattici**: PDF per anno/materia scaricabili come ZIP
- **Progetti web**: accesso diretto a sottodomini personali

## Tecnologia

- **Framework**: [Nuxt](https://nuxt.com) + [Nuxt Content](https://content.nuxt.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Theme**: Light/dark mode con [@nuxtjs/color-mode](https://color-mode.nuxtjs.org)
- **Database**: SQLite tramite better-sqlite3
- **Node**: ES modules, TypeScript

## Setup

### Prerequisiti
- Node.js 18+
- npm, pnpm, yarn o bun

### Installazione

```bash
npm install
```

## Sviluppo

Avvia il server di sviluppo su `http://localhost:3000`:

```bash
npm run dev
```

Il sito si aggiorna automaticamente in hot-reload durante le modifiche.

## Build

### Produzione

```bash
npm run build
npm run preview
```

### Generazione statica

```bash
npm run generate
```

## Struttura del progetto

```
app/
  components/       # Componenti Vue (FileTree, FileViewer, SearchPalette, etc.)
  composables/      # Logica riutilizzabile (useFileViewer, useMoodleTree, etc.)
  pages/            # Route: [slug] per navigazione dinamica
  layouts/          # Layout principale
  assets/           # CSS globale
  pages/
    appunti/        # Pagine organizzate per anno/materia
public/
  Moodle/           # Struttura esposta di cartelle Moodle
```

## Design System

Il design segue principi di minimalismo funzionale:
- **Colore**: Indigo (#4f46e5) per l'interazione, Amber per le cartelle, Grigi neutri per il testo
- **Tipografia**: Inter per il corpo, Fira Code per percorsi e metadati
- **Transizioni**: ≤150ms, veloci ma percettibili
- **Accessibilità**: WCAG AA, focus ring visibili, touch target ≥44px

## Licenza

MIT License