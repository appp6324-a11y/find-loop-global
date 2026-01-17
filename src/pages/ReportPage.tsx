import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const reportReasons = [
  { id: 'spam', label: 'Spam or misleading', description: 'Fake listing or misleading information' },
  { id: 'scam', label: 'Scam or fraud', description: 'Attempting to defraud users' },
  { id: 'inappropriate', label: 'Inappropriate content', description: 'Offensive or adult content' },
  { id: 'prohibited', label: 'Prohibited item', description: 'Item not allowed on HireLoop' },
  { id: 'duplicate', label: 'Duplicate listing', description: 'Same listing posted multiple times' },
  { id: 'other', label: 'Other', description: 'Something else not listed above' },
];

const ReportPage = () => {
  const [reason, setReason] = useState('');
  const [listingUrl, setListingUrl] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Report Submitted</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for helping keep HireLoop safe. Our team will review your report within 24-48 hours.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-card rounded-xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Report a Listing</h1>
                <p className="text-muted-foreground">Help us keep HireLoop safe and trustworthy</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="listing-url">Listing URL (optional)</Label>
                <Input
                  id="listing-url"
                  type="url"
                  placeholder="https://hireloop.com/listing/..."
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Reason for reporting *</Label>
                <RadioGroup value={reason} onValueChange={setReason}>
                  {reportReasons.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={item.id} id={item.id} className="mt-0.5" />
                      <Label htmlFor={item.id} className="cursor-pointer flex-1">
                        <span className="font-medium text-foreground">{item.label}</span>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional details *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide any additional information that will help us investigate..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> False reports may result in account suspension. Please only report genuine violations of our community guidelines.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={!reason || !description}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportPage;
