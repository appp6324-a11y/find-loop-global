import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Have a question, feedback, or issue? Reach out and we’ll get back to you.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="page-container py-14 max-w-2xl">
          <form
            className="space-y-6 p-6 rounded-2xl border bg-card"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input placeholder="Your name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                placeholder="Tell us how we can help…"
                rows={5}
              />
            </div>

            <Button className="btn-primary w-full">
              Send Message
            </Button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
