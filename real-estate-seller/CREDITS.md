# Credits & licenses: Quillmere Realty seller-lead landing page (demo)

**Sample landing page (demo).** Quillmere Realty and the city of Fernwick Bay are a **fictional brand and city**
created for a portfolio / job-application sample. This is not a real agent, brokerage or listing service. The phone
number ((555) 555-0142) and email (`hello@example.com`) are placeholders. There are **no reviews, ratings, sales
figures, license numbers or other stats** on the page; the dashed yellow boxes mark where an agent's verified
details would go. The form does not submit anywhere: on submit, JavaScript validates the fields and shows a
thank-you message in place of the form. Nothing is sent or stored. The page carries `noindex, nofollow`.

## Website template

| Item | Source | License |
|---|---|---|
| Start Bootstrap "Landing Page" v6.0.6 (compiled CSS in `assets/css/styles.css`, page structure: masthead with sign-up form, icon grid, image showcase rows, testimonials, call-to-action) | https://github.com/StartBootstrap/startbootstrap-landing-page (commit `247a46a`, ~1.7k GitHub stars) | MIT License, Copyright 2013-2023 Start Bootstrap LLC. Full text in [`LICENSE`](LICENSE). |
| Bootstrap v5.2.3 (bundled inside the template's compiled CSS) | https://github.com/twbs/bootstrap | MIT License, Copyright 2011-2022 The Bootstrap Authors. Notice kept in the header of `assets/css/styles.css`. |

The MIT License allows commercial use, modification and client work, as long as the copyright notice and license
text stay with the code (kept in `LICENSE` and in the CSS file header).

What changed from the template: all new content and a new design layer in `assets/css/site.css` (forest green,
cream and brass palette, Fraunces + Inter typography, address-first 3-step form card in the masthead, trust
cards, how-it-works, "why get a valuation" showcase rows, clearly marked proof placeholders, FAQ accordion,
photo call-to-action, footer with privacy note, sticky mobile CTA). In `styles.css` only the two masthead /
call-to-action background image URLs (`bg-masthead.jpg`) were set to `none`. Removed: the Bootstrap JS bundle,
SB Forms (`cdn.startbootstrap.com`), Bootstrap Icons CDN and Google Fonts. The template's sample photos are not
used. A small vanilla script (`assets/js/site.js`, written for this demo) handles the steps, validation,
thank-you state, sticky CTA and scroll reveal. Scroll reveal is progressive (content is visible by default and
only animates after the visitor starts scrolling), and all motion is off under `prefers-reduced-motion`.

No CDNs: every font, icon, image, stylesheet and script is stored in this folder.

## Icons & fonts (vendored locally)

| Item | Source | License |
|---|---|---|
| Bootstrap Icons 1.11.3 (inline SVG symbols: geo-alt, check-lg, check-circle-fill, lock, person-check, house-door, house-heart, envelope, telephone, arrows, search, pencil-square, calendar-check, signpost-split, cash-coin, tools, info-circle, plus-lg, chat-quote) | https://github.com/twbs/icons | MIT, see [`licenses/MIT-Bootstrap-Icons.txt`](licenses/MIT-Bootstrap-Icons.txt) |
| Fraunces (variable, latin, roman + italic), via Fontsource `@fontsource-variable/fraunces` 5.3.0 | https://github.com/undercasetype/Fraunces | SIL OFL 1.1, see [`licenses/OFL-Fraunces.txt`](licenses/OFL-Fraunces.txt) |
| Inter (variable, latin), via `@fontsource-variable/inter` 5.3.0 | https://github.com/rsms/inter | SIL OFL 1.1, see [`licenses/OFL-Inter.txt`](licenses/OFL-Inter.txt) |

The logo mark, favicon and "Equal Housing Opportunity" house icon are simple SVGs drawn for this demo (the
official HUD logo is not used).

## Photos (Wikimedia Commons, CC0, downloaded and self-hosted)

All four photos are CC0 (public domain dedication), so no attribution is required; they are credited anyway.
All were resized and recompressed. None shows a recognizable person.

| File(s) | Used for | Original | Author | License |
|---|---|---|---|---|
| `assets/images/hero.jpg`, `assets/images/hero-m.jpg` | Hero background (desktop and mobile crops) | [Cozy white house (Unsplash)](https://commons.wikimedia.org/wiki/File:Cozy_white_house_(Unsplash).jpg) | Gus Ruballo | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `assets/images/dining.jpg` | "Why get a home valuation?" | [New Home (Unsplash)](https://commons.wikimedia.org/wiki/File:New_Home_(Unsplash).jpg) | Erick Lee Hodge | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `assets/images/living.jpg` | "Not just an algorithm" | [Living room (Unsplash)](https://commons.wikimedia.org/wiki/File:Living_room_(Unsplash).jpg) | Jarosław Ceborski | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `assets/images/autumn.jpg` | Final call-to-action background | [Small house on an autumn's day (Unsplash)](https://commons.wikimedia.org/wiki/File:Small_house_on_an_autumn%27s_day_(Unsplash).jpg) | Scott Webb | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |

Notes:
- The hero photo showed a house number on the fascia; it was retouched out so no real address is shown.
- The houses pictured are real buildings used only as illustrative scenery. They are not listings and have no
  connection to the fictional brand.
- A kitchen photo considered earlier was dropped because it showed branded cereal boxes.
