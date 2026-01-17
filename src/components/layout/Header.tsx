import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ChevronDown,
  Plus,
  MessageCircle,
  Bell,
  User,
  Menu,
  X,
  Heart,
  Settings,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('All Locations');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary/5 py-2 hidden md:block">
        <div className="page-container flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome to HireLoop</span>
            <span className="text-muted-foreground">•</span>
            <Link to="/how-it-works" className="nav-link text-sm">How it works</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/help" className="nav-link text-sm">Help & Support</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 nav-link text-sm">
                <span>🇺🇸</span> United States
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>🇺🇸 United States</DropdownMenuItem>
                <DropdownMenuItem>🇬🇧 United Kingdom</DropdownMenuItem>
                <DropdownMenuItem>🇩🇪 Germany</DropdownMenuItem>
                <DropdownMenuItem>🇨🇦 Canada</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="page-container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">HireLoop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl">
            <div className="search-container flex w-full items-center">
              <div className="flex items-center flex-1 px-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input flex-1 px-3 py-2"
                />
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center px-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="search-input px-3 py-2 appearance-none cursor-pointer"
                >
                  <option>All Locations</option>
                  <option>New York</option>
                  <option>Los Angeles</option>
                  <option>London</option>
                  <option>Berlin</option>
                </select>
                <ChevronDown className="w-4 h-4 text-muted-foreground -ml-2" />
              </div>
              <Button type="submit" className="btn-primary rounded-xl px-6">
                Search
              </Button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Messages */}
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                  3
                </Badge>
              </Button>
            </Link>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                    2
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b border-border">
                  <h4 className="font-semibold">Notifications</h4>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <span className="font-medium text-sm">New message from Sarah</span>
                    <span className="text-xs text-muted-foreground">About: iPhone 15 Pro Max</span>
                    <span className="text-xs text-muted-foreground">2 minutes ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <span className="font-medium text-sm">Listing reached 500 views!</span>
                    <span className="text-xs text-muted-foreground">iPhone 15 Pro Max</span>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </DropdownMenuItem>
                </div>
                <div className="p-2 border-t border-border">
                  <Link to="/notifications" className="text-sm text-primary hover:underline block text-center">
                    View all notifications
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-3 border-b border-border">
                  <p className="font-semibold">John Smith</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/listings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    My Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/favorites" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="w-4 h-4" />
                    Saved Items
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Post Ad Button */}
            <Link to="/post-ad">
              <Button className="btn-primary gap-2 hidden sm:flex">
                <Plus className="w-4 h-4" />
                Post Ad
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="lg:hidden mt-4">
          <div className="search-container flex items-center">
            <Search className="w-5 h-5 text-muted-foreground ml-3" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input flex-1 px-3 py-2"
            />
            <Button type="submit" size="sm" className="btn-primary rounded-lg mr-1">
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Categories Bar - Desktop */}
      <nav className="border-t border-border hidden lg:block">
        <div className="page-container">
          <ul className="flex items-center gap-1 py-2 overflow-x-auto hide-scrollbar">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1 font-medium">
                    <Menu className="w-4 h-4" />
                    All Categories
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {categories.map((cat) => (
                    <DropdownMenuItem key={cat.id} asChild>
                      <Link to={`/category/${cat.slug}`} className="flex items-center gap-2">
                        {cat.name}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {cat.listingCount.toLocaleString()}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {categories.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.slug}`}
                  className="px-3 py-2 rounded-lg nav-link hover:bg-muted transition-colors inline-block"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-slide-down">
          <nav className="page-container py-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.listingCount.toLocaleString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border">
              <Link to="/post-ad" onClick={() => setMobileMenuOpen(false)}>
                <Button className="btn-primary w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Post Ad
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
