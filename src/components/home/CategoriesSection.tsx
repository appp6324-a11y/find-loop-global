import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CategoryCard } from '@/components/listings/CategoryCard';
import { categories } from '@/data/mockData';

export function CategoriesSection() {
  return (
    <section className="section bg-background">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Browse Categories</h2>
            <p className="text-muted-foreground mt-1">Explore listings across all categories</p>
          </div>
          <Link
            to="/categories"
            className="hidden sm:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <Link
          to="/categories"
          className="sm:hidden flex items-center justify-center gap-1 mt-6 text-primary font-medium"
        >
          View all categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
