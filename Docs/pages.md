# pages.md — Frontend Pages

## Routes

| Path | Component | What it shows |
|---|---|---|
| `/` | Landing | Hero, why-it-matters, CTAs |
| `/problem` | Problem | Pain points, cost comparison stats |
| `/solution` | Solution | How L-Series fixes it, architecture diagram |
| `/product` | Product | L250/L300/L350 cards, add to cart |
| `/cart` | Cart | Line items, quantity edit, total |
| `/checkout` | Checkout | Shipping form, Razorpay payment |
| `/order-confirmation/:id` | OrderConfirm | Order summary, payment success |
| `/admin` | → redirect to `/admin/orders` | |
| `/admin/login` | AdminLogin | Password form |
| `/admin/orders` | AdminOrders | Orders table with filters |
| `/admin/leads` | AdminLeads | Leads table |

## Global Components

| Component | Description |
|---|---|
| `Navbar` | Logo, nav links, cart badge, "Request Demo" button |
| `Footer` | Company blurb, contact info |
| `LeadModal` | Modal form — Demo / Contact Sales / Pricing |

## Notes
- Lead modal is reachable from Navbar on every page
- Cart state lives in Zustand (`src/store/cart.js`)
- API calls go through `src/lib/api.js` (axios wrapper)
- No customer login — guest checkout only
