import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";
import { useRouter } from "next/router";

export default function PostAdPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGet<any[]>("/api/categories").then(setCategories);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPost("/api/listings", {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: {
          slug: form.category
        },
        location: {
          country: "United States",
          countryCode: "US",
          city: "New York"
        }
      });

      router.push("/");
    } catch (err) {
      alert("Failed to post ad");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Post a New Ad</h1>

      <form onSubmit={submit} className="space-y-4">
        <select
          required
          className="w-full border rounded p-2"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map(c => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          required
          className="w-full border rounded p-2"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          required
          className="w-full border rounded p-2"
          placeholder="Description"
          rows={5}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          className="w-full border rounded p-2"
          placeholder="Price (optional)"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Posting..." : "Post Ad"}
        </button>
      </form>
    </div>
  );
}
