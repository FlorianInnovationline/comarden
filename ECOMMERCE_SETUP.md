# E-commerce Module Setup Guide

This guide explains how to set up and use the new e-commerce module added to the Comarden website.

## Overview

The e-commerce module includes:
- **Public Shop**: `/shop` - Browse and purchase products
- **Admin Dashboard**: `/admin` - Manage products, orders, promotions
- **Cart & Checkout**: `/cart` and `/checkout` - Shopping cart and order placement

## Setup Options

### Option 1: MySQL (Recommended)

1. **Local MySQL** (Development):
   - Install MySQL locally
   - Run `db/mysql-schema.sql` to create the database
   - Add to `.env.local`:
     ```env
     MYSQL_HOST=localhost
     MYSQL_PORT=3306
     MYSQL_USER=root
     MYSQL_PASSWORD=your_password
     MYSQL_DATABASE=comarden_shop
     ```

2. **Free MySQL Hosting** (Production):
   - Use PlanetScale, Railway, or Aiven (all have free tiers)
   - Get connection string
   - Add to `.env.local`:
     ```env
     DATABASE_URL=mysql://user:password@host:port/database
     ```

See `MYSQL_SETUP.md` for detailed instructions.

### Option 2: Dev Mode (Fallback - No Database)

If MySQL is not configured, the app will use fallback seed data:

1. Add to `.env.local`:
   ```env
   DEV_ADMIN_EMAIL=admin@comarden.be
   DEV_ADMIN_PASSWORD=admin123
   ```   
2. The app will use seed data from `lib/shop/seed.ts`
3. Admin login will work with the dev credentials
4. Orders will be logged to console (not persisted)

## Routes
### Public Routes
- `/shop` - Shop homepage with categories and featured products
- `/shop/produit/[slug]` - Product detail page
- `/shop/categorie/[slug]` - Category listing with filters
- `/cart` - Shopping cart
- `/checkout` - Checkout form

### Admin Routes (Protected)
- `/admin/login` - Admin login page
- `/admin` - Dashboard overview
- `/admin/products` - Products management
- `/admin/products/new` - Create new product
- `/admin/products/[id]` - Edit product
- `/admin/orders` - Orders management
- `/admin/promotions` - Promotions management
- `/admin/settings` - Shop settings

## Features

### Public Shop
- ✅ Product browsing by category
- ✅ Search functionality
- ✅ Price and stock filters
- ✅ Shopping cart (localStorage)
- ✅ Checkout form
- ✅ Order creation (saved to database or logged in dev mode)

### Admin Dashboard
- ✅ Product management (CRUD)
- ✅ Order management with status updates
- ✅ Promotions management
- ✅ Dashboard statistics
- ✅ Responsive design
- ✅ Mobile-friendly admin interface

## Cart System

The cart uses client-side storage (localStorage) and React Context:
- Cart persists across page refreshes
- Items are stored locally until checkout
- Cart is cleared after successful order

## Order Flow

1. Customer adds products to cart
2. Customer goes to `/checkout`
3. Customer fills in contact and delivery information
4. Order is created via `/api/orders` endpoint
5. Order appears in admin dashboard at `/admin/orders`
6. Admin can update order status

## Security

- Admin routes are protected by middleware
- Admin authentication via cookie-based session (dev mode)
- For production, implement proper JWT-based authentication
- All admin routes redirect to `/admin/login` if not authenticated

## Development

### Running Locally

```bash
npm run dev
```

- Shop will be available at `http://localhost:3000/shop`
- Admin login at `http://localhost:3000/admin/login`
- Use dev credentials from `.env.local`

### Adding Products

1. Login to admin dashboard
2. Go to `/admin/products`
3. Click "Nouveau produit"
4. Fill in product details
5. Save

In dev mode (no Supabase), products are stored in memory and reset on server restart.

## Database Schema

See `db/mysql-schema.sql` for the complete MySQL schema:
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `promotions` - Discount codes and promotions
- `admin_users` - Admin user access control

## Future Enhancements

- Payment integration (Stripe)
- Email notifications
- Order tracking
- Product reviews
- Inventory management
- Shipping calculations
- Multi-currency support

## Notes

- The e-commerce module is completely separate from the existing marketing site
- No existing pages were modified (only additions)
- All new routes are under `/shop` and `/admin`
- Navigation updated to include "Magasin" link
- Footer includes subtle "Espace admin" link
