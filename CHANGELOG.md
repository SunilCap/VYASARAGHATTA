# Changelog

All notable changes to Vyasaraghatta will be documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
and this project follows [Semantic Versioning](https://semver.org/) once it reaches v1.0.0.

---

## [0.7.1] — 2026-04-18

### Added
- **OCR language picker.** Tap the 🌐 button next to the camera to
  choose which language the photo should be read in. Seven options
  available, each paired with English for mixed-script lists:
  English, Kannada, Hindi, Tamil, Telugu, Malayalam, Marathi.
- Language choice is remembered across sessions on the device.
- First-use download per language is only ~2–4 MB (plus 2 MB for
  Tesseract.js), instead of all ~17 MB upfront.

### Design note
- Loading all seven language models simultaneously was considered,
  but rejected because Tesseract accuracy **drops** when multiple
  similar scripts fight for the same characters, and first-use
  download would bloat to ~20 MB. The picker approach keeps each
  scan fast and accurate.

---

## [0.7.0] — 2026-04-18

### Added
- **Per-shop search bar.** Each shop's detail view now has its own
  search box that filters items within that shop, live as you type.
- **Shop export.** In Shop admin mode, every shop row has a 📤 button
  that downloads the shop as a JSON file. There's also an "Export all
  shops" button at the top to bulk-export the whole catalog.
- **Remote shop sync.** The app fetches `./shops/index.json` on startup
  and pulls every listed shop file, merging into the catalog. The
  `shops/` folder in the repo contains a README explaining the full
  publishing workflow (shop exports JSON → sends to admin on WhatsApp
  → admin commits to `/shops/` and updates `index.json` → customers
  see updates on next load).
- **Kannada OCR.** The image-to-text reader now recognises Kannada
  alongside English (`kan+eng`). First-use download includes the
  Kannada language pack.

### Fixed
- **Checkout button no longer cropped** behind the bottom nav + cart
  bar. Increased body bottom padding and added view-specific padding
  for long scroll views (checkout, history, rider, dashboard).

### Conflict resolution for remote sync
- If a user has local admin edits on their device, remote sync will
  **not** auto-overwrite them. They'll see a "Pull latest shops"
  button in admin mode to manually apply remote data (and lose their
  local edits). This keeps admins in control during the pilot.

---

## [0.6.0] — 2026-04-18

### Added
- **Customer order history.** Tap "📋 Orders" in the bottom nav to see
  every past order from this device. Each card expands to show the
  full itemised breakdown, address, GPS coordinates, and voice-note
  transcript. One-tap "Reorder" button adds all items back to cart
  (skipping any that are out of stock).
- **Global item search on Home.** Type in the search box to find items
  across every shop at once, live as you type. Multi-word AND matching
  — "red cake" finds items matching both words.
- **📷 Camera / image upload (OCR).** Next to the search bar, tap the
  camera button to upload a photo of a shopping list. The app uses
  Tesseract.js (lazy-loaded from CDN on first use) to read printed
  text in the image and match it against the catalogue, suggesting
  items to add. Works best for printed text, ~70% accuracy for
  handwritten.

### Fixed
- **Voice notes now work on WhatsApp.** Previously the browser
  recorded in WebM format, which WhatsApp rejects. Now prefers M4A
  (AAC-in-MP4) which is universally supported. File extensions are
  now correct (.m4a, .mp3, .ogg, or .webm only as last resort).
- When a phone can only record in WebM, the user now sees a clear
  message explaining they need to attach the saved audio to WhatsApp
  manually as a document.
- Fixed a potential script-crash bug from the previous `searchInput`
  element rename. All DOM references are now safely guarded.

### Notes
- OCR requires an internet connection on first use (~2MB download).
  After first load, it works offline.
- Order history is stored on the customer's device only (localStorage).
  Last 50 orders are kept; older ones are dropped automatically.

---

## [0.5.0] — 2026-04-18

### Added
- **GPS location on checkout.** Customers can tap "📍 GPS" to fill their
  delivery address automatically. Uses browser geolocation + reverse
  geocoding via OpenStreetMap Nominatim (free, no API key).
- **Google Maps link** in the outgoing WhatsApp order message when GPS
  was used — shopkeepers can tap it to see the exact drop location.
- **Rider Earnings dashboard** — Today / Week / Month totals, plus a
  7-day bar chart and pending payout summary.
- **Rider Order history** — last 12 deliveries with dates, shops,
  distance, ratings received (with star icons), and earnings.
- **Rider Payout history** — weekly settlement statements marked
  Paid (with date) or Pending, with lifetime paid total.
- **Rider Profile** — full editable profile with personal info, vehicle
  type/number, document fields (Aadhaar last 4, licence), and payout
  details (UPI, bank account, IFSC). Saved to localStorage.

### Changed
- Rider bottom navigation expanded from 3 tabs to 4: Orders, Earnings,
  History, Profile.

### Prototype notes
- All earnings, history, and payouts are locally simulated demo data on
  this device. Useful for showing the app to prospective rider partners
  and gathering feedback on what they want to see. Real figures require
  the backend (planned for v1.0).

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
