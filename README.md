# Vyasaraghatta

> **Hyperlocal commerce for villages.** Order from nearby shops — food, grocery, pharmacy, bakery, stationery, dairy, meat & fish — delivered by folks from your own village.

**Version:** `v0.3.0` — see [CHANGELOG.md](./CHANGELOG.md) for release notes.

**Confidential prototype. © 2026 Sunil Malleshaiah. All rights reserved.**

---

## What this is

A three-role Progressive Web App (PWA) prototype:

- **Customer** — browse shops by category, add items from *multiple shops* to a single basket, checkout, and track the order live.
- **Shop** — see incoming orders, accept / mark ready, manage items and stock.
- **Rider** — receive orders routed nearest-first, accept within 30 seconds, and complete pickup → delivery steps.

When a customer places an order, the app simulates dispatch to the nearest rider first. If that rider declines or times out, the order falls through to the next nearest rider automatically. Customers see live status updates as the rider progresses through pickup and delivery.

This is a **frontend-only prototype** — all three roles run in a single browser and share simulated state. There is no backend yet. See *Roadmap* below for what the real build needs.

---

## File structure

```
vyasaraghatta/
├── index.html              # Entry point
├── styles.css              # All styles
├── app.js                  # All logic (customer, shop, rider, dispatch, tracking)
├── sw.js                   # Service worker (offline caching)
├── manifest.webmanifest    # PWA manifest
├── 404.html                # GitHub Pages SPA fallback
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   ├── icon-maskable-512.png
│   └── favicon-64.png
├── LICENSE                 # Proprietary license
├── .gitignore
└── README.md
```

---

## Run locally

You **cannot** just double-click `index.html` — service workers require HTTP(S). Use any simple local server:

### Option A — Python (no install needed on most systems)

```bash
cd vyasaraghatta
python3 -m http.server 8080
```

Then open <http://localhost:8080>

### Option B — Node (if you have it)

```bash
cd vyasaraghatta
npx serve .
```

### Option C — VS Code

Install the **Live Server** extension, right-click `index.html`, "Open with Live Server".

---

## Deploy to GitHub Pages

This is the fastest way to get a real HTTPS URL that works on any phone.

### 1. Create the repo

```bash
cd vyasaraghatta
git init
git add .
git commit -m "Initial commit: Vyasaraghatta prototype"
git branch -M main
```

Create a **private** repository on GitHub called `vyasaraghatta` (keep it private to preserve confidentiality). Then:

```bash
git remote add origin https://github.com/<your-username>/vyasaraghatta.git
git push -u origin main
```

### 2. Enable GitHub Pages

> ⚠️ **Private repos need GitHub Pro or higher for private Pages.** On the free plan, publishing Pages will make the site publicly accessible even from a private repo. If that is a problem, use **Netlify** or **Vercel** instead — both allow private deployments on their free tiers.

On GitHub, go to your repo → **Settings** → **Pages**:

- **Source:** Deploy from a branch
- **Branch:** `main` / `(root)`
- Click **Save**

Wait 30–60 seconds. Your site will be live at:

```
https://<your-username>.github.io/vyasaraghatta/
```

### 3. Install on phone

Open that URL on your phone:

- **Android (Chrome):** You'll see an "Install" prompt at the bottom, or tap the menu → "Install app".
- **iOS (Safari):** Tap the Share button → "Add to Home Screen".

The app will now open fullscreen like a native app, and work offline after the first load.

---

## Deploy to Netlify (recommended if you want it private)

1. Sign up at [netlify.com](https://netlify.com) (free)
2. **Add new site → Import from Git → GitHub** → pick your `vyasaraghatta` repo
3. Build command: *(leave empty)*
4. Publish directory: `.`
5. Deploy

Netlify gives you a URL like `https://vyasaraghatta-abc123.netlify.app`. You can set the site to **Password protect** under Site settings → Access control (paid tier) or keep the URL unlisted.

---

## Mobile testing checklist

- [ ] Open the GitHub Pages URL on your phone's browser
- [ ] Confirm "Install" prompt appears (Android) or use Share → Add to Home Screen (iOS)
- [ ] Open the installed app — it should launch fullscreen with no browser chrome
- [ ] Toggle between **Customer / Shop / Rider** at the top
- [ ] As Customer, add items from 2 different shops, checkout
- [ ] Switch to Rider, accept the incoming order, step through pickup → delivery
- [ ] Switch back to Customer — tracker should show progress
- [ ] Turn off Wi-Fi and data. Re-open the app. It should still load (offline shell).

---

## Roadmap — to go from prototype to real app

The current app is a demo. For a working production app you need:

1. **Backend**
   - Auth: phone OTP (Firebase Auth or Twilio)
   - Database: Firestore / Supabase / Postgres for users, shops, items, orders
   - Real-time: WebSockets or Firestore listeners for order status updates
2. **Three real clients** (could still be one PWA with role-based routing, or three separate apps)
3. **Location & maps**
   - GPS for riders
   - Google Maps / Mapbox for route display
   - Geofencing to find "nearest rider"
4. **Notifications**
   - Web Push for shops and riders when new orders come in
   - SMS fallback for customers
5. **Payments**
   - UPI integration (Razorpay / Cashfree)
   - Cash-on-delivery reconciliation
6. **Rider onboarding**
   - KYC, bank details, agreement
   - Earnings dashboard and weekly payouts
7. **Shop onboarding**
   - Shop verification
   - Commission & payout logic

Rough cost estimate for a small-scale MVP (1 village, 10 shops, 5 riders, 100 customers): Firebase free tier + a ₹500–1000/month Twilio budget for SMS = practically free to launch. Scales up as usage grows.

---

## Releasing a new version

The app uses a service-worker cache keyed by `APP_VERSION`. When a user
visits with a new version deployed, they'll see an "Update available"
banner with a one-tap refresh.

To cut a release:

1. **Bump the version in three places** (they must match):
   - `app.js` — `const APP_VERSION = '0.x.y';`
   - `sw.js` — `const APP_VERSION = '0.x.y';`
   - `CHANGELOG.md` — add a new entry at the top
2. Also add an entry to the `RELEASE_NOTES` array in `app.js` so the
   in-app "What's new" modal stays current.
3. Commit and push. GitHub Pages / Netlify auto-deploy.
4. Users open the app → service worker detects the new bundle → banner
   appears → tap "Update now" → app reloads on the fresh version.

Follow [SemVer](https://semver.org):
- **Patch** (0.3.**1**): bug fixes only
- **Minor** (0.**4**.0): new features, backward-compatible
- **Major** (**1**.0.0): breaking changes or first production release

---

## Confidentiality & IP

This concept, its name ("Vyasaraghatta"), UI, design, code, and all derivative materials are the confidential and proprietary property of **Sunil Malleshaiah**. See [LICENSE](./LICENSE).

Do not share this repository or its contents with third parties without written permission. Anyone you show it to should ideally sign an NDA first.

---

## Contact

Sunil Malleshaiah
