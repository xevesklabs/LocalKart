# LocalKart 🛍️

An artisanal e-commerce storefront for a local lifestyle and gift shop, built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Features

- **Responsive Storefront:** Curated artisanal boutique aesthetics with mobile-first layouts.
- **Interactive Catalogue:** 12 fictional lifestyle products across *Gifts*, *Accessories*, *Stationery*, and *Home Decor*.
- **Real-time Search & Category Filters:** Instant search by product name with empty state resets and category pills with counters.
- **Dynamic Cart Drawer:** Line items, quantity increments/decrements, item removal, free shipping progress bar, and automatic subtotal in Indian Rupees (`₹`).
- **Validated Checkout:** Order preparation modal enforcing required field checks (10-digit mobile, email, 6-digit pincode, delivery address).
- **Order Confirmation Receipt:** Demonstration order completion screen with generated `#LK-xxxxxx` tracking code.
- **Dark Mode Support:** Smooth light/dark mode with an inline toggle button right beside the search bar, backed by `localStorage` and system theme detection.

---

## 🚀 Deploying to Vercel

The project includes a pre-configured [`vercel.json`](./vercel.json) optimized for Vite Single Page Applications (SPA).

### Method 1: Deploy with Vercel CLI

Run the following command in your terminal:

```bash
npx vercel
```

- When asked to link to an existing project: `N`
- Project name: `localkart`
- Directory: `./`
- Want to modify settings: `N` (Vercel automatically detects the Vite preset and output directory `dist`)

For production deployment:
```bash
npx vercel --prod
```

### Method 2: Deploy via GitHub / GitLab

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/localkart.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel automatically detects the configuration:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**.

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```
