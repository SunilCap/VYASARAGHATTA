# Changelog

All notable changes to Vyasaraghatta will be documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
and this project follows [Semantic Versioning](https://semver.org/) once it reaches v1.0.0.

---

## [0.4.2] — 2026-04-18

### Fixed
- **CRITICAL: All new buttons (WhatsApp send, voice recording, shop editing)
  were completely non-functional.** A leftover top-level event listener
  from the removed "Add item" modal (`emojiPick`) was referencing a DOM
  element that no longer exists. When the script ran, `getElementById`
  returned `null`, `.addEventListener` threw a `TypeError`, and
  **all subsequent script execution halted** — meaning none of the new
  feature functions were ever defined on `window`.
- Removed the orphaned code. All buttons now work as designed.

### Note for users on older versions
- When you open the updated app, the "Update available" banner will appear.
  Tap **Update now** to refresh to 0.4.2.

---

## [0.4.1] — 2026-04-17

### Changed
- Replaced browser `prompt()` PIN entry with a proper in-app modal that
  works inside installed PWAs on iOS.
- Refined WhatsApp send flow with confirmation prompt.

---

## [0.4.0] — 2026-04-17

### Added
- **WhatsApp order flow.** Checkout no longer simulates a fake order —
  it composes a formatted message (items, totals, address, phone) and
  opens WhatsApp's contact picker so customers can send the order to
  any shopkeeper, operator, or friend.
- **Share sheet fallback.** "Share another way" button uses the native
  share sheet for SMS, Telegram, email, etc.
- **Voice notes.** Customers can record a voice note at checkout. Audio
  is captured via MediaRecorder, with live transcript using Web Speech
  API (Kannada first, English fallback). Transcript is included in the
  WhatsApp message; audio can be downloaded to forward separately.
- **Admin-only Shop mode.** Tapping the "Shop" role prompts for a PIN.
- **Editable shops.** Add, edit, and delete shops — name, emoji,
  category, distance/time/rating, tags, delivery fee.
- **Editable items per shop.** Add, edit, delete items with image URL
  (live preview) and in-stock toggle. Falls back to emoji if URL fails.
- **Persistent storage.** Shop/item edits save to localStorage and
  survive refresh. Reset option available in admin.

### Changed
- Removed the old simulated "Place order" flow.
- Shop Dashboard "Items" tab reworked into a per-shop admin panel.

### Security note
- PIN gate is a convenience lock, not real authentication. The PIN
  lives in client code. For production multi-shop deployment, replace
  with Firebase Auth or Supabase Auth + per-shop accounts.

---

## [0.3.2] — 2026-04-17

### Fixed
- Hardened viewport settings to prevent iPhone Safari from rendering
  the app at desktop zoom level.
- Forced cache version bump so installed users get the mobile fixes.

---

## [0.3.1] — 2026-04-17

### Fixed
- **Mobile layout polish.** Tightened typography, spacing, and tap targets
  for small phones (320px–380px wide).
- Inputs no longer trigger iOS zoom on focus (16px minimum font size).
- Respects iPhone notch and Android navigation-bar safe areas.
- Prevented horizontal scroll on narrow screens.
- Uses `100dvh` (dynamic viewport height) on modern browsers to avoid
  the mobile Safari address-bar jumping issue.

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
