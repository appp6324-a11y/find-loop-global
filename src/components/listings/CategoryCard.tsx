import { Link } from 'react-router-dom';
import {
  Briefcase,
  Wrench,
  ShoppingBag,
  Building2,
  Car,
  Globe,
  Users,
  LucideIcon,
} from 'lucide-react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'compact' | 'icon-only';
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Wrench,
  ShoppingBag,
  Building2,
  Car,
  Globe,
  Users,
};

export function CategoryCard({ category, variant = 'default', className }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || ShoppingBag;

  if (variant === 'icon-only') {
    return (
      <Link
        to={`/category/${category.slug}`}
        className={cn(
          'flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors group',
          className
        )}
      >
        <div className="category-icon group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-center line-clamp-1">{category.name}</span>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        to={`/category/${category.slug}`}
        className={cn(
          'flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all bg-card group',
          className
        )}
      >
        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.listingCount.toLocaleString()} ads</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/category/${category.slug}`}
      className={cn('category-card group', className)}
    >
      <div className="category-icon group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="w-7 h-7" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {category.listingCount.toLocaleString()} ads
        </p>
      </div>
    </Link>
  );
}
