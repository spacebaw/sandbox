# Louisiana Innovation Labs - Industrial Executive Theme

A Next.js 14 project with an Industrial Executive theme featuring deep navy, vibrant teal, and heavy slate colors.

## Theme Colors

- **Navy**: #040F49 (Primary background)
- **Teal**: #00BFA6 (Accent/CTA color)
- **Slate**: #0A2F30 (Secondary background)

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Inter Font** - Modern typography via Google Fonts

## Features

- Clean, high-contrast header with "Louisiana Innovation Labs" branding
- Bold, animated hero section with "Enough thinking. Start building." headline
- Responsive design with mobile menu
- Professional spacing and typography
- Smooth animations and transitions
- Grid pattern background effects

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles with Tailwind imports
│   ├── layout.tsx        # Root layout with header
│   └── page.tsx          # Home page with hero section
├── components/
│   └── Header.tsx        # Navigation header component
├── tailwind.config.js    # Tailwind theme configuration
├── next.config.js        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## Customization

### Theme Colors

Edit `tailwind.config.js` to customize the Industrial Executive theme colors:

```javascript
colors: {
  'navy': {
    DEFAULT: '#040F49',
    dark: '#020826',
    light: '#0A1A6E',
  },
  'teal': {
    DEFAULT: '#00BFA6',
    dark: '#009580',
    light: '#33CCBA',
  },
  'slate': {
    DEFAULT: '#0A2F30',
    dark: '#051819',
    light: '#154748',
  },
}
```

### Typography

The Inter font is loaded via Google Fonts in `app/globals.css`. To change fonts, update the import and the `fontFamily` configuration in Tailwind.

## Design Philosophy

This theme embodies an "Industrial Executive" aesthetic:

- **Bold & Direct**: No-nonsense messaging that prioritizes action
- **High Contrast**: Deep backgrounds with vibrant accents for visual impact
- **Tight Spacing**: Professional, compact layouts that feel purposeful
- **Modern Typography**: Clean, readable Inter font family
- **Purposeful Animation**: Subtle animations that enhance without distracting
