# Digital Agency Website

A modern, responsive website for a marketing and website-building agency built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Royal Branding**: Elegant royal blue and cream color scheme
- 📱 **Responsive Design**: Mobile-first approach with modern UI/UX
- ⚡ **Performance**: Built with Next.js for optimal performance and SEO
- 🎯 **Accessibility**: WCAG compliant design for all users
- 🔧 **Modern Tech Stack**: TypeScript, Tailwind CSS, and React 19

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom royal branding
- **Fonts**: Inter (Google Fonts)
- **Icons**: Heroicons and custom SVG icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agency-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Services.tsx    # Services showcase
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer component
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## Customization

### Colors

The project uses a custom royal color palette defined in `tailwind.config.js`:

- **Royal Blue**: `#1E3A8A` to `#3B82F6`
- **Cream**: `#FEF3C7` to `#FDE68A`
- **White**: `#FFFFFF`

### Components

All components are built with Tailwind CSS classes and can be easily customized by modifying the className props.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The project can be deployed to various platforms:

- **Vercel** (Recommended): Connect your GitHub repository
- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **AWS Amplify**: Follow Next.js deployment guide

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please contact the development team.
