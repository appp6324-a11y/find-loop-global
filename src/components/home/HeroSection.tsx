import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, ArrowRight, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-accent py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="page-container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            Trusted by millions worldwide
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
            Find anything.
            <br />
            <span className="text-primary">Sell anything.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Jobs, services, products, property, and more. The global marketplace for everything you need.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-card rounded-2xl shadow-xl border border-border p-3 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search Input */}
                <div className="flex items-center flex-1 px-4 py-3 rounded-xl bg-muted/50">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Location */}
                <div className="flex items-center px-4 py-3 rounded-xl bg-muted/50 md:w-48">
                  <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 px-3 bg-transparent border-none focus:outline-none text-foreground appearance-none cursor-pointer"
                  >
                    <option value="">All Locations</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="London">London</option>
                    <option value="Berlin">Berlin</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>

                {/* Search Button */}
                <Button type="submit" size="lg" className="btn-primary px-8 rounded-xl">
                  <Search className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">Search</span>
                </Button>
              </div>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-sm text-muted-foreground">Popular:</span>
            {['Remote Jobs', 'iPhone', 'Apartments', 'Cars', 'Services'].map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                className="px-3 py-1 rounded-full bg-card border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Shield, title: 'Verified Sellers', desc: 'All premium sellers are verified' },
              { icon: Users, title: '10M+ Users', desc: 'Join our growing community' },
              { icon: Zap, title: 'Instant Connect', desc: 'Chat with sellers instantly' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
