# Shop data — how to publish updates

This folder holds JSON files that **override or extend** the app's default shop catalog. When the app loads on a customer's phone, it fetches `index.json` here and pulls every shop file listed.

## Workflow

1. A **shop owner** opens the app in Shop admin mode (PIN: `9876`), adds/edits their items, then taps the **📤 Export** button next to their shop name. A file like `shop-gowda-kirana-store.json` downloads to their phone.
2. They **send this JSON file** to you (WhatsApp, email, etc.).
3. You **commit the file to this folder** on GitHub.
4. You **update `index.json`** to list the new filename in the `files` array.
5. Customers see the new data the next time their app loads (or when they pull-to-refresh).

## File format

**Single shop export** (what the Export button produces):
```json
{
  "type": "vyasaraghatta-shop-export",
  "version": 1,
  "exportedAt": "2026-04-18T10:30:00.000Z",
  "shop": {
    "id": "s3",
    "name": "Gowda Kirana Store",
    "emoji": "🛒",
    "category": "grocery",
    "meta": ["0.8 km", "20–30 min", "4.5 ★"],
    "tags": ["Daily needs", "Open till 10 PM"],
    "live": true,
    "fee": 15,
    "items": [ /* item objects */ ]
  }
}
```

**Multi-shop catalog export** (what the "Export all shops" button produces):
```json
{
  "type": "vyasaraghatta-catalog-export",
  "version": 1,
  "exportedAt": "2026-04-18T10:30:00.000Z",
  "shops": [ /* array of shop objects */ ]
}
```

Both formats are accepted.

## Conflict resolution

If a customer has **local edits** (used admin mode to add/change things on their device), the app will **not** auto-replace them with remote data. They'll see a "Pull latest" button in admin mode to manually apply remote updates (and discard their local edits).

Shops in `index.json` **override** the default shops by `id` — if you publish a shop with `id: "s3"` it replaces the built-in "Gowda Kirana Store". New IDs become new shops.

## Example `index.json`

```json
{
  "version": 1,
  "updatedAt": "2026-04-18",
  "files": [
    "shop-gowda-kirana-store.json",
    "shop-nisha-cakes.json",
    "shop-raghavendra-medicals.json"
  ]
}
```

## Caching note

The app fetches these files with `cache: 'no-cache'` to always get fresh data, but GitHub Pages' CDN may cache for a minute or two. If customers aren't seeing an update, wait ~2 minutes and have them pull-to-refresh.
