import React from 'react';
import { Settings, Zap, Mail, BarChart3, Database, Webhook } from 'lucide-react';

const integrations = [
  {
    category: 'Email Marketing',
    icon: <Mail className="w-8 h-8" />,
    services: ['Mailchimp', 'ConvertKit', 'ActiveCampaign', 'Klaviyo'],
    color: 'blue',
    description: 'Sync leads directly to your email marketing platform'
  },
  {
    category: 'CRM Systems',
    icon: <Database className="w-8 h-8" />,
    services: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM'],
    color: 'green',
    description: 'Automatically add contacts and track lead quality'
  },
  {
    category: 'Analytics',
    icon: <BarChart3 className="w-8 h-8" />,
    services: ['Google Analytics', 'Mixpanel', 'Amplitude', 'Segment'],
    color: 'purple',
    description: 'Track events and measure campaign performance'
  },
  {
    category: 'Automation',
    icon: <Zap className="w-8 h-8" />,
    services: ['Zapier', 'Make', 'IFTTT', 'Microsoft Power Automate'],
    color: 'orange',
    description: 'Create custom workflows and automate processes'
  },
  {
    category: 'Webhooks',
    icon: <Webhook className="w-8 h-8" />,
    services: ['Custom API', 'Real-time Events', 'Data Streaming'],
    color: 'indigo',
    description: 'Send data to any endpoint with custom webhooks'
  }
];

const getColorClasses = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-50 dark:bg-orange-900 border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
  };
  return colors[color] || colors.blue;
};

export function IntegrationsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Integrations</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Connect your popup builder with your favorite tools and services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {integrations.map((integration, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
          >
            <div className={`inline-flex p-3 rounded-lg border-2 mb-4 ${getColorClasses(integration.color)}`}>
              {integration.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {integration.category}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {integration.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {integration.services.map((service, serviceIndex) => (
                <span
                  key={serviceIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                >
                  {service}
                </span>
              ))}
            </div>
            
            <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Configure
            </button>
          </div>
        ))}
      </div>

      {/* Webhook Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <Webhook className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Custom Webhook Configuration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Send popup data to your custom endpoints in real-time
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://your-api.com/webhook"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Authentication Header
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Bearer your-token-here"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example Payload</h4>
          <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-x-auto">
{`{
  "event": "popup_conversion",
  "placement_id": "placement-123",
  "user_id": "user-456",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "email": "user@example.com",
    "source": "exit_intent",
    "page_url": "https://example.com/product"
  }
}`}
          </pre>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            Save Webhook
          </button>
          <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            Test Connection
          </button>
        </div>
      </div>
    </div>
  );
}