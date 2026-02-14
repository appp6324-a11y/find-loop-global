

## Plan: Connect Supabase Backend + Wire Localization System

This plan has two major parts: (A) connecting an external Supabase project with real auth, profiles, listings, and dashboard; and (B) wiring the existing localization system into the app.

---

### Prerequisites

You will need to connect your external Supabase project to Lovable. I will prompt you to do this before any code is written.

---

### Part A: Real Backend with Supabase

#### Step 1: Connect Supabase

- Connect your external Supabase project to Lovable
- This provides the Supabase URL and anon key automatically

#### Step 2: Database Schema (Migrations)

Create tables with RLS enabled:

**profiles** table:
- `id` (uuid, references auth.users, primary key)
- `name` (text)
- `avatar_url` (text, nullable)
- `phone` (text, nullable)
- `bio` (text, nullable)
- `country` (text)
- `country_code` (text)
- `city` (text, nullable)
- `area` (text, nullable)
- `verified` (text, default 'unverified')
- `created_at`, `updated_at` (timestamps)

**user_roles** table (separate from profiles for security):
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users)
- `role` (app_role enum: admin, moderator, user)
- Unique constraint on (user_id, role)

**categories** table:
- `id` (uuid), `name`, `slug`, `icon`, `description`, `parent_id` (self-ref), `listing_count`, `sort_order`

**listings** table:
- `id` (uuid), `user_id` (references auth.users), `title`, `slug`, `description`
- `price` (numeric), `currency`, `price_type`, `price_min`, `price_max`
- `category_id`, `subcategory_id` (references categories)
- `country`, `country_code`, `city`, `area`
- `images` (text array), `attributes` (jsonb)
- `status` (listing_status enum: draft, pending, active, expired, suspended, sold)
- `featured`, `urgent` (boolean)
- `views`, `favorites` (integer)
- `created_at`, `updated_at`, `expires_at`

**saved_listings** table:
- `user_id`, `listing_id`, unique constraint

**RLS Policies:**
- Profiles: users read all, update own only
- Listings: anyone reads active listings, authenticated users create/update/delete own
- Saved listings: users manage their own only
- Categories: public read
- `has_role()` security definer function for admin checks

**Triggers:**
- Auto-create profile on user signup
- Auto-generate slug on listing insert
- Auto-update `updated_at` timestamps

#### Step 3: Seed Categories

Insert the 7 top-level categories and their subcategories into the categories table using real data (same structure as current mock data).

#### Step 4: Storage Bucket

Create an `avatars` bucket and a `listing-images` bucket (both public) with RLS policies for authenticated uploads.

#### Step 5: Supabase Client Integration

- Create `src/integrations/supabase/client.ts` with the Supabase client
- Generate TypeScript types from the schema

#### Step 6: Auth Pages

Create new pages:

**LoginPage** (`/login`):
- Email/password sign in
- "Sign up" link
- Social login buttons (Google - configurable)
- Clean, centered card layout matching Paxful style

**SignupPage** (`/signup`):
- Email, password, confirm password, name
- Terms acceptance checkbox
- "Already have account?" link
- Auto-creates profile via trigger

**ForgotPasswordPage** (`/forgot-password`):
- Email input, sends reset link

#### Step 7: Auth Context

Create `src/context/AuthContext.tsx`:
- `AuthProvider` wrapping the app
- `useAuth()` hook exposing: `user`, `profile`, `loading`, `signIn`, `signUp`, `signOut`, `updateProfile`
- Uses `onAuthStateChange` listener (set up before `getSession`)
- Fetches profile from `profiles` table on auth state change

#### Step 8: Update Header

- Show Login/Sign Up buttons when not authenticated
- Show user avatar, name, and dropdown when authenticated
- Sign Out button in dropdown calls `signOut()`
- Wire country selector to localization context

#### Step 9: Update DashboardPage

- Protect with auth check (redirect to /login if not authenticated)
- Fetch user's real listings from Supabase
- Real stats computed from listings data
- Add Profile tab: edit name, avatar, phone, bio, location
- Add Settings tab: change password, notification preferences
- Remove all mock data imports

