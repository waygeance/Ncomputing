# api.md — Backend API Reference

Base URL (local): `http://localhost:8080/api`  
Base URL (prod): `https://<render-app>.onrender.com/api`

---

## Products

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/products` | none | List all 3 L-Series products |
| GET | `/products/:id` | none | Get one product by id |

---

## Orders

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/orders` | none | Create order + Razorpay order, returns both ids |
| GET | `/orders/:id` | none | Get a single order (for confirmation page) |

---

## Payments

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/payments/create` | none | Create Razorpay order for an amount |
| POST | `/payments/verify` | none | Verify Razorpay signature, mark order PAID, send email |

---

## Leads

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/leads` | none | Submit a demo/contact/pricing request |

---

## Admin (all require `Authorization: Bearer <token>`)

| Method | Path | Description |
|---|---|---|
| POST | `/admin/login` | Returns JWT if password matches |
| GET | `/admin/orders` | List all orders. Query: `?status=`, `?search=` |
| PATCH | `/admin/orders/:id/status` | Update order status |
| GET | `/admin/leads` | List all leads |

---

## Health

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Returns `{ ok: true }` |
