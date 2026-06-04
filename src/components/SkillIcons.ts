// Inline SVG data URLs for skill icons — no external assets needed

const svg = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${content}</svg>`)}`;

export const htmlIcon = svg(`
  <path d="M5 3l2.2 24.6L16 30l8.8-2.4L27 3H5z" fill="#E44D26"/>
  <path d="M16 27.6V5H5L7 27.6 16 30z" fill="#F16529"/>
  <path d="M16 13.2H11.2l-.3-3.7H16V6H7.6l.8 9.2H16v-2zM16 20.7l-.1.1-3.6-1-.2-2.5H9l.4 4.4 6.6 1.8v-3.8z" fill="#fff"/>
  <path d="M16 13.2v2H20.4l-.5 5.5-3.9 1.1v3.8l6.6-1.8 1-11.6H16zM16 9.5v3.7h7.8l.3-3.7H16z" fill="#EBEBEB"/>
`);

export const cssIcon = svg(`
  <path d="M5 3l2.2 24.6L16 30l8.8-2.4L27 3H5z" fill="#1572B6"/>
  <path d="M16 27.6V5H5L7 27.6 16 30z" fill="#33A9DC"/>
  <path d="M16 13.2H9.8l.3 3.5H16v-3.5zM16 6H7.4l.3 3.5H16V6zM16 22.1l-3.6-1-.2-2.5H9l.4 4.3 6.6 1.8v-3.6z" fill="#fff"/>
  <path d="M16 13.2v3.5h3.9l-.4 4.4L16 22.1v3.6l6.6-1.8.9-10.7H16zM16 6v3.5h8.1l.3-3.5H16z" fill="#EBEBEB"/>
`);

export const jsIcon = svg(`
  <rect width="32" height="32" fill="#F7DF1E"/>
  <path d="M19.3 25.6c.5.9 1.2 1.5 2.4 1.5 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.5 0-1.8 1.3-3.1 3.4-3.1 1.5 0 2.5.5 3.3 1.8l-1.8 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.6.2c2 .9 3.1 1.7 3.1 3.6 0 2.1-1.6 3.3-3.8 3.3-2.1 0-3.5-1-4.2-2.4l1.6-1.4zM10.8 25.8c.4.7.7 1.2 1.5 1.2.7 0 1.2-.3 1.2-1.4V18h2.2v7.7c0 2.3-1.3 3.3-3.3 3.3-1.7 0-2.8-.9-3.3-2l1.7-1.2z" fill="#000"/>
`);

export const reactIcon = svg(`
  <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
  <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" stroke-width="1.5" fill="none"/>
  <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" stroke-width="1.5" fill="none" transform="rotate(60 16 16)"/>
  <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" stroke-width="1.5" fill="none" transform="rotate(120 16 16)"/>
`);

export const tailwindIcon = svg(`
  <path d="M16 6.4c-4.3 0-7 2.1-8 6.4 1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3.1 2.2 1.6 1.6 3.4 3.5 7.3 3.5 4.3 0 7-2.1 8-6.4-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3.1-2.2C21.7 8.3 19.9 6.4 16 6.4zm-8 9.6c-4.3 0-7 2.1-8 6.4 1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3.1 2.2 1.6 1.6 3.4 3.5 7.3 3.5 4.3 0 7-2.1 8-6.4-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3.1-2.2C13.7 17.9 11.9 16 8 16z" fill="#38BDF8"/>
`);

export const nodeIcon = svg(`
  <path d="M16 2.5L3 9.8v14.4L16 31.5l13-7.3V9.8z" fill="#3C873A"/>
  <path d="M16 2.5L3 9.8v14.4L16 31.5" fill="#3C873A"/>
  <path d="M16 2.5l13 7.3v14.4L16 31.5" fill="#3C873A"/>
  <path d="M16 7l9 5.2v10.4L16 27.8l-9-5.2V12.2z" fill="#fff" opacity=".15"/>
  <text x="16" y="20" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" font-family="sans-serif">JS</text>
`);

