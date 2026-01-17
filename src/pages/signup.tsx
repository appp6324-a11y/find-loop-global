import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { apiPost } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // dummy signup → same as login for now
      const res = await apiPost("/api/auth-login", { email, password });

      localStorage.setItem("token", res.token);
      router.push("/");
    } catch {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create account
        </h1>

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border rounded p-2 mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
