import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, X, ChevronDown, Grid, List, BadgeCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { categories, mockListings } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  // Filter listings
  const filteredListings = useMemo(() => {
    let results = [...mockListings];

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.category.name.toLowerCase().includes(q)
      );
    }

    if (location) {
      results = results.filter((l) =>
        l.location.city.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (category) {
      results = results.filter(
        (l) =>
          l.category.slug === category || l.subcategory?.slug === category
      );
    }

    if (verifiedOnly) {
      results = results.filter((l) => l.seller.verified === 'verified');
    }

    if (priceMin) {
      results = results.filter((l) => l.price && l.price >= Number(priceMin));
    }

    if (priceMax) {
      results = results.filter((l) => l.price && l.price <= Number(priceMax));
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        results.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'price_low':
        results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_high':
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popular':
        results.sort((a, b) => b.views - a.views);
        break;
      default:
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return results;
  }, [query, location, category, sortBy, verifiedOnly, priceMin, priceMax]);

  const updateSort = (value: string) => {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-card border-b border-border py-6">
          <div className="page-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {query ? `Results for "${query}"` : 'All Listings'}
                </h1>
                <p className="text-muted-foreground">
                  {filteredListings.length} results found
                  {location && ` in ${location}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => updateSort(e.target.value)}
                  className="form-input py-2 px-4 pr-10"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>

                {/* View Toggle */}
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
                    )}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Filters Toggle */}
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside
              className={cn(
                'w-72 shrink-0 space-y-6',
                showFilters ? 'block' : 'hidden lg:block'
              )}
            >
              {/* Categories */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/search?category=${cat.slug}`}
                        className={cn(
                          'flex items-center justify-between p-2 rounded-lg transition-colors',
                          category === cat.slug
                            ? 'bg-primary-light text-primary font-medium'
                            : 'hover:bg-muted'
                        )}
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {cat.listingCount.toLocaleString()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="form-input py-2 text-sm"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="form-input py-2 text-sm"
                  />
                </div>
              </div>

              {/* Verified Sellers */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Seller Type</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={verifiedOnly}
                    onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                  />
                  <span className="flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4 text-info" />
                    Verified Sellers Only
                  </span>
                </label>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceMin('');
                  setPriceMax('');
                  setVerifiedOnly(false);
                  setSearchParams({});
                }}
              >
                Clear All Filters
              </Button>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {filteredListings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Link to="/">
                    <Button>Browse All Listings</Button>
                  </Link>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} variant="horizontal" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
