import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="section bg-gradient-to-br from-background to-muted">
      <div className="page-container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Post Ad CTA */}
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
                <Plus className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Sell?</h3>
              <p className="text-muted-foreground mb-6">
                Post your first ad for free. Reach millions of potential buyers and get the best price for your items.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-success-light flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-success" />
                  </span>
                  Free to post
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-success-light flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-success" />
                  </span>
                  Reach millions of buyers
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-success-light flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-success" />
                  </span>
                  Sell in minutes
                </li>
              </ul>
              <Link to="/post-ad">
                <Button size="lg" className="btn-primary gap-2 w-full sm:w-auto">
                  <Plus className="w-5 h-5" />
                  Post Your Ad Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Seller Benefits */}
          <div className="bg-gradient-to-br from-premium/10 to-warning-light rounded-3xl p-8 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-premium/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-premium-light flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-premium" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Boost Your Sales</h3>
              <p className="text-muted-foreground mb-6">
                Upgrade to a premium account and get more visibility, priority support, and powerful seller tools.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-card/50 rounded-xl">
                  <span className="font-medium text-foreground">Basic</span>
                  <span className="text-muted-foreground">Free forever</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-card/50 rounded-xl border border-premium/30">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Premium</span>
                    <span className="badge-premium">Popular</span>
                  </div>
                  <span className="font-bold text-foreground">$9.99/mo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-card/50 rounded-xl">
                  <span className="font-medium text-foreground">Business</span>
                  <span className="font-bold text-foreground">$29.99/mo</span>
                </div>
              </div>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  View All Plans
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