#### Step 10: Update PostAdPage

- Require authentication (redirect to /login)
- On submit, insert into `listings` table via Supabase
- Upload images to `listing-images` storage bucket
- Use `LocationSelector` component for country/state/city
- Fetch categories from Supabase instead of mock data
- Currency auto-set from localization context

#### Step 11: Update ListingPage, SearchPage, CategoryPage

- Fetch listings from Supabase with filters
- Real view count increment on visit
- Save/unsave functionality with `saved_listings` table
- Categories from database

#### Step 12: Update Homepage Sections

- `FeaturedListings`: query featured active listings from Supabase
- `RecentListings`: query latest active listings from Supabase
- `CategoriesSection`: query categories from Supabase
- Keep `HeroSection`, `TrustSection`, `CTASection` as static content

#### Step 13: Remove Mock Data

- Delete `src/data/mockData.ts` once all pages use real data
- Remove all imports of mock data across the app

#### Step 14: Update App.tsx Routes

- Add `/login`, `/signup`, `/forgot-password` routes
- Wrap app with `AuthProvider`

---

### Part B: Wire Localization System

#### Step 15: Integrate LocalizationProvider into App.tsx

- Import and wrap `LocalizationProvider` around the router in `App.tsx`
- Import i18n initialization

#### Step 16: Update Header with Localization

- Replace hardcoded country dropdown with `useLocalization()` hook
- Show detected country flag and name
- Country selector changes currency/language globally
- Use `useTranslation()` for nav text

#### Step 17: Update PostAdPage with Localization

- Replace hardcoded country/city selects with `LocationSelector` component
- Auto-set currency from detected country via `useLocalization()`
- Use all supported currencies in the currency dropdown
- Format price preview with `formatPrice()` from localization context

#### Step 18: Update PricingPage with Localization

- Use `formatPrice()` to display prices in user's local currency
- Convert pricing tiers to use localization-aware formatting
- Translate plan names and features with i18n

---

### Technical Details

```text
File Changes Summary:
+---------------------------------------------+--------+
| File                                        | Action |
+---------------------------------------------+--------+
| supabase/migrations/001_schema.sql          | Create |
| supabase/migrations/002_seed_categories.sql | Create |
| supabase/migrations/003_storage.sql         | Create |
| src/integrations/supabase/client.ts         | Create |
| src/integrations/supabase/types.ts          | Create |
| src/context/AuthContext.tsx                  | Create |
| src/pages/LoginPage.tsx                     | Create |
| src/pages/SignupPage.tsx                    | Create |
| src/pages/ForgotPasswordPage.tsx            | Create |
| src/hooks/useCategories.ts                  | Create |
| src/hooks/useListings.ts                    | Update |
| src/hooks/useProfile.ts                     | Create |
| src/App.tsx                                 | Update |
| src/main.tsx                                | Update |
| src/components/layout/Header.tsx            | Update |
| src/pages/DashboardPage.tsx                 | Update |
| src/pages/PostAdPage.tsx                    | Update |
| src/pages/PricingPage.tsx                   | Update |
| src/pages/Index.tsx                         | Update |
| src/pages/SearchPage.tsx                    | Update |
| src/pages/ListingPage.tsx                   | Update |
| src/pages/CategoryPage.tsx                  | Update |
| src/components/home/FeaturedListings.tsx     | Update |
| src/components/home/RecentListings.tsx       | Update |
| src/components/home/CategoriesSection.tsx    | Update |
| src/data/mockData.ts                        | Delete |
+---------------------------------------------+--------+
```

### Implementation Order

1. Connect Supabase (prerequisite)
2. Database migrations (schema + seed + storage)
3. Supabase client + types
4. Auth context + auth pages
5. Wire LocalizationProvider + i18n into App.tsx
6. Update Header (auth + localization)
7. Update PostAdPage (real submissions + LocationSelector)
8. Update Dashboard (real data + profile management)
9. Update listing/search/category pages (real queries)
10. Update homepage sections (real queries)
11. Update PricingPage (localized pricing)
12. Remove mock data
13. Final build verification

