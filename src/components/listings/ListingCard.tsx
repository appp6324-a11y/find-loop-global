import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Eye, BadgeCheck, Sparkles, Zap } from 'lucide-react';
import { Listing } from '@/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ListingCardProps {
  listing: Listing;
  variant?: 'default' | 'horizontal' | 'compact';
  className?: string;
}

export function ListingCard({ listing, variant = 'default', className }: ListingCardProps) {
  const formatPrice = () => {
    if (listing.priceType === 'free') return 'Free';
    if (listing.priceType === 'contact') return 'Contact for price';
    if (listing.priceType === 'range' && listing.priceRange) {
      return `${listing.currency} ${listing.priceRange.min.toLocaleString()} - ${listing.priceRange.max.toLocaleString()}`;
    }
    if (listing.price) {
      const formatted = `${listing.currency} ${listing.price.toLocaleString()}`;
      return listing.priceType === 'negotiable' ? `${formatted} (Negotiable)` : formatted;
    }
    return 'Contact for price';
  };

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/listing/${listing.slug}`}
        className={cn(
          listing.featured ? 'card-featured' : 'card-listing',
          'flex gap-4 p-4 group',
          className
        )}
      >
        {/* Image */}
        <div className="relative w-40 h-32 shrink-0 rounded-lg overflow-hidden bg-muted">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {listing.featured && (
            <div className="absolute top-2 left-2 badge-premium">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {listing.title}
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault();
                // Toggle favorite
              }}
              className="p-2 rounded-full hover:bg-muted shrink-0"
            >
              <Heart className="w-5 h-5 text-muted-foreground hover:text-destructive" />
            </button>
          </div>

          <p className="text-lg font-bold text-primary mt-1">{formatPrice()}</p>

          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {listing.location.city}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDistanceToNow(listing.createdAt, { addSuffix: true })}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {listing.views.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {listing.seller.verified === 'verified' && (
              <span className="badge-verified">
                <BadgeCheck className="w-3 h-3" />
                Verified
              </span>
            )}
            {listing.urgent && (
              <span className="badge-urgent">
                <Zap className="w-3 h-3" />
                Urgent
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/listing/${listing.slug}`}
      className={cn(
        listing.featured ? 'card-featured' : 'card-listing',
        'flex flex-col group',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {listing.featured && (
            <span className="badge-premium shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {listing.urgent && (
            <span className="badge-urgent shadow-sm">
              <Zap className="w-3 h-3" />
              Urgent
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // Toggle favorite
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card shadow-sm transition-colors"
        >
          <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive" />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 rounded-md bg-card/90 backdrop-blur-sm text-xs font-medium">
            {listing.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {listing.title}
        </h3>

        <p className="text-lg font-bold text-primary">{formatPrice()}</p>

        <div className="flex items-center gap-2 mt-auto pt-3 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{listing.location.city}</span>
          <span className="ml-auto">
            {formatDistanceToNow(listing.createdAt, { addSuffix: true })}
          </span>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <img
            src={listing.seller.avatar}
            alt={listing.seller.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground truncate">{listing.seller.name}</span>
          {listing.seller.verified === 'verified' && (
            <BadgeCheck className="w-4 h-4 text-info shrink-0" />
          )}
        </div>
      </div>
    </Link>
  );
}
