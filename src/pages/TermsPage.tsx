import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              By using FindLoop, you agree to the following terms and conditions.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="page-container py-14 max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Use of Platform</h2>
            <p className="text-muted-foreground">
              Users must provide accurate information and comply with all
              applicable laws when using the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
            <p className="text-muted-foreground">
              You are responsible for the content you post and interactions you
              have with other users.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Prohibited Activities</h2>
            <p className="text-muted-foreground">
              Fraud, spam, misleading listings, or abusive behavior are strictly
              prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              FindLoop is not responsible for disputes between users or damages
              arising from use of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these terms periodically. Continued use of the
              platform indicates acceptance of the updated terms.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
