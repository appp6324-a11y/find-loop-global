import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, AlertTriangle, UserCheck } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Safety & Trust
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Your safety matters. Follow these guidelines to stay protected
              while using FindLoop.
            </p>
          </div>
        </section>

        {/* Safety tips */}
        <section className="page-container py-14 grid gap-10 md:grid-cols-3">
          <SafetyCard
            icon={<UserCheck />}
            title="Verify users"
            description="Check profiles carefully and communicate through the platform whenever possible."
          />
          <SafetyCard
            icon={<AlertTriangle />}
            title="Avoid scams"
            description="Never share OTPs, passwords, or make payments outside trusted channels."
          />
          <SafetyCard
            icon={<ShieldCheck />}
            title="Report issues"
            description="If something feels wrong, report the listing or user immediately."
          />
        </section>

        {/* Closing */}
        <section className="bg-muted/40 py-16">
          <div className="page-container">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              We actively moderate listings
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Our team monitors reports and takes action against violations to
              keep the platform safe and trustworthy.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SafetyCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border bg-card">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
