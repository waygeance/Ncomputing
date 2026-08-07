# Implementation.md — NComputing L-Series Marketing Site + Ordering Portal + Admin Dashboard

You are building a small full-stack project for an SDE intern assignment. Keep everything **simple, clean, and functional** — no over-engineering, no unnecessary abstraction layers, no extra libraries beyond what's listed below.

---

## 0. Product Chosen (already decided — do not re-research)

**Product: NComputing L-Series (L250 / L300 / L350)**

Source: https://www.ncomputingindia.com/l-series/

**What it is:** A desktop virtualization access device (thin client). One physical PC running NComputing vSpace Pro server software can host up to **100 independent virtual desktop sessions**. Each user gets an L-series device (L250, L300, or L350 — differ by video port, max resolution, and USB ports) connected to a monitor, keyboard, and mouse. The device itself does almost no computing — the real PC does all the work — so it draws only 3–5W of power and costs a fraction of a full PC.

**Why this product was chosen:** It was the easiest to understand and explain to a non-technical buyer — "one PC, many desks, no per-seat PC cost" is a one-line pitch, and it maps naturally onto a simple e-commerce flow (pick a model, pick quantity, checkout) without needing enterprise sales-assisted flows like the Citrix/VDI platform products do.

**Target audience:** Cost-conscious institutions in India that need many identical low-intensity workstations at once — schools & coaching centers (computer labs), small/medium businesses (back office, data entry, billing counters), BPOs, and government offices. They care about upfront hardware cost, power bills, and low IT-maintenance overhead — not raw compute power.

**Product variants (use as seed data):**

| Model | Video Port | Max Resolution | USB (peripheral) | Price (seed, INR) |
|-------|-----------|-----------------|-------------------|---------------------|
| L250  | VGA       | 1440x900        | 1x USB 2.0        | ₹4,999 |
| L300  | VGA       | 1920x1080       | 2x USB 2.0        | ₹6,499 |
| L350  | DVI-D     | 1920x1200       | 2x USB 2.0        | ₹7,999 |

All three: up to 100 user sessions per host PC, 3–5W power draw, mounting bracket included, mic + speaker ports.

---

## 1. Tech Stack (fixed — do not swap)

- **Frontend:** React (Vite) + JavaScript (no TypeScript) + Tailwind CSS. Use Zustand only if cart/global state genuinely needs it (it does, for the cart) — keep the store tiny.
- **Backend:** Node.js + Express (JavaScript, no TypeScript).
- **ORM/DB:** Prisma + PostgreSQL.
- **Payments:** Razorpay **test mode** (Indian sandbox gateway, works well for INR pricing). Use `razorpay` npm package + Razorpay Checkout.js on frontend.
- **Email:** Nodemailer using Gmail SMTP with an App Password (simplest free option) — send order confirmation email after successful payment.
- **Deployment:**
  - Frontend → Vercel
  - Backend → Render
  - Database → Neon (Postgres)

---

## 2. Folder Structure

```
project-root/
├── frontend/                # React + Vite + Tailwind
│   ├── src/
│   │   ├── pages/            # Landing, Problem, Solution, Product+Order, Cart, Checkout, OrderConfirmation, Admin
│   │   ├── components/       # Navbar, Footer, ProductCard, CartDrawer, LeadForm, etc.
│   │   ├── store/            # cartStore.js (zustand)
│   │   ├── lib/               # api.js (axios/fetch wrapper)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/           # products.js, orders.js, leads.js, payments.js, admin.js
│   │   ├── controllers/
│   │   ├── lib/              # prisma.js, mailer.js, razorpay.js
│   │   ├── middleware/       # adminAuth.js
│   │   └── server.js
│   └── package.json
└── Implementation.md
```

Keep frontend and backend as two independent deployable apps (two `package.json`s, two `.env` files). No monorepo tooling needed.

---

## 3. Site Structure & Reasoning

