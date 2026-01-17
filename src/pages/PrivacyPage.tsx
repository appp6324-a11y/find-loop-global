import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              We respect your privacy and are committed to protecting your data.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="page-container py-14 max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide when creating an account,
              posting listings, or contacting support.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">How We Use Information</h2>
            <p className="text-muted-foreground">
              Data is used to operate the platform, improve services, and ensure
              safety and trust within the community.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
            <p className="text-muted-foreground">
              We implement reasonable security measures to protect your
              information from unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
            <p className="text-muted-foreground">
              Some features may rely on third-party services such as analytics
              or authentication providers.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
