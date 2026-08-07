# schema.md — Database Schema

## Tables

### Product
Stores the 3 L-Series models (seeded, not user-editable).

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| name | String | "L250", "L300", "L350" |
| tagline | String | Short description |
| price | Int | In INR (plain rupees) |
| videoPort | String | "VGA" or "DVI-D" |
| maxResolution | String | e.g. "1920x1080" |
| usbPorts | String | e.g. "2x USB 2.0" |
| imageUrl | String? | Optional |

### Order
One order per checkout. Has many OrderItems.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| customerName | String | |
| email | String | |
| phone | String | |
| shippingAddress | String | |
| billingAddress | String | |
| city | String | |
| state | String | |
| pincode | String | |
| totalAmount | Int | In INR |
| status | OrderStatus | PENDING / PROCESSING / SHIPPED / DELIVERED |
| paymentStatus | PaymentStatus | UNPAID / PAID / FAILED |
| razorpayOrderId | String? | From Razorpay |
| razorpayPaymentId | String? | After payment |

### OrderItem
Line items inside an order.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | |
| orderId | String | FK → Order |
| productId | String | FK → Product |
| quantity | Int | |
| unitPrice | Int | Price at time of order |

### Lead
Demo / contact / pricing requests from the site.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | |
| name | String | |
| email | String | |
| phone | String? | |
| company | String? | |
| type | LeadType | DEMO / CONTACT_SALES / PRICING |
| message | String? | |

## Enums
- **OrderStatus**: PENDING, PROCESSING, SHIPPED, DELIVERED
- **PaymentStatus**: UNPAID, PAID, FAILED
- **LeadType**: DEMO, CONTACT_SALES, PRICING
