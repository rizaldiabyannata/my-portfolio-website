const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const NAV_LINKS = [
  { name: 'About', href: `${BASE_URL}#about` },
  { name: 'Skills', href: `${BASE_URL}#skills` },
  { name: 'Projects', href: `${BASE_URL}#projects` },
  { name: 'Gallery', href: `${BASE_URL}/gallery` },
  { name: 'Contact', href: `${BASE_URL}#contact` },
];