export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  layout: LayoutType;
  description: string;
  previewUrl: string;
  tags: string[];
  content: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageUrl: string;
  };
  style: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    borderRadius: number;
    fontSize: string;
  };
  display: {
    position: string;
    overlay: boolean;
    closeButton: boolean;
    width: string;
    height: string;
  };
}

export interface Campaign {
  id: string;
  name: string;
  placements: Placement[];
  status: 'active' | 'paused' | 'draft';
  schedule: Schedule;
  targeting: Targeting;
  analytics: Analytics;
}

export interface Placement {
  id: string;
  name: string;
  layout: LayoutType;
  template: Template;
  content: Content;
  style: Style;
  display: Display;
  schedule: Schedule;
  targeting: Targeting;
  triggers: Trigger[];
  status: 'active' | 'paused' | 'draft';
}

export interface Content {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imageFit?: 'fill-background' | 'fill-container' | 'contain';
  imageSize?: 'S' | 'M' | 'L';
}

export interface Style {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  backgroundImage?: {
    url: string;
    fit: 'cover' | 'contain' | 'stretch';
    position: 'center' | 'top' | 'bottom' | 'left' | 'right';
    opacity: number;
    overlayColor: string;
    overlayOpacity: number;
  };
  borderRadius: number;
  fontSize: string;
  fontWeight: string;
  spacing: string;
}

export interface Display {
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  overlay: boolean;
  closeButton: boolean;
  width: string;
  height: string;
  animation: string;
  frequency: FrequencySettings;
}

export interface Schedule {
  startDate: string;
  endDate: string;
  timezone: string;
  recurring: boolean;
  pattern: 'daily' | 'weekly' | 'monthly';
  blackoutDates: string[];
}

export interface Targeting {
  urlPatterns: string[];
  deviceTypes: ('desktop' | 'tablet' | 'mobile')[];
  geoLocation: string[];
  userBehavior: {
    newVisitor: boolean;
    returningVisitor: boolean;
    referralSources: string[];
    utmParameters: Record<string, string>;
  };
}

export interface Trigger {
  type: 'exit-intent' | 'scroll' | 'time-delay' | 'page-views' | 'custom-event';
  value: string | number;
  sensitivity?: number;
}

export interface FrequencySettings {
  showOnce: boolean;
  interval: number;
  maxShows: number;
}

export interface Analytics {
  views: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
  trends: {
    period: string;
    data: Array<{ date: string; views: number; clicks: number; conversions: number }>;
  };
}

export type LayoutType = 'modal' | 'fullscreen' | 'topbar' | 'inline';

export type TemplateCategory =
  | 'lead-generation'
  | 'sales'
  | 'announcements'
  | 'onboarding'
  | 'system'
  | 'compliance'
  | 'conversion'
  | 'social-proof';

export type NavigationTab = 'placements' | 'campaigns' | 'analytics' | 'integrations';

export type PlacementStep = 'layout' | 'theme' | 'customize';

export type CustomizeTab = 'content' | 'style' | 'display' | 'schedule' | 'targeting' | 'analytics';
