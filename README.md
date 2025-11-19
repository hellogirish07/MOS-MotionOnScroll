# MotionOnScroll (MOS)

> Smooth, lightweight scroll animations using simple data attributes.

MotionOnScroll (MOS) is a tiny, dependency-free library that makes it easy to add polished scroll-triggered animations to your website. Add an animation to any element using a `data-mos` attribute and optionally control timing with `data-mos-delay` and `data-mos-duration`.

---

## Features

- 12+ built-in animation types (fade, slide, zoom, flip, rotate, bounce, skew, pop, blur, shake, etc.)
- Very small — only CSS + a small JS observer
- No external dependencies
- Easy to customize with CSS variables and data attributes
- Works with IntersectionObserver and includes sensible fallbacks

---

## Files

- `mos.css` — animation CSS (all data-mos rules)
- `mos.js` — intersection observer + activation script
- `css/style.css` — demo / theme styles
- `index.html`, `demo.html` — example pages
- `js/script.js` — site utilities (mobile menu, back-to-top, contact form handler)

---

## Quick Install

Include the CSS and JS files in your HTML head / before `</body>`:

```html
<link rel="stylesheet" href="mos.css">
<script src="mos.js"></script>
```

If you use the demo theme, also include `css/style.css`.

---

## Usage

Add a `data-mos` attribute to any element to enable an animation. Example:

```html
<div data-mos="fade-up" data-mos-delay="200" data-mos-duration="800">
  Hello — I fade up when visible
</div>
```

- `data-mos-delay` accepts a number in milliseconds (e.g. `300`).
- `data-mos-duration` accepts a number in milliseconds (e.g. `1200`).

The demo pages (`index.html` and `demo.html`) contain many examples of supported `data-mos` values.

---

## Customization

You can tweak default timing using CSS variables in your stylesheet:

```css
:root {
  --mos-duration: 0.8s; /* default duration */
  --mos-delay: 0s;      /* default delay */
}
```

To override an individual element use `data-mos-delay` and `data-mos-duration` as shown above.

---

## Demo / Site Helpers

This repository includes a small demo site with utilities in `js/script.js`:
- Mobile navigation toggle
- Back-to-top button (hidden while hero is visible via IntersectionObserver)
- Simple contact form handler (client-side validation; ready for server integration)

---

## Contributing

Feel free to open issues or PRs with improvements, new animations, or bug fixes.

---

## License

MIT — see LICENSE or add one if you want to publish this project.

---

If you'd like, I can also:
- Add a small build step / NPM package scaffold
- Generate screenshots for the demo pages
- Add a live demo README badge and quick-host instructions

Enjoy — let me know if you want a shorter README or additional sections (API, changelog, examples).