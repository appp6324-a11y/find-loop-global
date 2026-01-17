import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ListingCard } from '@/components/listings/ListingCard';
import { mockListings } from '@/data/mockData';

export function FeaturedListings() {
  const featuredListings = mockListings.filter((l) => l.featured);

  return (
    <section className="section bg-muted/30">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-premium-light flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-premium" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Listings</h2>
              <p className="text-muted-foreground mt-0.5">Premium listings from verified sellers</p>
            </div>
          </div>
          <Link
            to="/search?featured=true"
            className="hidden sm:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing, index) => (
            <div
              key={listing.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <Link
          to="/search?featured=true"
          className="sm:hidden flex items-center justify-center gap-1 mt-6 text-primary font-medium"
        >
          View all featured
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
