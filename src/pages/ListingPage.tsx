import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Flag,
  MapPin,
  Clock,
  Eye,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Star,
  Shield,
  Calendar,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ListingCard } from '@/components/listings/ListingCard';
import { mockListings } from '@/data/mockData';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function ListingPage() {
  const { slug } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [showPhone, setShowPhone] = useState(false);

  const listing = mockListings.find((l) => l.slug === slug);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Listing Not Found</h1>
            <p className="text-muted-foreground mb-4">This listing may have been removed or doesn't exist.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedListings = mockListings
    .filter((l) => l.category.id === listing.category.id && l.id !== listing.id)
    .slice(0, 4);

  const formatPrice = () => {
    if (listing.priceType === 'free') return 'Free';
    if (listing.priceType === 'contact') return 'Contact for price';
    if (listing.priceType === 'range' && listing.priceRange) {
      return `${listing.currency} ${listing.priceRange.min.toLocaleString()} - ${listing.priceRange.max.toLocaleString()}`;
    }
    if (listing.price) {
      const formatted = `${listing.currency} ${listing.price.toLocaleString()}`;
      return listing.priceType === 'negotiable' ? formatted : formatted;
    }
    return 'Contact for price';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="page-container py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to={`/category/${listing.category.slug}`} className="hover:text-primary">
                {listing.category.name}
              </Link>
              {listing.subcategory && (
                <>
                  <span>/</span>
                  <Link
                    to={`/category/${listing.category.slug}/${listing.subcategory.slug}`}
                    className="hover:text-primary"
                  >
                    {listing.subcategory.name}
                  </Link>
                </>
              )}
              <span>/</span>
              <span className="text-foreground truncate">{listing.title}</span>
            </nav>
          </div>
        </div>

        <div className="page-container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="relative aspect-[4/3] bg-muted">
                  <img
                    src={listing.images[currentImage]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />

                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImage((prev) =>
                            prev === 0 ? listing.images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImage((prev) =>
                            prev === listing.images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-sm">
                    {currentImage + 1} / {listing.images.length}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {listing.featured && <span className="badge-premium">Featured</span>}
                    {listing.urgent && <span className="badge-urgent">Urgent</span>}
                  </div>
                </div>

                {/* Thumbnails */}
                {listing.images.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {listing.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={cn(
                          'w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors',
                          currentImage === index ? 'border-primary' : 'border-transparent'
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Price */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {listing.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {listing.location.city}, {listing.location.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDistanceToNow(listing.createdAt, { addSuffix: true })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {listing.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-3xl font-bold text-primary">{formatPrice()}</p>
                  {listing.priceType === 'negotiable' && (
                    <span className="text-sm text-muted-foreground">Price is negotiable</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{listing.description}</p>
              </div>

              {/* Attributes */}
              {Object.keys(listing.attributes).length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(listing.attributes).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="font-medium text-foreground">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Map Placeholder */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Location</h2>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      {listing.location.area && `${listing.location.area}, `}
                      {listing.location.city}, {listing.location.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Report */}
              <div className="flex items-center justify-center">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                  <Flag className="w-4 h-4" />
                  Report this listing
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Seller Card */}
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={listing.seller.avatar}
                    alt={listing.seller.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{listing.seller.name}</h3>
                      {listing.seller.verified === 'verified' && (
                        <BadgeCheck className="w-5 h-5 text-info" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Member since {format(listing.seller.createdAt, 'MMM yyyy')}
                    </p>
                  </div>
                </div>

                {/* Seller Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-lg font-bold text-foreground">
                      {listing.seller.stats.totalListings}
                    </p>
                    <p className="text-xs text-muted-foreground">Listings</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-lg font-bold text-foreground">
                      {listing.seller.stats.responseRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">Response Rate</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Button className="w-full btn-primary gap-2" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    Send Message
                  </Button>

                  {listing.seller.phone && (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      size="lg"
                      onClick={() => setShowPhone(!showPhone)}
                    >
                      <Phone className="w-5 h-5" />
                      {showPhone ? listing.seller.phone : 'Show Phone Number'}
                    </Button>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  {listing.seller.verified === 'verified' && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-info-light flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 text-info" />
                      </div>
                      <span className="text-muted-foreground">Verified Seller</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center">
                      <Shield className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-muted-foreground">Secure Messaging</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-warning-light flex items-center justify-center">
                      <Star className="w-4 h-4 text-warning" />
                    </div>
                    <span className="text-muted-foreground">Top Rated Seller</span>
                  </div>
                </div>

                {/* View Profile */}
                <Link to={`/seller/${listing.seller.id}`}>
                  <Button variant="ghost" className="w-full mt-4">
                    View Seller Profile
                  </Button>
                </Link>
              </div>

              {/* Safety Tips */}
              <div className="bg-warning-light rounded-2xl p-5">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-warning" />
                  Safety Tips
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Meet in public places</li>
                  <li>• Don't pay in advance</li>
                  <li>• Verify the item before paying</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Listings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
