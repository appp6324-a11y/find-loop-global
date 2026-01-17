import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Messages
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              View and manage your conversations with other users.
            </p>
          </div>
        </section>

        {/* Empty state */}
        <section className="page-container py-20">
          <div className="mx-auto max-w-md text-center p-8 rounded-2xl border bg-card">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h2 className="text-lg font-semibold text-foreground mb-2">
              No messages yet
            </h2>
            <p className="text-muted-foreground text-sm">
              When you contact a seller or receive messages, they will appear
              here.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
