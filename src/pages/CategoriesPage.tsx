import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryCard } from "@/components/listings/CategoryCard";
import { categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-gradient-to-br from-primary-light to-background py-14">
          <div className="page-container">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link> / Categories
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Categories
            </h1>
            <p className="text-muted-foreground mt-2">
              Browse listings by category.
            </p>
          </div>
        </section>

        {/* Categories grid */}
        <section className="page-container py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              All Categories
            </h2>

            <Button asChild className="btn-primary hidden sm:inline-flex">
              <Link to="/post-ad">Post an Ad</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
