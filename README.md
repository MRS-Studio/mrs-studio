# MRS Studio ✦

> A Pinterest-style luxury product showcase website with admin management.

**Tech Stack:** Next.js 14 · React · Tailwind CSS · Firebase · Vercel

---

## Features

- 🖼️ **Pinterest-style masonry grid** with infinite scroll
- 🔐 **Admin-only dashboard** — upload, edit, delete products
- 🛒 **Affiliate link tracking** — click counts per product  
- 🔍 **Search + Category filtering**
- 🌙 **Dark mode toggle**
- 📱 **Fully responsive** — mobile-first design
- ⚡ **SEO optimized** with OpenGraph meta tags
- 🎨 **Luxury aesthetic** — Gold & Brown Pastel theme

---

## Folder Structure

```
mrs-studio/
├── app/
│   ├── layout.js              # Root layout + providers
│   ├── page.js                # Homepage
│   ├── globals.css            # Global styles
│   ├── product/[id]/page.js   # Product detail
│   ├── category/[name]/page.js
│   ├── search/page.js
│   ├── trending/page.js
│   └── admin/
│       ├── layout.js          # Auth protection
│       ├── login/page.js
│       ├── dashboard/page.js
│       ├── add-product/page.js
│       └── edit/[id]/page.js
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── HeroBanner.js
│   ├── ProductCard.js
│   ├── ProductGrid.js
│   ├── CategoryFilter.js
│   ├── SearchBar.js
│   └── LoadingSkeleton.js
├── lib/
│   ├── firebase.js            # Firebase init
│   ├── AuthContext.js         # Auth provider
│   └── products.js            # Firestore CRUD helpers
└── .env.local.example
```

---

## Installation

```bash
# 1. Clone or download the project
cd mrs-studio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Firebase credentials

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Firebase Setup

### Step 1: Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → Enter "mrs-studio" → Continue
3. Disable Google Analytics (optional) → Create project

### Step 2: Enable Authentication

1. In Firebase console → **Authentication** → **Get Started**
2. Click **Email/Password** → Enable → Save
3. Go to **Users** tab → **Add user**
4. Enter your admin email and password → **Add user**

### Step 3: Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose **Start in production mode** → Next
3. Select a location → Done

4. Go to **Rules** tab and paste:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 4: Enable Storage

1. Go to **Storage** → **Get started**
2. Start in production mode → Done

3. Go to **Rules** tab:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 5: Get Configuration

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **Your apps** → Click **</>** (Web)
3. Register app → Copy the `firebaseConfig` values

Paste them in your `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

---

## Admin Access

1. Go to `/admin/login`
2. Login with the admin email/password you created in Firebase Auth
3. You'll be redirected to the dashboard

From the dashboard you can:
- View total products and click stats
- Add new products (with image upload)
- Edit existing products
- Delete products

---

## Deploying to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
# Follow prompts, set environment variables when asked
```

### Option B: GitHub + Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. **Add Environment Variables** (all `NEXT_PUBLIC_FIREBASE_*` values)
5. Click **Deploy**

### Setting Environment Variables in Vercel

In Vercel Dashboard → Project → **Settings** → **Environment Variables**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | your-project-id |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Your app ID |

---

## Firestore Data Structure

Collection: `products`

| Field | Type | Description |
|-------|------|-------------|
| `id` | auto | Firestore document ID |
| `title` | string | Product name |
| `description` | string | Product description |
| `imageURL` | string | Firebase Storage URL |
| `price` | string | Display price (e.g. "$99") |
| `category` | string | Product category |
| `affiliateLink` | string | External URL for Buy Now |
| `clicks` | number | Click count (auto-incremented) |
| `createdAt` | timestamp | Upload timestamp |

---

## Customization

**Change brand colors** → `tailwind.config.js` → `theme.extend.colors`

**Add categories** → `app/admin/add-product/page.js` → `CATEGORIES` array

**Modify page size** → `lib/products.js` → `PAGE_SIZE` constant

---

## License

MIT — Free to use and modify.
