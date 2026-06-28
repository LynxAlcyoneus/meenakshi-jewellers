# Meenakshi Fine Jewellers — Phishing Awareness Demo

A luxury jewellery storefront (gold & black theme) built as a **safe, self-contained
cybersecurity phishing-awareness demonstration**. It looks like a real e-commerce site,
and its "Collaborate With Us" login teaches visitors how to spot phishing — without ever
collecting, transmitting, or storing anything they type.

> **Meenakshi Jewellers is a fictional brand.** Everything here is for classroom training.

## Run it

You need [Node.js](https://nodejs.org) (v18+).

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

> No build step, no database. You can even open the files in `public/` directly in a
> browser without Node — only the contact form needs the server (and it degrades gracefully).

## What's inside

```
meenakshi/
├── public/
│   ├── css/style.css        ← the luxury theme (gold gradients, glassmorphism, animations)
│   ├── js/components.js      ← shared navbar/footer, toasts, the awareness popup
│   ├── js/main.js            ← product catalogue, cards, search, filters, carousel
│   ├── index.html            ← Home (hero, offers, collections, carousel, reviews, FAQ)
│   ├── gold.html             ← Gold collection (search + filters)
│   ├── silver.html           ← Silver collection
│   ├── new-arrivals.html     ← New arrivals
│   ├── about.html            ← Brand story + demo disclosure
│   ├── contact.html          ← Contact form (harmless)
│   └── dashboard.html        ← Mock "logged-in" dashboard (all fictional)
├── server.js                 ← Express: serves the site + a benign contact endpoint
├── package.json
└── README.md
```

## How the awareness demo works (and why it's safe)

A genuine phishing kit works by **capturing whatever a victim types and storing it**.
This project deliberately does **not** do that. Instead:

1. "Collaborate With Us" opens a realistic, glassmorphism login popup.
2. When you press **Continue**, the page shows a brief loading spinner (mirroring a real
   fake login) but **never reads, sends, or saves the input** — verify it yourself in
   `public/js/components.js`, function `buildPopup()`.
3. The card then flips to a **teaching panel** explaining how you could have spotted the
   trap: check the domain, don't trust the padlock alone, beware urgency, start logins
   yourself, use a password manager.
4. A mock dashboard reinforces the lesson — showing how a fake "logged-in" screen can make
   a scam feel legitimate. Every figure on it is clearly labelled fictional.

This makes the project **better** for awareness training: the lesson lands the instant the
"victim" acts, and there's no harvested-credentials file that could be misused or leaked.

## Talking points for the classroom

- Real login forms should be reached by typing the address or using a bookmark.
- HTTPS / a padlock proves encryption, not honesty.
- Look-alike domains (`meenakshi-login.co`) are the classic giveaway.
- Password managers won't autofill on the wrong domain — a free, reliable warning.
- Urgency and flattery ("collaborate now!") are pressure tactics.

## Tech

HTML5 · CSS3 · vanilla JavaScript · Bootstrap 5 (CDN) · Node.js · Express. Responsive,
keyboard-accessible, and respects `prefers-reduced-motion`.
