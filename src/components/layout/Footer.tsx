import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { categories, popularLocations } from '@/data/mockData';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold">HireLoop</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              The global marketplace for jobs, services, products, and more. Connect with millions of buyers and sellers worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`} className="text-muted-foreground hover:text-background transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h4 className="font-semibold mb-4">Popular Locations</h4>
            <ul className="space-y-2 text-sm">
              {popularLocations[0].cities.map((city) => (
                <li key={city}>
                  <Link to={`/search?location=${city}`} className="text-muted-foreground hover:text-background transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-background transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-muted-foreground hover:text-background transition-colors">
                  Report a Problem
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>123 Market Street, San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:hello@hireloop.com" className="hover:text-background transition-colors">
                  hello@hireloop.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+1234567890" className="hover:text-background transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted/20">
        <div className="page-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 HireLoop. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-background transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
