# Credits & licenses: Summit Peak Plumbing & Roofing (demo site)

This is a **sample website for a fictional business**. The business name, prices, reviews, stats, license number
(#DEMO-0000), phone number ((555) 016-3380), address (789 Placeholder Road, Anytown) and email
(`service@example.com`) are all placeholders. The "Recent Work" projects are illustrative, not real jobs.

## Website template

| Item | Source | License |
|---|---|---|
| Start Bootstrap "Agency" v7.0.12 (one-page theme, compiled CSS in `assets/css/styles.css`, script adapted in `assets/js/scripts.js`) | https://github.com/StartBootstrap/startbootstrap-agency (commit `b2d5d5c`) | MIT License, Copyright 2013-2023 Start Bootstrap LLC. Full text in [`LICENSE`](LICENSE). |
| Bootstrap v5.2.3 (bundled inside the theme's compiled CSS) | https://github.com/twbs/bootstrap | MIT License, Copyright 2011-2022 The Bootstrap Authors / Twitter, Inc. Notice kept in the header of `assets/css/styles.css`. |

The MIT License allows commercial use, modification and client work, as long as the copyright notice and license
text stay with the code (kept in `LICENSE` and in the file headers).

What changed from the template: new contractor content (demo banner, 24/7 emergency bar, split hero with a free
quote form, sample stats bar, six services with sample starting prices, about section, "Recent Work" built on the
theme's portfolio grid, "How It Works" built on the theme's timeline, sample reviews, hours/service area with map
placeholder, emergency call band, estimate form with demo alert), new navy/orange palette and typography in an
override stylesheet (`assets/css/site.css`). In `styles.css` only two image paths were changed: the masthead
background now points to `../images/hero.jpg`, and the contact section's `map-image.png` background was set to
`none`. The Bootstrap JS bundle, Font Awesome kit, SB Forms and all CDN links (Google Fonts, jsDelivr,
use.fontawesome.com) were removed; a small vanilla script replaces the collapse menu and scrollspy. The template's
sample images, logos and favicon are **not** used; the logo mark is a simple SVG drawn for this demo.

Call buttons: a tap-to-call button is in the header at every size (orange pill in the desktop nav, round icon on
phones and tablets), the hero has a "Call (555) 016-3380" button, and the floating "Call Now" button (below
992px) stays hidden until the visitor has scrolled past the hero, so it never covers hero text. Scroll reveal is
progressive (content is visible by default and only animates after the visitor starts scrolling); all motion is
disabled under `prefers-reduced-motion`.

## Icons & fonts (all vendored locally, no CDN)

| Item | Source | License |
|---|---|---|
| Ionicons 5.5.2 (inline SVG symbols: call, water, funnel, flame, home, construct, flash, shield, price tag, sparkles, time, location, mail, menu, close, checkmark, arrow, star, hammer) | https://github.com/ionic-team/ionicons | MIT, see [`licenses/MIT-Ionicons.txt`](licenses/MIT-Ionicons.txt) |
| Montserrat (variable, latin), via the Fontsource npm package `@fontsource-variable/montserrat` 5.3.0 | https://github.com/JulietaUla/Montserrat | SIL OFL 1.1, see [`licenses/OFL-Montserrat.txt`](licenses/OFL-Montserrat.txt) |
| Inter (variable, latin), via `@fontsource-variable/inter` 5.3.0 | https://github.com/rsms/inter | SIL OFL 1.1, see [`licenses/OFL-Inter.txt`](licenses/OFL-Inter.txt) |

## Photos (Wikimedia Commons, downloaded and self-hosted, no hotlinking)

All photos were resized, recompressed and cropped. "CC BY" licenses require attribution, which is given here and in
the footer ("Photo & design credits"). Public-domain (U.S. federal government works and author-released) and CC0
photos need no attribution, but they are listed anyway.

| File(s) | Used for | Original | Author | License |
|---|---|---|---|---|
| `assets/images/hero.jpg`, `assets/images/hero-m.jpg` | Hero background (desktop and mobile crops) | [Up on the roof (9543313206)](https://commons.wikimedia.org/wiki/File:Up_on_the_roof_(9543313206).jpg) | NAVFAC | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `assets/images/p-reroof.jpg`, `assets/images/cta.jpg` | Project: Full Roof Replacement, emergency CTA band background | [On base housing gets new shingles for roofs (5566725)](https://commons.wikimedia.org/wiki/File:On_base_housing_gets_new_shingles_for_roofs_(5566725).jpg) | U.S. Air Force photo by Airman 1st Class Jonathan Whitely | Public domain |
| `assets/images/p-sink.jpg`, `assets/images/about.jpg` | Project: Kitchen Sink & Valve Repair, About photo | [Plumber at work (retouched)](https://commons.wikimedia.org/wiki/File:Plumber_at_work_(retouched).jpg) | photo taken by flickr user rick | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `assets/images/p-tarp.jpg` | Project: Storm Damage Tarping | [FEMA - 38954 - A worker installs a blue tarp on a roof in Texas](https://commons.wikimedia.org/wiki/File:FEMA_-_38954_-_A_worker_installs_a_blue_tarp_on_a_roof_in_Texas.jpg) | Leif Skoogfors | Public domain |
| `assets/images/p-drain.jpg` | Project: Main Line Drain Cleaning | [Handyman heavy duty drain cleaning machine](https://commons.wikimedia.org/wiki/File:Handyman_heavy_duty_drain_cleaning_machine.jpg) | Tomwsulcer | Public domain |
| `assets/images/p-shingles.jpg`, `assets/images/s-inspect.jpg` | Project: Shingle & Flashing Repair, How It Works step 2 | [US Navy 090611-N-9712C-001 Aviation Electronics Technician 2nd Class Sonny Abernathy nails shingles to the roof of a Habitat for Humanity house](https://commons.wikimedia.org/wiki/File:US_Navy_090611-N-9712C-001_Aviation_Electronics_Technician_2nd_Class_Sonny_Abernathy_nails_shingles_to_the_roof_of_a_Habitat_for_Humanity_house.jpg) | U.S. Navy photo by Mass Communications Specialist 2nd Class John P. Curtis | Public domain |
| `assets/images/p-house.jpg`, `assets/images/s-done.jpg` | Project: New Roof, Finished; How It Works step 4 | [Beach House in New Jersey with asphalt shingles](https://commons.wikimedia.org/wiki/File:Beach_House_in_New_Jersey_with_asphalt_shingles.jpg) | User:Tallguy0187 | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| `assets/images/s-call.jpg` | How It Works step 1 | [Plumbing toolkit items (Unsplash)](https://commons.wikimedia.org/wiki/File:Plumbing_toolkit_items_(Unsplash).jpg) | Wesley Caribe wesleycaribe | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/s-quote.jpg` | How It Works step 3 | [New Home (Unsplash)](https://commons.wikimedia.org/wiki/File:New_Home_(Unsplash).jpg) | Erick Lee Hodge holasirhodge | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |

Notes:
- Several photos are U.S. government works (U.S. Navy, U.S. Air Force, FEMA, NAVFAC). Using them does not imply any
  endorsement by those agencies, and the fictional company has no connection to them. "Up on the roof" (NAVFAC) is
  published on Commons under CC BY 2.0 from NAVFAC's Flickr account, so it is credited as such.
- "Plumber at work (retouched)" lists its author only as "flickr user rick" on Commons; that is the attribution
  available. "Beach House in New Jersey with asphalt shingles" shows a real private home; it is used only as an
  example of a finished roof.
- The people in these photos are not employees of the fictional company.
- The site's previous photos (`_old/contractor/images/`) had no recorded source or license, so none were reused.