Use a **4-page marketing flow + 1 combined product/order page** (slightly adapted from the suggested structure — merging "Product Page" and the ordering portal's product-detail view into one, since splitting them would force the user to re-read the same product info twice before buying):

1. **Landing Page (`/`)** — What NComputing does broadly + why "Compute Smartly" (one PC, many users) matters. CTA: "See the Problem" → scrolls/links to Problem page.
2. **Problem Page (`/problem`)** — The pain point: schools/SMBs in India overspend on PCs they don't need, high power bills, high IT maintenance for computer labs. Use simple stat callouts (cost of N PCs vs N thin clients, power draw comparison).
3. **Solution Page (`/solution`)** — How desktop virtualization + L-series solves it: one PC + vSpace Pro server + L-series devices at every desk. Include the architecture idea in plain language (no need to recreate NComputing's actual diagram — describe it with a simple custom illustration/diagram built in the site itself).
4. **Product Page (`/product`)** — L250 / L300 / L350 comparison table, specs, and this **is** the entry point into the ordering portal: quantity selector, model selector → Add to Cart.

Then the ordering-portal-specific pages: `/cart`, `/checkout`, `/order-confirmation/:orderId`.

Lead capture ("Request a demo", "Contact sales", "Request pricing") is a persistent component: a modal/form reachable from the Navbar and from the Problem/Solution pages (not a separate page — keeps navigation simple), and every submission is stored via `/api/leads`.

---

## 4. Database Schema (Prisma)

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String   // "L250" | "L300" | "L350"
  tagline     String
  price       Int      // in INR paise or plain rupees — use plain rupees (Int)
  videoPort   String
  maxResolution String
  usbPorts    String
  imageUrl    String?
  createdAt   DateTime @default(now())
  orderItems  OrderItem[]
}

model Order {
  id              String   @id @default(cuid())
  customerName    String
  email           String
  phone           String
  shippingAddress String
  billingAddress  String
  city            String
  state           String
  pincode         String
  totalAmount     Int
  status          OrderStatus @default(PENDING)
  paymentStatus   PaymentStatus @default(UNPAID)
  razorpayOrderId String?
  razorpayPaymentId String?
  items           OrderItem[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  unitPrice Int
}

model Lead {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  company   String?
  type      LeadType // DEMO | CONTACT_SALES | PRICING
  message   String?
  createdAt DateTime @default(now())
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
}

enum PaymentStatus {
  UNPAID
  PAID
  FAILED
}

enum LeadType {
  DEMO
  CONTACT_SALES
  PRICING
}
```

Seed the 3 products (L250/L300/L350) via `prisma/seed.js` using the table in Section 0.

---

## 5. Backend API (Express)

Base URL: `/api`

**Products**
- `GET /api/products` — list all products
- `GET /api/products/:id` — single product

**Orders**
- `POST /api/orders` — create order (status PENDING, paymentStatus UNPAID) from cart + shipping/billing form. Returns order + a Razorpay order (via `/api/payments/create`) OR combine into one call: create Order row, then create Razorpay order, return both ids to frontend.
- `GET /api/orders/:id` — get single order (for confirmation page)
- `GET /api/admin/orders` — (admin-only) list all orders, supports `?status=` and `?search=` (name/email) query params
- `PATCH /api/admin/orders/:id/status` — (admin-only) update order status

**Payments**
- `POST /api/payments/create` — create Razorpay order for a given amount, returns `razorpayOrderId`
- `POST /api/payments/verify` — verify Razorpay payment signature after checkout completes; on success: set `paymentStatus = PAID`, send confirmation email via Nodemailer, return success to frontend.

**Leads**
- `POST /api/leads` — create a lead (demo/contact/pricing request)
- `GET /api/admin/leads` — (admin-only) list all leads

**Admin auth**
- Keep this deliberately simple: a single hardcoded admin password stored in `.env` (`ADMIN_PASSWORD`). `POST /api/admin/login` checks the password and returns a signed JWT (use `jsonwebtoken`, one static secret in `.env`). `middleware/adminAuth.js` checks `Authorization: Bearer <token>` on all `/api/admin/*` routes. No user roles, no registration flow — this is intentionally minimal per the assignment's "not production-ready" scope.

---

## 6. Frontend Pages — Content & Behavior

### Navbar / Footer
Logo text "NComputing L-Series" (or similar), links: Home, Problem, Solution, Product, Cart (with item count badge), "Request Demo" button (opens lead modal). Footer: short company blurb + contact info (reuse real NComputing India Pune office contact info as flavor text, not functional).

### Landing Page
- Hero: headline like "Stop buying a PC for every desk." + subheadline explaining desktop virtualization in one sentence + CTA button "See the problem we solve" → `/problem`.
- 3-column "why it matters" section: Security, Spend Wisely, Less Hardware (mirrors NComputing's real messaging, rewritten in your own words).
- Secondary CTA: "Explore the L-Series" → `/product`.

### Problem Page
- Headline: the pain point framed for the Indian SMB/school buyer.
- 2–3 stat/comparison cards: e.g. cost of equipping a 40-seat computer lab with PCs vs L-series devices; power consumption comparison (PC ~65-150W vs L-series 3-5W); IT maintenance overhead.
- CTA to Solution page.

### Solution Page
- Explain: one server PC running vSpace Pro + up to 100 L-series clients, each an independent virtual desktop.
- Simple custom diagram (build with basic HTML/CSS boxes and arrows, or an inline SVG — do NOT try to reproduce NComputing's actual copyrighted diagram) showing: [Host PC / vSpace Pro Server] → fans out to → [L250] [L300] [L350] devices, each with monitor/keyboard/mouse icon.
- CTA: "See the devices" → `/product`.

### Product Page (`/product`)
- Comparison table for L250 / L300 / L350 (from Section 0 table).
- For each model: model selector (radio/cards), quantity stepper, "Add to Cart" button.
- Add to cart → Zustand store, persists in memory for the session (no need for localStorage; keep simple, in-memory is fine for an assignment demo — mention this as a known limitation in the Notion writeup).

### Cart Page (`/cart`)
- List of cart line items (model, qty, unit price, subtotal), quantity edit/remove, total. "Proceed to Checkout" button.

### Checkout Page (`/checkout`)
- Form: name, email, phone, shipping address, billing address (checkbox "same as shipping"), city, state, pincode.
- On submit: call `POST /api/orders` → get back order id + Razorpay order id → open Razorpay Checkout.js modal → on success call `POST /api/payments/verify` → redirect to `/order-confirmation/:orderId`.

### Order Confirmation Page
- Show order summary, "Payment successful", note that a confirmation email has been sent.

### Lead Modal/Form (global, reused on multiple pages)
- Fields: name, email, phone, company (optional), type (Demo / Contact Sales / Pricing — dropdown or 3 buttons), message (optional).
- Submits to `/api/leads`.

### Admin Dashboard (`/admin`)
- `/admin/login` — password field → stores JWT (e.g. in memory / sessionStorage is fine, not localStorage per artifact rules if this were an artifact, but this is a real deployed app so sessionStorage/localStorage in the actual React app is fine — just don't use it inside Claude artifacts, this is a normal deployed site).
- `/admin/orders` — table of all orders: customer name, email, items summary, total, payment status, order status (editable dropdown → PATCH call), created date. Search box (name/email) + status filter dropdown.
- `/admin/leads` — table of all lead submissions: name, email, phone, type, message, date.

Keep the admin UI plain — a table, a search bar, a filter dropdown, a status `<select>`. No charts, no fancy dashboard widgets.

---

## 7. Payment Integration Notes (Razorpay test mode)

1. Sign up for Razorpay, get **test mode** `key_id` and `key_secret` — put in backend `.env` as `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`. Expose only `RAZORPAY_KEY_ID` to frontend via `.env` (`VITE_RAZORPAY_KEY_ID`).
2. Backend creates a Razorpay Order (`razorpay.orders.create`) with amount in paise.
3. Frontend loads Razorpay Checkout.js, opens with the `order_id`, on success gets `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`.
4. Frontend sends these 3 values to `POST /api/payments/verify`; backend verifies signature using `crypto.createHmac('sha256', key_secret)` per Razorpay docs, then updates the Order row.
5. Use Razorpay's published test card numbers for the demo video (do not use real cards).

---

## 8. Email Notes (Nodemailer)

- Use a Gmail account + an **App Password** (not the real password) in backend `.env` (`SMTP_USER`, `SMTP_PASS`).
- On successful payment verification, send a simple plain-text/HTML email: order id, items, total, shipping address, "we'll notify you when it ships."
- Keep the email template minimal — one function `sendOrderConfirmation(order)` in `lib/mailer.js`.

---

## 9. Environment Variables

**backend/.env**
```
DATABASE_URL=postgresql://... (Neon connection string)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
SMTP_USER=
SMTP_PASS=
ADMIN_PASSWORD=
JWT_SECRET=
FRONTEND_URL=https://<vercel-app>.vercel.app
PORT=8080
```

**frontend/.env**
```
VITE_API_URL=https://<render-app>.onrender.com
VITE_RAZORPAY_KEY_ID=
```

---

## 10. Deployment Steps

1. **Neon:** create a Postgres project, copy connection string into backend `.env` as `DATABASE_URL`. Run `npx prisma migrate deploy` and `node prisma/seed.js` against it.
2. **Render:** deploy `backend/` as a Web Service (Node). Set all backend env vars in Render dashboard. Build command `npm install && npx prisma generate`. Start command `node src/server.js`.
3. **Vercel:** deploy `frontend/` as a Vite project. Set `VITE_API_URL` and `VITE_RAZORPAY_KEY_ID` in Vercel env vars. Set backend CORS to allow the Vercel domain (`FRONTEND_URL`).
4. Verify: place a full test order end-to-end on the deployed URLs before recording the demo video.

---

## 11. What NOT to build (keep it simple)

- No user accounts/login for customers (guest checkout only).
- No real product images/branding assets from NComputing's actual site — build simple, original visuals (colored boxes/icons/CSS) instead of scraping their images, to avoid copyright issues.
- No multi-currency, no discount codes, no inventory tracking, no shipment tracking integration.
- No role-based admin (single shared admin password is enough).
- No automated tests required, but keep components small and readable.

---

## 12. Order of Implementation (suggested, for the agent)

1. Scaffold `backend/`: Express server, Prisma schema + migration + seed script, health check route.
2. Build Products, Leads, Orders, Payments, Admin routes + controllers.
3. Scaffold `frontend/`: Vite + Tailwind, router, Navbar/Footer, Zustand cart store, API wrapper.
4. Build Landing → Problem → Solution → Product pages (static content first, wire "Add to Cart" once Product page exists).
5. Build Cart → Checkout → Razorpay integration → Order Confirmation.
6. Build Lead modal, wire to `/api/leads`.
7. Build Admin login + Orders table + Leads table.
8. Wire Nodemailer confirmation email into payment verify route.
9. Deploy (Neon → Render → Vercel), do a full end-to-end test order.
10. Write the Notion two-pager and record the demo video (outside the agent's scope).