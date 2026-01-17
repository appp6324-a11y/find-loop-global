import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryCard } from '@/components/listings/CategoryCard';
import { ListingCard } from '@/components/listings/ListingCard';
import { categories, mockListings } from '@/data/mockData';

export default function CategoryPage() {
  const { slug, subslug } = useParams();

  const category = categories.find((c) => c.slug === slug);
  const subcategory = subslug
    ? category?.subcategories?.find((s) => s.slug === subslug)
    : null;

  const categoryListings = mockListings.filter((l) => {
    if (subslug) {
      return l.subcategory?.slug === subslug;
    }
    return l.category.slug === slug;
  });

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Category Not Found</h1>
            <Link to="/" className="text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Category Header */}
        <div className="bg-gradient-to-br from-primary-light to-background py-12">
          <div className="page-container">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/categories" className="hover:text-primary">Categories</Link>
              <span>/</span>
              {subcategory ? (
                <>
                  <Link to={`/category/${category.slug}`} className="hover:text-primary">
                    {category.name}
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{subcategory.name}</span>
                </>
              ) : (
                <span className="text-foreground">{category.name}</span>
              )}
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {subcategory ? subcategory.name : category.name}
            </h1>
            <p className="text-muted-foreground">
              {categoryListings.length.toLocaleString()} listings available
            </p>
          </div>
        </div>

        <div className="page-container py-8">
          {/* Subcategories */}
          {!subcategory && category.subcategories && category.subcategories.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-4">Subcategories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/category/${category.slug}/${sub.slug}`}
                    className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium text-foreground">{sub.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sub.listingCount?.toLocaleString() || '0'} ads
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Listings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {subcategory ? `${subcategory.name} Listings` : 'All Listings'}
              </h2>
              <Link
                to={`/search?category=${subcategory?.slug || category.slug}`}
                className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {categoryListings.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-2">No listings yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to post in this category!
                </p>
                <Link to="/post-ad">
                  <button className="btn-primary px-6 py-2 rounded-lg bg-primary text-primary-foreground">
                    Post an Ad
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
