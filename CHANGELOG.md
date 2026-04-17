# Changelog

All notable changes to Vyasaraghatta will be documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
and this project follows [Semantic Versioning](https://semver.org/) once it reaches v1.0.0.

---

## [0.3.0] — 2026-04-17

### Added
- **Versioning system.** App version is now shown in the footer.
- **Update banner.** When a new version is deployed, users see an in-app
  "Update available" banner with a single tap to refresh.
- **Changelog modal.** Tap the version number in the footer to view recent
  release notes without leaving the app.
- Corrected app name spelling to **Vyasaraghatta** throughout.

### Changed
- Service worker now uses a versioned cache name tied to `APP_VERSION`,
  so each release cleanly invalidates the old cache.
- Service worker registration now listens for the `updatefound` event and
  posts a message to the client when a new worker is installed and waiting.

---

## [0.2.0] — 2026-04-17

### Added
- **Rider role** (third toggle) with Online/Offline, 30-second accept
  countdown, and active delivery flow (Picked up → Delivered).
- **Nearest-first dispatch.** Orders are offered to the closest rider
  first; if declined or timed out, fall through to the next nearest.
- **Live order tracking** on the customer side, showing rider
  assignment and real-time pickup/delivery progress.
- Simulated network of 5 riders from nearby villages.

---

## [0.1.0] — 2026-04-17

### Added
- Initial prototype with **Customer** and **Shop** roles.
- Hyperlocal scope across 7 categories: Food, Grocery, Pharmacy,
  Bakery, Stationery, Dairy, Meat & Fish.
- **Multi-shop basket** — customers can add items from multiple
  shops into a single order, combined into one delivery.
- Shop dashboard with incoming orders, accept/ready/reject flow,
  item inventory with stock toggle, and add-item modal.
- Installable PWA with offline support (service worker) and
  standalone manifest.
- Proprietary license and confidentiality notice.
