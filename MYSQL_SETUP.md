# MySQL Setup Guide

The e-commerce module now uses **MySQL** instead of Supabase. This is simpler and completely free for small projects.

## Quick Setup

### Option 1: Local MySQL (Development)

1. **Install MySQL** (if not already installed):
   ```bash
   # macOS
   brew install mysql
   brew services start mysql
   
   # Or download from https://dev.mysql.com/downloads/mysql/
   ```

2. **Create database**:
   ```bash
   mysql -u root -p
   ```
   Then run:
   ```sql
   source db/mysql-schema.sql
   ```

3. **Configure `.env.local`**:
   ```env
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=comarden_shop
   
   DEV_ADMIN_EMAIL=admin@comarden.be
   DEV_ADMIN_PASSWORD=admin123
   ```

4. **Start the app**:
   ```bash
   npm run dev
   ```

### Option 2: Free MySQL Hosting (Production)

#### PlanetScale (Recommended - Free Tier)
1. Sign up at https://planetscale.com
2. Create a database
3. Get connection string
4. Add to `.env.local`:
   ```env
   DATABASE_URL=mysql://username:password@host:port/database
   ```

#### Railway (Free Tier)
1. Sign up at https://railway.app
2. Create MySQL service
3. Copy connection string
4. Add to `.env.local`

#### Other Options
- **Aiven** (free tier)
- **Render** (free tier)
- **Your own VPS** with MySQL

## Database Schema

The schema is in `db/mysql-schema.sql`. It includes:
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `promotions` - Discount codes
- `admin_users` - Admin access control

## Fallback Mode

If MySQL is not configured, the app automatically falls back to **seed data** from `lib/shop/seed.ts`. This means:
- ✅ Shop works immediately without database setup
- ✅ Products are loaded from seed data
- ✅ Orders are logged to console (not persisted)
- ✅ Perfect for development/testing

## Admin Authentication

Currently uses simple cookie-based auth:
- Dev credentials: `admin@comarden.be` / `admin123`
- Session stored in cookie
- For production, implement proper JWT-based auth

## Migration from Supabase

If you were using Supabase before:
1. Export your data from Supabase
2. Import into MySQL using the schema
3. Update `.env.local` with MySQL credentials
4. Remove Supabase env vars

## Benefits of MySQL

✅ **Free** - No vendor lock-in  
✅ **Simple** - Standard SQL  
✅ **Fast** - Direct database connection  
✅ **Flexible** - Full control over schema  
✅ **Portable** - Works anywhere MySQL runs  

## Next Steps

1. Set up MySQL (local or hosted)
2. Run the schema SQL
3. Configure `.env.local`
4. Test the shop at `/shop`
5. Login to admin at `/admin/login`

The app will automatically detect MySQL and use it, or fall back to seed data if not configured!
