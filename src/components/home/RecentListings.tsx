import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { ListingCard } from '@/components/listings/ListingCard';
import { mockListings } from '@/data/mockData';

export function RecentListings() {
  const recentListings = [...mockListings].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <section className="section bg-background">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
              <Clock className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Recently Posted</h2>
              <p className="text-muted-foreground mt-0.5">Fresh listings just for you</p>
            </div>
          </div>
          <Link
            to="/search?sort=newest"
            className="hidden sm:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentListings.slice(0, 4).map((listing, index) => (
            <div
              key={listing.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* View More Row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentListings.slice(4, 6).map((listing, index) => (
            <div
              key={listing.id}
              className="animate-fade-in"
              style={{ animationDelay: `${(4 + index) * 0.1}s` }}
            >
              <ListingCard listing={listing} variant="horizontal" />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <Link
          to="/search?sort=newest"
          className="sm:hidden flex items-center justify-center gap-1 mt-6 text-primary font-medium"
        >
          View all recent
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
