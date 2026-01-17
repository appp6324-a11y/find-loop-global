import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started for free. Upgrade only when you need more visibility.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="page-container py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Plan
            title="Free"
            price="₹0"
            description="Perfect for getting started"
            features={[
              "Browse all listings",
              "Post up to 1 active ad",
              "Basic visibility",
            ]}
            action={
              <Button asChild variant="outline">
                <Link to="/post-ad">Post Free Ad</Link>
              </Button>
            }
          />

          <Plan
            title="Standard"
            price="₹499"
            highlight
            description="Best for individuals & small businesses"
            features={[
              "Post up to 5 active ads",
              "Higher search visibility",
              "Priority support",
            ]}
            action={
              <Button asChild className="btn-primary">
                <Link to="/post-ad">Choose Standard</Link>
              </Button>
            }
          />

          <Plan
            title="Premium"
            price="₹1,499"
            description="Maximum exposure and trust"
            features={[
              "Unlimited active ads",
              "Featured placement",
              "Verified badge",
              "Top priority support",
            ]}
            action={
              <Button asChild variant="outline">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            }
          />
        </section>

        {/* CTA */}
        <section className="bg-muted/40 py-16">
          <div className="page-container text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Not sure which plan is right?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start free — you can upgrade anytime.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/help">Get Help</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Plan({
  title,
  price,
  description,
  features,
  action,
  highlight,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  action: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 bg-card flex flex-col ${
        highlight ? "ring-2 ring-primary" : ""
      }`}
    >
      <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>

      <div className="text-3xl font-bold text-foreground mb-6">{price}</div>

      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">{action}</div>
    </div>
  );
}
