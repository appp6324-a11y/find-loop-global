import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-16">
          <div className="page-container">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Quick answers to common questions about using FindLoop.
            </p>
          </div>
        </section>

        {/* FAQ content */}
        <section className="page-container py-14 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            <FaqItem
              value="item-1"
              question="Is FindLoop free to use?"
              answer="Yes. Browsing listings and posting basic ads is free. Optional paid plans offer additional visibility."
            />
            <FaqItem
              value="item-2"
              question="How do I post an ad?"
              answer="Sign in, click “Post Ad”, fill in the details, and publish. Your listing will be visible immediately."
            />
            <FaqItem
              value="item-3"
              question="How do I contact another user?"
              answer="Open a listing and use the message option to contact the seller directly through the platform."
            />
            <FaqItem
              value="item-4"
              question="How do I report suspicious activity?"
              answer="Use the report option on the listing or visit the Report page to notify our moderation team."
            />
            <FaqItem
              value="item-5"
              question="Is my personal information safe?"
              answer="Yes. We do not share personal details publicly and actively monitor the platform for abuse."
            />
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FaqItem({
  value,
  question,
  answer,
}: {
  value: string;
  question: string;
  answer: string;
}) {
  return (
    <AccordionItem value={value} className="border rounded-xl px-4">
      <AccordionTrigger className="text-left font-medium">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
