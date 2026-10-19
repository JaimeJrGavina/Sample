# Credits & licenses: Velvet & Blade Studio (demo site)

This is a **sample website for a fictional business**. The business name, prices, offer, reviews, stats, phone number
((555) 018-7734), address (456 Example Avenue, Anytown) and email (`book@example.com`) are all placeholders.

## Website template

| Item | Source | License |
|---|---|---|
| Start Bootstrap "Creative" v7.0.7 (one-page theme, compiled CSS in `assets/css/styles.css`, script adapted in `assets/js/scripts.js`) | https://github.com/StartBootstrap/startbootstrap-creative (commit `b1762d8`) | MIT License, Copyright 2013-2023 Start Bootstrap LLC. Full text in [`LICENSE`](LICENSE). |
| Bootstrap v5.2.3 (bundled inside the theme's compiled CSS) | https://github.com/twbs/bootstrap | MIT License, Copyright 2011-2022 The Bootstrap Authors / Twitter, Inc. Notice kept in the header of `assets/css/styles.css`. |

The MIT License allows commercial use, modification and client work, as long as the copyright notice and license
text stay with the code (kept in `LICENSE` and in the file headers).

What changed from the template: new salon content and sections (demo banner, hero with sample stats and a sample
first-visit offer, promise band, services & sample prices, studio story, lookbook built on the theme's portfolio
grid, sample reviews, hours/location with map placeholder, booking form with demo alert), new color palette and
typography in an override stylesheet (`assets/css/site.css`). In `styles.css` only the masthead background path was
changed (to `../images/hero.jpg`). The Bootstrap JS bundle, SimpleLightbox, SB Forms and all CDN links (Google
Fonts, Bootstrap Icons, jsDelivr, cdnjs) were removed; a small vanilla script replaces the collapse menu and
scrollspy. The template's sample images and favicon are **not** used.

Mobile call buttons: a round tap-to-call button sits in the header at all sizes below 992px (plus a "(555) 018-7734"
call pill in the desktop nav), and the floating "Call Now" button stays hidden until the visitor has scrolled past
the hero, so it never covers hero text. Scroll reveal is progressive (content is visible by default and only
animates after the visitor starts scrolling); all motion is disabled under `prefers-reduced-motion`.

## Icons & fonts (all vendored locally, no CDN)

| Item | Source | License |
|---|---|---|
| Ionicons 5.5.2 (inline SVG symbols: call, calendar, cut, color palette, sparkles, ribbon, shield, leaf, location, time, mail, menu, close, arrow, star) | https://github.com/ionic-team/ionicons | MIT, see [`licenses/MIT-Ionicons.txt`](licenses/MIT-Ionicons.txt) |
| Cormorant Garamond 500/600 + italics (latin), via the Fontsource npm package `@fontsource/cormorant-garamond` 5.3.0 | https://github.com/CatharsisFonts/Cormorant | SIL OFL 1.1, see [`licenses/OFL-Cormorant-Garamond.txt`](licenses/OFL-Cormorant-Garamond.txt) |
| Inter (variable, latin), via `@fontsource-variable/inter` 5.3.0 | https://github.com/rsms/inter | SIL OFL 1.1, see [`licenses/OFL-Inter.txt`](licenses/OFL-Inter.txt) |

## Photos (Wikimedia Commons, downloaded and self-hosted, no hotlinking)

All photos were resized, recompressed and cropped. "CC BY" / "CC BY-SA" licenses require attribution, which is
given here and in the footer ("Photo & design credits"). CC0 needs no attribution, but it is listed anyway.
The cropped `svc-hair.jpg` is shared under the same CC BY-SA 4.0 license as its original.

| File(s) | Used for | Original | Author | License |
|---|---|---|---|---|
| `assets/images/hero.jpg`, `assets/images/hero-m.jpg` | Hero background (desktop and mobile crops) | [Hair salon - Arlington, MA](https://commons.wikimedia.org/wiki/File:Hair_salon_-_Arlington,_MA.jpg) | Daderot | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/svc-hair.jpg` | Hair & Styling service card | [Hairstylist at Paris Fashion Week 2019](https://commons.wikimedia.org/wiki/File:Hairstylist_at_Paris_Fashion_Week_2019.jpg) | Rohit Verma | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `assets/images/svc-color.jpg` | Color service card | [90s Chic (Unsplash)](https://commons.wikimedia.org/wiki/File:90s_Chic_(Unsplash).jpg) | Les Anderson lesanderson | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/svc-barber.jpg` | Barbershop service card | [Haircut or hair Salon From Iran- Canon Photography- Mostafa Meraji- fashion Photo 06](https://commons.wikimedia.org/wiki/File:Haircut_or_hair_Salon_From_Iran-_Canon_Photography-_Mostafa_Meraji-_fashion_Photo_06.jpg) | Mostafameraji | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/studio.jpg` | Our Studio photo | [Salon de Coiffure Le Temps d’une Coupe Estrablin 06](https://commons.wikimedia.org/wiki/File:Salon_de_Coiffure_Le_Temps_d%E2%80%99une_Coupe_Estrablin_06.jpg) | Jlgay38 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| `assets/images/lb-bridal.jpg` | Lookbook: The Garden Braid | [French Braid (Unsplash)](https://commons.wikimedia.org/wiki/File:French_Braid_(Unsplash).jpg) | Pete Bellis petebellis | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/lb-updo.jpg` | Lookbook: Effortless Low Bun | [Woman red hair looking at sky (Unsplash)](https://commons.wikimedia.org/wiki/File:Woman_red_hair_looking_at_sky_(Unsplash).jpg) | Tyler McRobert tylermcrobert | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/lb-fade.jpg` | Lookbook: Skin Fade & Design | [Mid-fade 01](https://commons.wikimedia.org/wiki/File:Mid-fade_01.jpg) | Classic Barbers | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/lb-classic.jpg` | Lookbook: The Classic Cut | [Haircut or hair Salon From Iran- Canon Photography- Mostafa Meraji- fashion Photo 01](https://commons.wikimedia.org/wiki/File:Haircut_or_hair_Salon_From_Iran-_Canon_Photography-_Mostafa_Meraji-_fashion_Photo_01.jpg) | Mostafameraji | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/lb-clipper.jpg` | Lookbook: Clean Clipper Cut | [Head shaved by barber (Unsplash)](https://commons.wikimedia.org/wiki/File:Head_shaved_by_barber_(Unsplash).jpg) | Phùng Hải pminhai | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `assets/images/lb-shave.jpg` | Lookbook: Hot Towel Shave | [Christoffer Engström 2017-01-13 (Unsplash)](https://commons.wikimedia.org/wiki/File:Christoffer_Engstr%C3%B6m_2017-01-13_(Unsplash).jpg) | Christoffer Engström christoffere | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |

Notes:
- The people in these photos are real people photographed by the credited authors; they are not staff or clients
  of the fictional studio, and the lookbook captions are illustrative.
- The "(Unsplash)" photos were uploaded to Commons as CC0 from Unsplash's former CC0 era; the author shown is the
  one recorded on Commons. The "Mid-fade 01" author is recorded on Commons as "Classic Barbers".
- Two interior photos show real salons (Arlington, MA and Estrablin, France). Velvet & Blade Studio has no
  connection to them.
- The site's previous photos (`_old/salon/images/`) had no recorded source or license, so none were reused.
