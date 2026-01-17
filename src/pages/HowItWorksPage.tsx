import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, Search, MessageSquare, Shield } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How FindLoop Works
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent way to discover opportunities, post listings,
              and connect with confidence.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="page-container py-14">
          <div className="grid gap-8 md:grid-cols-3">
            <Step
              icon={<Search className="h-6 w-6" />}
              title="Browse & Search"
              description="Explore categories or search listings that match exactly what you’re looking for."
            />
            <Step
              icon={<MessageSquare className="h-6 w-6" />}
              title="Connect Directly"
              description="Chat with verified users directly — no middlemen, no hidden fees."
            />
            <Step
              icon={<CheckCircle className="h-6 w-6" />}
              title="Close with Confidence"
              description="Review details, agree transparently, and move forward with trust."
            />
          </div>
        </section>

        {/* Trust */}
        <section className="bg-muted/40 py-14">
          <div className="page-container grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Built on Trust & Safety
              </h2>
              <p className="text-muted-foreground mb-4">
                We prioritize user safety with reporting tools, moderation, and
                transparent policies.
              </p>
              <Button asChild variant="outline">
                <Link to="/safety">Learn about safety</Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-2xl border bg-card">
              <Shield className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">
                  Community-first platform
                </h3>
                <p className="text-sm text-muted-foreground">
                  Designed to reduce spam and promote genuine connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="page-container py-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Ready to get started?
          </h2>
          <div className="flex justify-center gap-4">
            <Button asChild className="btn-primary">
              <Link to="/search">Browse Listings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/post-ad">Post an Ad</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border bg-card text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
