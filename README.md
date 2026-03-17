# Xidon Urtia - Luxury Boutique E-commerce

A premium, full-stack e-commerce application designed for high-end feminine care, bespoke furniture, and artisanal home accents. Built with a focus on elegance, performance, and seamless administrative control.

## 🚀 Live Demo
You can view the live interactive demo here: [Live App Link] (Replace with your Shared App URL)

## ✨ Key Features

### 🛍️ Premium Shopping Experience
- **Curated Collections**: Specialized categories for Pads, Tissues, Furniture, Rugs, and Candles.
- **Responsive Design**: Optimized for both desktop and mobile devices with a "Luxury Magazine" aesthetic.
- **Interactive UI**: Smooth animations using `motion/react` and crisp iconography from `lucide-react`.
- **Real-time Cart**: Instant feedback when adding items to the shopping bag.

### 🔐 Administrative Suite
- **Secure Admin Login**: Google Authentication integration for authorized personnel.
- **Stock Management**: Full CRUD (Create, Read, Update, Delete) capabilities for the product inventory.
- **CMS (Content Management System)**: Update homepage hero titles, subtitles, and imagery without touching code.
- **Order Tracking**: Real-time monitoring of customer orders and fulfillment status.

### 🌍 Localization
- **Currency**: Fully localized for the Kenyan market using **Ksh. (Kenya Shillings)**.

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Utility-first, mobile-first design)
- **Animations**: Motion (formerly Framer Motion)
- **Backend/Database**: Firebase Firestore (Real-time NoSQL)
- **Authentication**: Firebase Auth (Google Provider)
- **Icons**: Lucide React

## 📦 Local Setup

1. **Clone the repository**:
   ```bash
   git clone <your-github-repo-url>
   cd xidon-urtia
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Create a project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication (Google Provider).
   - Update `firebase-applet-config.json` with your project credentials.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📸 Presentation Guide (Visual Layout)

### Desktop View
- **Navigation**: Elegant transparent-to-white sticky navbar with tracking-widest typography.
- **Hero**: Full-screen immersive imagery with serif typography and "slam-in" animations.
- **Grid**: 4-column product layout with hover-reveal "Add to Cart" buttons.
- **Admin**: Clean, sidebar-less dashboard with tabbed navigation for Inventory, Content, and Orders.

### Mobile View
- **Navigation**: Minimalist hamburger menu with a full-screen slide-out sidebar.
- **Layout**: Single-column product stack for maximum legibility and touch-friendly targets.
- **Interactions**: Optimized touch targets (44px+) and simplified animations for performance.

---
*Crafted with excellence for Xidon Urtia.*
