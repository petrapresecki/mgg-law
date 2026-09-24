// Zajedničke (group) photos from the September 2026 shoot.
// Fixed placements: Web-39 is the home-page hero, Web-42 sits in the
// "Boutique ured" section, Web-56 heads the team page and Web-49 fills the
// services hero. The gallery selection below was chosen by the office.
export const heroPhoto = '/assets/group/hero-39.jpg';

export const aboutPhoto = '/assets/group/about-42.jpg';

export const timPhoto = '/assets/group/tim-56.jpg';

export const uslugeHeroPhoto = '/assets/group/usluge-49.jpg';

// `thumb` (900px) renders in the strip, `full` (1800px) is fetched only when a
// photo is opened in the lightbox. `w`/`h` are the thumb's intrinsic size, set
// on the <img> so the strip reserves the right width before the image loads —
// without it the marquee can't measure itself and the row jumps as it fills in.
export const galleryPhotos = [
  { thumb: '/assets/group/g-43.jpg', full: '/assets/group/full/g-43.jpg', w: 600, h: 900 },
  { thumb: '/assets/group/g-44.jpg', full: '/assets/group/full/g-44.jpg', w: 900, h: 600 },
  { thumb: '/assets/group/g-49.jpg', full: '/assets/group/full/g-49.jpg', w: 900, h: 600 },
  { thumb: '/assets/group/g-50.jpg', full: '/assets/group/full/g-50.jpg', w: 900, h: 600 },
  { thumb: '/assets/group/g-53.jpg', full: '/assets/group/full/g-53.jpg', w: 600, h: 900 },
  { thumb: '/assets/group/g-54.jpg', full: '/assets/group/full/g-54.jpg', w: 600, h: 900 },
  { thumb: '/assets/group/g-57.jpg', full: '/assets/group/full/g-57.jpg', w: 900, h: 600 },
  { thumb: '/assets/group/g-60.jpg', full: '/assets/group/full/g-60.jpg', w: 900, h: 600 },
];
