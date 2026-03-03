# APS Cyber Dashboard

A production-grade B2B SaaS security platform dashboard built as a technical assessment. This project translates high-fidelity UI/UX designs into a functional, responsive, and pixel-perfect React application using modern web technologies.

## 🚀 Features

- **Pixel-Perfect UI**: Meticulous implementation of three core screens:
  - **Login/Sign-up**: Split-layout with custom radial gradients, noise textures, and absolute-positioned branding elements.
  - **Main Dashboard**: Comprehensive overview of scan statistics, high-severity vulnerability tracking, and an interactive scan list.
  - **Active Scan Detail**: Live progress tracking with a custom stepper, real-time finding logs, and detailed scan metadata.
- **Interactive Functionality**:
  - Fully working **Pagination** for large datasets.
  - Dynamic **Table Filtering** (by status) and **Column Selection** (show/hide columns).
  - Search functionality to filter scans by name or type.
  - Form validation for Signup (8+ character password, mandatory terms).
  - Navigation between Dashboard and Scan Details.
- **Modern Aesthetics**: 
  - Dark mode by default with a premium feel.
  - Glassmorphic effects, custom glows, and subtle micro-animations (fade-in, slide-in).
  - High-quality SVG assets and custom-designed Cyber Security favicon.
- **User Experience**:
  - Mock loading states with skeleton patterns.
  - Responsive design for various screen sizes.
  - Clear visual feedback via status chips and severity badges.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useState, useEffect)
- **Components**: Radix UI primitives (via shadcn/ui patterns) for high-quality accessible components.

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── dashboard/        # Main Dashboard & Sub-pages
│   ├── login/            # Signup/Login Page
│   └── globals.css       # Global styles & Tailwind entry
├── components/           # Reusable UI Components
│   ├── ui/               # Primary UI atomic components (Buttons, Inputs, etc.)
│   └── sidebar.tsx       # Main navigation sidebar
├── lib/                  # Utilities & Mock Data
└── public/               # Static assets (Favicon, SVGs)
```

## 🛠️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/soumyadeepdutta7/cyber-dashboard.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**: Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📄 License

This project was built for a technical assessment. All rights reserved.
