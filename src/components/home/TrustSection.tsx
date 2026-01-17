import { Shield, MessageCircle, CreditCard, BadgeCheck, Lock, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function TrustSection() {
  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All transactions are protected with end-to-end encryption and fraud prevention.',
    },
    {
      icon: BadgeCheck,
      title: 'Verified Sellers',
      description: 'Look for the verified badge to ensure you\'re dealing with trusted sellers.',
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Chat directly with buyers and sellers through our secure messaging system.',
    },
    {
      icon: Lock,
      title: 'Privacy Protected',
      description: 'Your personal information is never shared without your consent.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Optional secure payment processing for peace of mind transactions.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our support team is always here to help with any questions or issues.',
    },
  ];

  return (
    <section className="section bg-primary text-primary-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="page-container relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Trade with Confidence</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            HireLoop provides a safe and trusted marketplace for millions of users worldwide.
            We've built-in protections to keep you safe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-primary-foreground/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/safety">
            <Button
              variant="secondary"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Learn More About Safety
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
