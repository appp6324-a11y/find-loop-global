import express from "express";
import cors from "cors";

import { categories, listings, users, currentUser } from "./seed.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

// ---- helpers ----
function safeJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  // Dummy auth: "Bearer demo-token"
  if (auth === "Bearer demo-token") return next();
  return res.status(401).json({ error: "Unauthorized" });
}

// ---- health ----
app.get("/api/health", (req, res) => {
  res.json({ ok: true, name: "hireloop-server", time: new Date().toISOString() });
});

// ---- categories ----
app.get("/api/categories", (req, res) => {
  res.json(safeJson(categories));
});

// ---- listings ----
// supports basic query params: q, category, subcategory, city, countryCode
app.get("/api/listings", (req, res) => {
  const { q, category, subcategory, city, countryCode } = req.query;

  let result = [...listings];

  if (q) {
    const needle = String(q).toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(needle) ||
        l.description.toLowerCase().includes(needle)
    );
  }

  if (category) {
    result = result.filter((l) => l.category?.slug === String(category));
  }

  if (subcategory) {
    result = result.filter((l) => l.subcategory?.slug === String(subcategory));
  }

  if (city) {
    result = result.filter((l) => (l.location?.city || "").toLowerCase() === String(city).toLowerCase());
  }

  if (countryCode) {
    result = result.filter((l) => (l.location?.countryCode || "").toUpperCase() === String(countryCode).toUpperCase());
  }

  // simple sorting newest-first by createdAt if present
  result.sort((a, b) => {
    const ad = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bd = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bd - ad;
  });

  res.json(safeJson(result));
});

app.get("/api/listings/:id", (req, res) => {
  const listing = listings.find((l) => l.id === req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  res.json(safeJson(listing));
});

// Create listing (dummy). Requires demo auth.
app.post("/api/listings", requireAuth, (req, res) => {
  const body = req.body || {};
  if (!body.title || !body.category?.slug) {
    return res.status(400).json({ error: "Missing required fields: title, category.slug" });
  }

  const newListing = {
    id: `listing-${Date.now()}`,
    title: String(body.title),
    slug: String(body.slug || String(body.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")),
    description: String(body.description || ""),
    price: body.price ?? null,
    currency: body.currency ?? "USD",
    priceType: body.priceType ?? "fixed",
    category: body.category,
    subcategory: body.subcategory ?? null,
    location: body.location ?? { country: "Unknown", countryCode: "XX", city: "Unknown" },
    images: Array.isArray(body.images) ? body.images.slice(0, 10) : [],
    sellerId: currentUser.id,
    createdAt: new Date().toISOString(),
    status: "active"
  };

  listings.unshift(newListing);
  res.status(201).json(safeJson(newListing));
});

// ---- auth (dummy) ----
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body || {};
  const found = users.find((u) => u.email === email) || currentUser;

  // always return same token for now
  res.json({
    token: "demo-token",
    user: safeJson(found)
  });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json(safeJson(currentUser));
});

// ---- server start ----
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`[hireloop-server] running on http://localhost:${PORT}`);
});
