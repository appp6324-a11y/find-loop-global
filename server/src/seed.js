// Dummy backend seed data.
// Keep this compatible with your frontend types as much as possible.

export const categories = [
  { id: "1", name: "Jobs & Hiring", slug: "jobs", icon: "Briefcase", listingCount: 15420 },
  { id: "2", name: "Services", slug: "services", icon: "Wrench", listingCount: 12350 },
  { id: "3", name: "For Sale", slug: "for-sale", icon: "ShoppingBag", listingCount: 45670 },
  { id: "4", name: "Property", slug: "property", icon: "Building2", listingCount: 8920 },
  { id: "5", name: "Vehicles", slug: "vehicles", icon: "Car", listingCount: 23450 },
  { id: "6", name: "Digital & Online", slug: "digital", icon: "Globe", listingCount: 6780 },
  { id: "7", name: "Community", slug: "community", icon: "Users", listingCount: 4230 }
];

export const users = [
  {
    id: "user-1",
    email: "john@example.com",
    name: "John Smith",
    role: "seller",
    verified: "verified",
    createdAt: "2023-01-15T00:00:00.000Z",
    location: { country: "United States", countryCode: "US", city: "New York" },
    subscription: {
      status: "trial",
      plan: "basic",
      // 1-month free trial concept
      trialEndsAt: "2026-02-16T00:00:00.000Z"
    }
  }
];

export const currentUser = users[0];

export const listings = [
  {
    id: "listing-1",
    title: "Senior Full-Stack Developer - Remote",
    slug: "senior-full-stack-developer-remote",
    description: "Remote role. React + Node. Competitive salary.",
    price: 120000,
    currency: "USD",
    priceType: "fixed",
    category: { id: "1", name: "Jobs & Hiring", slug: "jobs" },
    subcategory: { id: "1-3", name: "Remote", slug: "remote" },
    location: { country: "United States", countryCode: "US", city: "Remote" },
    images: [],
    sellerId: "user-1",
    createdAt: "2026-01-10T10:00:00.000Z",
    status: "active"
  },
  {
    id: "listing-2",
    title: "iPhone 14 Pro Max - Excellent Condition",
    slug: "iphone-14-pro-max-excellent-condition",
    description: "Unlocked. Battery 92%. With box.",
    price: 899,
    currency: "USD",
    priceType: "fixed",
    category: { id: "3", name: "For Sale", slug: "for-sale" },
    subcategory: { id: "3-1", name: "Electronics", slug: "electronics" },
    location: { country: "United States", countryCode: "US", city: "New York" },
    images: [],
    sellerId: "user-1",
    createdAt: "2026-01-12T10:00:00.000Z",
    status: "active"
  }
];
