import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { LifeBuoy, FileText, Shield, MessageSquare } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Help & Support
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers, learn how things work, and get help when you need it.
            </p>
          </div>
        </section>

        {/* Help options */}
        <section className="page-container py-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <HelpCard
            icon={<FileText />}
            title="How it works"
            description="Learn how to browse, post ads, and connect."
            to="/how-it-works"
          />
          <HelpCard
            icon={<Shield />}
            title="Safety tips"
            description="Stay safe while using the platform."
            to="/safety"
          />
          <HelpCard
            icon={<MessageSquare />}
            title="FAQs"
            description="Common questions answered."
            to="/faq"
          />
          <HelpCard
            icon={<LifeBuoy />}
            title="Contact support"
            description="Still need help? Reach out to us."
            to="/contact"
          />
        </section>

        {/* CTA */}
        <section className="bg-muted/40 py-16">
          <div className="page-container text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Need direct assistance?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function HelpCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="p-6 rounded-2xl border bg-card hover:border-primary transition-colors"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