export const mongoIcon = svg(`
  <path d="M16.1 3C11.5 3 7 8.5 7 15c0 5.1 2.7 8.7 6.3 10.6l.7 3.4h4l.7-3.4C22.3 23.7 25 20.1 25 15 25 8.5 20.7 3 16.1 3z" fill="#4DB33D"/>
  <path d="M16.1 5c3.5 0 7 4.5 7 10 0 4.3-2.3 7.5-5.5 9.2V5.1c-.5-.1-1-.1-1.5-.1z" fill="#3FA037"/>
  <path d="M15.6 5.1V24.2c-3.2-1.7-5.5-4.9-5.5-9.2 0-5.5 3.5-10 5.5-9.9z" fill="#4DB33D"/>
`);

export const pythonIcon = svg(`
  <path d="M15.9 3C10.3 3 10.7 5.4 10.7 5.4V8h5.4v.8H7.8S4 8.3 4 14c0 5.6 3.3 5.4 3.3 5.4h2v-2.6s-.1-3.3 3.2-3.3h5.5s3.1.1 3.1-3V6.4S21.7 3 15.9 3zm-3.1 1.8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#387EB8"/>
  <path d="M16.1 29c5.6 0 5.2-2.4 5.2-2.4V24h-5.4v-.8h8.3s3.8.4 3.8-5.2c0-5.6-3.3-5.4-3.3-5.4h-2v2.6s.1 3.3-3.2 3.3h-5.5S11 18.4 11 21.4v5.2S10.3 29 16.1 29zm3.1-1.8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFE052"/>
`);

export const gitIcon = svg(`
  <path d="M29.5 14.8L17.2 2.5a1.7 1.7 0 00-2.4 0l-2.4 2.4 3 3a2 2 0 012.6 2.6l2.9 2.9a2 2 0 11-1.2 1.9 2 2 0 01-.6-1.4l-2.7-2.7v7a2 2 0 11-1.6 0V11a2 2 0 01-1.1-2.6L10.6 5.5 2.5 13.6a1.7 1.7 0 000 2.4l12.3 12.3a1.7 1.7 0 002.4 0l12.3-12.3a1.7 1.7 0 000-1.2z" fill="#F05032"/>
`);

export const figmaIcon = svg(`
  <path d="M11 29a5 5 0 005-5v-5h-5a5 5 0 000 10z" fill="#0ACF83"/>
  <path d="M6 16a5 5 0 015-5h5v10h-5a5 5 0 01-5-5z" fill="#A259FF"/>
  <path d="M6 6a5 5 0 015-5h5v10h-5a5 5 0 01-5-5z" fill="#F24E1E"/>
  <path d="M16 1h5a5 5 0 010 10h-5V1z" fill="#FF7262"/>
  <path d="M26 16a5 5 0 11-10 0 5 5 0 0110 0z" fill="#1ABCFE"/>
`);

export const djangoIcon = svg(`
  <rect width="32" height="32" rx="4" fill="#092E20"/>
  <path d="M18 5h3v18.5c0 4.5-2.1 6-5.5 6-2.1 0-3.8-.7-4.9-2l2-2.2c.7.8 1.5 1.2 2.6 1.2 1.5 0 2.3-.8 2.3-3V7.5z" fill="#44B78B"/>
  <path d="M18 9h3v3h-3zM11.5 13h3v12.5h-3V13zM11.5 9h3v3h-3z" fill="#44B78B"/>
`);

export const flutterIcon = svg(`
  <path d="M13.5 3L3 13.5l4.2 4.2 14.8-14.7z" fill="#54C5F8"/>
  <path d="M13.5 3l9 9-4.2 4.3-9-9z" fill="#01579B"/>
  <path d="M7.2 17.7l6.1 6.1-4.2 4.2L3 21.9z" fill="#54C5F8"/>
  <path d="M13.3 23.8l5.3-5.3 4.2 4.2-5.3 5.3z" fill="#54C5F8"/>
  <path d="M13.3 23.8l2.2-2.2 2.1 2.1-2.2 2.1z" fill="#01579B"/>
`);
