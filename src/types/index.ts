// HireLoop Type Definitions

export type UserRole = 'buyer' | 'seller' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified';

export type ListingStatus = 'draft' | 'pending' | 'active' | 'expired' | 'suspended' | 'sold';

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  verified: VerificationStatus;
  phone?: string;
  location?: Location;
  createdAt: Date;
  subscription?: Subscription;
  stats: UserStats;
}

export interface UserStats {
  totalListings: number;
  activeListings: number;
  totalViews: number;
  responseRate: number;
  avgResponseTime: string;
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  plan: 'free' | 'basic' | 'premium' | 'business';
  trialEndsAt?: Date;
  expiresAt?: Date;
  features: string[];
}

export interface Location {
  country: string;
  countryCode: string;
  city: string;
  area?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  parentId?: string;
  subcategories?: Category[];
  customFields?: CustomField[];
  listingCount: number;
}

export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean' | 'date' | 'range';
  options?: string[];
  required: boolean;
  filterable: boolean;
  unit?: string;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  description: string;
  price?: number;
  currency: string;
  priceType: 'fixed' | 'negotiable' | 'free' | 'contact' | 'range';
  priceRange?: { min: number; max: number };
  category: Category;
  subcategory?: Category;
  location: Location;
  images: string[];
  attributes: Record<string, any>;
  seller: User;
  status: ListingStatus;
  featured: boolean;
  urgent: boolean;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  boostedUntil?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: User[];
  listing?: Listing;
  lastMessage: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'listing' | 'system' | 'promotion';
  title: string;
  content: string;
  link?: string;
  read: boolean;
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'popular';
  verifiedOnly?: boolean;
  attributes?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
