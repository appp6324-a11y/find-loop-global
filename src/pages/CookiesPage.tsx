import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ReportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Report an Issue
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Help us keep FindLoop safe by reporting suspicious activity,
              listings, or users.
            </p>
          </div>
        </section>

        {/* Report form */}
        <section className="page-container py-14 max-w-2xl">
          <form
            className="space-y-6 p-6 rounded-2xl border bg-card"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Listing or User URL (optional)
              </label>
              <Input placeholder="Paste the link here" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Describe the issue
              </label>
              <Textarea
                placeholder="Explain what seems wrong or suspicious…"
                rows={5}
              />
            </div>

            <Button className="btn-primary w-full">
              Submit Report
            </Button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
