# HotelPro - Client Setup Guide

This document provides complete instructions for configuring, installing, and executing the **HotelPro Frontend Client Application** to satisfy **SkillWallet Epic 2: Project Setup and Configuration (Task 8)**.

---

## 1. Prerequisites
Ensure the following tools are installed on your environment:
* **Node.js**: v16.0.0 or higher (`node -v`)
* **npm**: v8.0.0 or higher (`npm -v`)
* Modern Web Browser: Google Chrome, Mozilla Firefox, or Microsoft Edge

---

## 2. Technology Stack & Dependencies

```json
{
  "name": "hotelpro-client",
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.0",
    "bootstrap": "^5.3.3",
    "bootstrap-icons": "^1.11.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.2.10"
  }
}
```

---

## 3. Step-by-Step Installation Instructions

### Step 1: Navigate to Client Directory
```bash
cd client
```

### Step 2: Install Required Dependencies
```bash
npm install
```
This installs React 18, React Router v6 for client-side SPA routing, Bootstrap 5 for responsive layout grids, Bootstrap Icons, and Vite's fast compilation plugin.

### Step 3: Configure Vite Development Proxy
In `client/vite.config.js`, API calls to `/api` are automatically proxied to the backend Express server:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

### Step 4: Start Development Server
```bash
npm run dev
```
The React application launches on `http://localhost:5173`.

### Step 5: Production Build & Asset Optimization
To create a production-optimized build:
```bash
npm run build
```
This outputs minified static HTML, CSS, and JS bundles into `client/dist/`, which is automatically served by the backend Express server at `http://localhost:5000`.

---

## 4. Zero-Setup Evaluation Alternative
If Node.js or build tools are unavailable on the evaluator's machine, simply double-click **`index.html`** in the project root directory. It runs the full HotelPro experience instantly in any browser with zero installation needed.
