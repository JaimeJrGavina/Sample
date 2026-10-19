# The Good Luck Wall (`/Sample/wall/`)

Jaime Gavina's own supporters page. It's public and indexable, and it's static (GitHub Pages). Nothing here is a client demo.

Live URL (after it's pushed): https://jaimejrgavina.github.io/Sample/wall/

## How a supporter gets on the wall

1. The visitor pays with PayPal (to `gavinajaimejr@gmail.com`, or the PayPal.Me link if one is set in `CONFIG.PAYPAL_ME_URL`).
2. They click **I've paid**, which shows a confetti celebration and then the form.
3. The form goes through FormSubmit.co to `gavinajaimejr@gmail.com` with: name, website, amount_usd, paypal_email.
4. **Jaime checks PayPal.** Only after he confirms that the money arrived does a name get added to `supporters.json`, and that gets committed and pushed.

> Never add a name that has not been confirmed in PayPal. Never publish the supporter's PayPal email. It goes in the email to Jaime only.

## Adding a confirmed supporter

Edit `supporters.json` and add an object to the `supporters` array (order in the file does not matter):

```json
{ "name": "Maria Santos", "url": "https://mariasantos.com", "amount": 25, "date": "2026-10-21", "placeholder": false }
```

| Field | Meaning |
|---|---|
| `name` | Shown exactly as text (HTML is never interpreted). Keep it short (max 60 chars on the form). |
| `url` | Must be `http://` or `https://`. Anything else (e.g. `javascript:`) is shown as plain text with no link. Use `null` for no link. |
| `amount` | USD amount Jaime **received** (a number, no `$`). |
| `date` | ISO date `YYYY-MM-DD` of the contribution. Used to break ties. |
| `placeholder` | `false` for real supporters. `true` = muted "Your name here (example)" line, never ranked or linked. |

### Repeat contributions (choose either style; both are summed)

- **Option A: add another entry** with the same URL. The page merges entries whose URL matches after normalizing (host lowercased, trailing slash, `#hash` and `http`/`https` ignored, e.g. `https://Maria.com/` = `http://maria.com`). Entries without a URL merge by name (case-insensitive). The name shown is the one from the **first entry in the file** for that person.
- **Option B: one entry with a `contributions` array** (cleaner for regulars):

```json
{ "name": "Maria Santos", "url": "https://mariasantos.com", "placeholder": false,
  "contributions": [ { "amount": 25, "date": "2026-10-21" }, { "amount": 10, "date": "2026-11-02" } ] }
```

If `contributions` is present, it is used instead of `amount`/`date`.

## Ranking rules (done in `assets/js/wall.js`, `compute()`)

- Rank by **total** amount (all contributions summed), highest first.
- **Tie:** the supporter whose **first** contribution is earliest ranks higher (then file order).
- The wall is a plain text list: `1. Name ········ $50`. It's a row-major grid with 4 columns (2 on mobile) that fills **across the top row first**: #1 = A1, #2 = B1, #3 = C1, #4 = D1, then #5 starts row 2. #1 gets a small gold ★ and bold text. There are no cards or tiers.
- The "Give more than $X to take the #1 spot" line uses the current #1 real total. With no real supporters, it says "Be the first. Claim the #1 spot." Placeholders never count.
- Up to 4 `placeholder: true` entries are shown at the end as "Your name here ···· example" lines, while there are fewer than `CONFIG.HIDE_EXAMPLES_AT` (12) real supporters. Delete them from the JSON any time.

All supporter links are rendered with `rel="sponsored noopener" target="_blank"` (paid links must be marked `sponsored`).

## Removing or editing someone

Delete or edit their entry in `supporters.json`, then commit and push. GitHub Pages updates in about a minute (the page fetches the JSON with `cache: no-cache`).

## Settings (`assets/js/wall.js`, `CONFIG` at the top)

- `PAYPAL_ME_URL`: empty for now (no PayPal.Me handle was found for Jaime). Set it to e.g. `https://www.paypal.com/paypalme/<handle>` and the main button will open it.
- `FORM_ENDPOINT`: FormSubmit AJAX endpoint. After the first submission is activated, you can replace the email in this URL (and in the form `action` in `index.html`) with the random alias FormSubmit gives you, so the inbox address is less exposed to scrapers.
- `HIDE_EXAMPLES_AT`: once this many real supporters exist, the example lines are hidden.

## One-time setup

- **FormSubmit activation:** the first real submission makes FormSubmit email `gavinajaimejr@gmail.com` an activation link. Jaime must click it once. Until then, submissions are not delivered. (Check spam.)

## Testing locally

`fetch()` of the JSON does not work from `file://`. Serve the repo instead: `python3 -m http.server` in the repo root, then open `http://localhost:8000/wall/`.
Tests for the ranking/URL logic: `node /workspace/clients/_own/wall/tests/test_core.js`.
