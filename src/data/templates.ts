import { Template, TemplateCategory, LayoutType } from '../types';

export const templates: Template[] = [
  // Lead Generation Templates
  {
    id: 'modal-newsletter',
    name: 'Newsletter Signup',
    category: 'lead-generation',
    layout: 'modal',
    description: 'Clean newsletter subscription modal with email capture',
    previewUrl: '/previews/modal-newsletter.png',
    tags: ['email', 'newsletter', 'subscription'],
    content: {
      title: 'Stay in the loop',
      description: 'Get the latest updates and exclusive content delivered to your inbox.',
      buttonText: 'Subscribe Now',
      buttonLink: '#subscribe',
      imageUrl: 'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    style: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      textColor: '#1F2937',
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      fontSize: '16px'
    },
    display: {
      position: 'center',
      overlay: true,
      closeButton: true,
      width: '480px',
      height: 'auto'
    }
  },
  {
    id: 'modal-discount',
    name: 'Discount Offer',
    category: 'sales',
    layout: 'modal',
    description: 'Compelling discount popup to boost conversions',
    previewUrl: '/previews/modal-discount.png',
    tags: ['discount', 'sale', 'promotion'],
    content: {
      title: '20% OFF Everything!',
      description: 'Limited time offer. Use code SAVE20 at checkout.',
      buttonText: 'Shop Now',
      buttonLink: '#shop',
      imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    style: {
      primaryColor: '#EF4444',
      secondaryColor: '#DC2626',
      textColor: '#FFFFFF',
      backgroundColor: '#FEF2F2',
      borderRadius: 16,
      fontSize: '18px'
    },
    display: {
      position: 'center',
      overlay: true,
      closeButton: true,
      width: '520px',
      height: 'auto'
    }
  },
  {
    id: 'fullscreen-welcome',
    name: 'Welcome Screen',
    category: 'onboarding',
    layout: 'fullscreen',
    description: 'Immersive welcome experience for new users',
    previewUrl: '/previews/fullscreen-welcome.png',
    tags: ['welcome', 'onboarding', 'intro'],
    content: {
      title: 'Welcome to our platform!',
      description: 'Discover amazing features and start your journey with us today.',
      buttonText: 'Get Started',
      buttonLink: '#start',
      imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    style: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      textColor: '#FFFFFF',
      backgroundColor: '#1F2937',
      borderRadius: 0,
      fontSize: '24px'
    },
    display: {
      position: 'center',
      overlay: false,
      closeButton: true,
      width: '100%',
      height: '100vh'
    }
  },
  {
    id: 'topbar-promo',
    name: 'Promotional Banner',
    category: 'sales',
    layout: 'topbar',
    description: 'Eye-catching top banner for promotions',
    previewUrl: '/previews/topbar-promo.png',
    tags: ['banner', 'promotion', 'announcement'],
    content: {
      title: 'Free shipping on orders over $50!',
      description: 'Limited time offer',
      buttonText: 'Shop Now',
      buttonLink: '#shop',
      imageUrl: ''
    },
    style: {
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      textColor: '#FFFFFF',
      backgroundColor: '#10B981',
      borderRadius: 0,
      fontSize: '14px'
    },
    display: {
      position: 'top',
      overlay: false,
      closeButton: true,
      width: '100%',
      height: '60px'
    }
  },
  {
    id: 'inline-cta',
    name: 'Call to Action Block',
    category: 'conversion',
    layout: 'inline',
    description: 'Embedded CTA block for content pages',
    previewUrl: '/previews/inline-cta.png',
    tags: ['cta', 'conversion', 'embedded'],
    content: {
      title: 'Ready to get started?',
      description: 'Join thousands of satisfied customers and transform your business today.',
      buttonText: 'Start Free Trial',
      buttonLink: '#trial',
      imageUrl: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    style: {
      primaryColor: '#F59E0B',
      secondaryColor: '#D97706',
      textColor: '#1F2937',
      backgroundColor: '#FFF7ED',
      borderRadius: 12,
      fontSize: '16px'
    },
    display: {
      position: 'center',
      overlay: false,
      closeButton: false,
      width: '100%',
      height: 'auto'
    }
  },
  {
    id: 'modal-lead-magnet',
    name: 'Lead Magnet with Image',
    category: 'lead-generation',
    layout: 'modal',
    description: 'Eye-catching lead magnet with prominent image',
    previewUrl: '/previews/modal-lead-magnet.png',
    tags: ['lead', 'image', 'download'],
    content: {
      title: 'Download Our Free Guide',
      description: 'Get instant access to our comprehensive guide and boost your productivity today.',
      buttonText: 'Download Now',
      buttonLink: '#download',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    style: {
      primaryColor: '#6366F1',
      secondaryColor: '#4F46E5',
      textColor: '#1F2937',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      fontSize: '16px'
    },
    display: {
      position: 'center',
      overlay: true,
      closeButton: true,
      width: '520px',
      height: 'auto'
    }
  },
  {
    id: 'modal-product-showcase',
    name: 'Product Showcase',
    category: 'sales',
    layout: 'modal',
    description: 'Showcase your product with compelling visuals',
    previewUrl: '/previews/modal-product.png',
    tags: ['product', 'image', 'showcase'],
    content: {
      title: 'New Product Launch!',
      description: 'Discover our latest innovation designed to transform your experience.',
      buttonText: 'Learn More',
      buttonLink: '#product',
      imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    style: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      textColor: '#1F2937',
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      fontSize: '18px'
    },
    display: {
      position: 'center',
      overlay: true,
      closeButton: true,
      width: '480px',
      height: 'auto'
    }
  },
  {
    id: 'inline-testimonial',
    name: 'Customer Testimonial',
    category: 'social-proof',
    layout: 'inline',
    description: 'Build trust with customer testimonials and photos',
    previewUrl: '/previews/inline-testimonial.png',
    tags: ['testimonial', 'image', 'trust'],
    content: {
      title: 'What Our Customers Say',
      description: '"This product completely changed how we work. Highly recommended!" - Sarah Johnson, CEO',
      buttonText: 'Read More Reviews',
      buttonLink: '#testimonials',
      imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    style: {
      primaryColor: '#7C3AED',
      secondaryColor: '#6D28D9',
      textColor: '#1F2937',
      backgroundColor: '#FAFAFA',
      borderRadius: 8,
      fontSize: '16px'
    },
    display: {
      position: 'center',
      overlay: false,
      closeButton: false,
      width: '100%',
      height: 'auto'
    }
  }
];

export const templateCategories: { id: TemplateCategory; name: string; icon: string; description: string }[] = [
  { id: 'lead-generation', name: 'Lead Generation', icon: '📧', description: 'Email capture, newsletter signups, contact forms' },
  { id: 'sales', name: 'Sales', icon: '💰', description: 'Discount offers, promotional banners, limited-time deals' },
  { id: 'announcements', name: 'Announcements', icon: '📢', description: 'Product launches, feature updates, news alerts' },
  { id: 'onboarding', name: 'Onboarding', icon: '🚀', description: 'Welcome screens, tutorial prompts, getting started guides' },
  { id: 'system', name: 'System', icon: '⚙️', description: 'Maintenance notices, error messages, status updates' },
  { id: 'compliance', name: 'Compliance', icon: '🛡️', description: 'Cookie consent, GDPR notices, terms acceptance' },
  { id: 'conversion', name: 'Conversion', icon: '🎯', description: 'Call-to-action blocks, trial signups, demo requests' },
  { id: 'social-proof', name: 'Social Proof', icon: '⭐', description: 'Testimonials, reviews, customer success stories' }
];

export const layoutTypes: { id: LayoutType; name: string; icon: string; description: string }[] = [
  { id: 'modal', name: 'Modal', icon: '▢', description: 'Centered overlay popup that appears on top of content' },
  { id: 'fullscreen', name: 'Fullscreen', icon: '⬜', description: 'Full-screen takeover that covers the entire viewport' },
  { id: 'topbar', name: 'Topbar', icon: '▬', description: 'Sticky banner that appears at the top of the page' },
  { id: 'inline', name: 'Inline', icon: '▣', description: 'Embedded content block that flows with the page content' }
];