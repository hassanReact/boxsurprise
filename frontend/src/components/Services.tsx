import React from 'react';
import { Wallet, Users, BarChart3, Shield, Gift, HeartHandshake, DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceItem {
  icon: typeof LucideIcon;
  title: string;
  description: string;
}

interface ServiceCardProps extends ServiceItem {
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <div 
      className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'backwards'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/10 group-hover:to-purple-500/5 transition-all duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
          <Icon className="w-10 h-10 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      icon: Wallet,
      title: "Secure Payments",
      description: "Instant and secure payment processing with multiple withdrawal options for your earnings."
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Build and manage your downline effectively with our advanced team management tools."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track your network growth and earnings with comprehensive real-time statistics."
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Advanced security measures to protect your account and investments 24/7."
    },
    {
      icon: Gift,
      title: "Bonus Rewards",
      description: "Earn attractive bonuses and rewards through our multi-level marketing structure."
    },
    {
      icon: HeartHandshake,
      title: "Support System",
      description: "24/7 dedicated support to help you succeed in your MLM journey."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of MLM services designed to help you build and grow your network marketing business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;