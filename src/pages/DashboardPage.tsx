import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Heart,
  Bell,
  Wallet,
  User,
  Settings,
  BadgeCheck,
  Plus,
  Eye,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ListingCard } from '@/components/listings/ListingCard';
import { currentUser, mockListings, mockNotifications } from '@/data/mockData';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: FileText, label: 'My Listings', href: '/dashboard/listings' },
  { icon: MessageCircle, label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: Heart, label: 'Favorites', href: '/dashboard/favorites' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 2 },
  { icon: Wallet, label: 'Payments', href: '/dashboard/payments' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardPage() {
  const location = useLocation();
  const userListings = mockListings.filter((l) => l.seller.id === currentUser.id);

  const stats = [
    {
      label: 'Active Listings',
      value: currentUser.stats.activeListings,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary-light',
    },
    {
      label: 'Total Views',
      value: currentUser.stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-info',
      bgColor: 'bg-info-light',
    },
    {
      label: 'Response Rate',
      value: `${currentUser.stats.responseRate}%`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success-light',
    },
    {
      label: 'Avg Response',
      value: currentUser.stats.avgResponseTime,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning-light',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        <div className="page-container py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 hidden lg:block">
              <div className="bg-card rounded-2xl border border-border p-4 sticky top-24">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 mb-4">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-foreground truncate">{currentUser.name}</h3>
                      {currentUser.verified === 'verified' && (
                        <BadgeCheck className="w-4 h-4 text-info shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {currentUser.subscription?.plan} plan
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                        location.pathname === link.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                      {link.badge && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Post Ad CTA */}
                <div className="mt-6 pt-6 border-t border-border">
                  <Link to="/post-ad">
                    <Button className="w-full btn-primary gap-2">
                      <Plus className="w-4 h-4" />
                      Post New Ad
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Overview Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card rounded-xl border border-border p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.bgColor)}>
                        <stat.icon className={cn('w-5 h-5', stat.color)} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Listings */}
              <div className="bg-card rounded-2xl border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">My Listings</h2>
                  <Link to="/dashboard/listings" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="p-6">
                  {userListings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">No listings yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start selling by posting your first ad
                      </p>
                      <Link to="/post-ad">
                        <Button className="btn-primary">Post Your First Ad</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userListings.slice(0, 4).map((listing) => (
                        <ListingCard key={listing.id} listing={listing} variant="horizontal" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-card rounded-2xl border border-border mt-6">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Recent Notifications</h2>
                  <Link to="/dashboard/notifications" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {mockNotifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'p-4 flex items-start gap-3',
                        !notification.read && 'bg-primary-light/50'
                      )}
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                          notification.type === 'message'
                            ? 'bg-info-light'
                            : notification.type === 'listing'
                            ? 'bg-success-light'
                            : 'bg-muted'
                        )}
                      >
                        {notification.type === 'message' ? (
                          <MessageCircle className="w-5 h-5 text-info" />
                        ) : notification.type === 'listing' ? (
                          <Eye className="w-5 h-5 text-success" />
                        ) : (
                          <Bell className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
