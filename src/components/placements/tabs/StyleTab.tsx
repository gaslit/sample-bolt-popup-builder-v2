import React from 'react';
import { Palette, Image } from 'lucide-react';
import { usePopupBuilder } from '../../../hooks/usePopupBuilder';
import { ImageCropper } from '../../common/ImageCropper';

const colorPresets = [
  { name: 'Blue', primary: '#3B82F6', secondary: '#1E40AF' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#7C3AED' },
  { name: 'Green', primary: '#10B981', secondary: '#059669' },
  { name: 'Red', primary: '#EF4444', secondary: '#DC2626' },
  { name: 'Orange', primary: '#F59E0B', secondary: '#D97706' },
  { name: 'Pink', primary: '#EC4899', secondary: '#DB2777' },
];

const colorShades = {
  blue: ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6'],
  purple: ['#F5F3FF', '#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA', '#8B5CF6'],
  green: ['#ECFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981'],
  red: ['#FEF2F2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626'],
  orange: ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C', '#F59E0B'],
  pink: ['#FDF2F8', '#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899'],
};

export function StyleTab() {
  const { selectedTemplate, currentPlacement, updateCurrentPlacement } = usePopupBuilder();
  const [backgroundType, setBackgroundType] = React.useState<'color' | 'image' | 'gradient'>('color');
  const [activeBackgroundImageTab, setActiveBackgroundImageTab] = React.useState<'url' | 'upload' | 'previous'>('url');
  const [showBackgroundCropper, setShowBackgroundCropper] = React.useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = React.useState<string | null>(null);
  const [showPrimaryPicker, setShowPrimaryPicker] = React.useState<string | null>(null);
  const [showSecondaryPicker, setShowSecondaryPicker] = React.useState<string | null>(null);
  const [showButtonTextPicker, setShowButtonTextPicker] = React.useState<string | null>(null);

  const handleStyleChange = (field: string, value: string | number) => {
    updateCurrentPlacement({
      style: {
        ...currentPlacement?.style,
        [field]: value
      }
    });
  };

  const handleBackgroundImageChange = (field: string, value: string) => {
    updateCurrentPlacement({
      style: {
        ...currentPlacement?.style,
        backgroundImage: {
          ...currentPlacement?.style?.backgroundImage,
          [field]: value
        }
      }
    });
  };

  const handlePresetSelect = (preset: typeof colorPresets[0]) => {
    updateCurrentPlacement({
      style: {
        ...currentPlacement?.style,
        primaryColor: preset.primary,
        secondaryColor: preset.secondary,
      }
    });
  };

  const handleColorSelect = (field: string, color: string, setterFunction: (value: string | null) => void) => {
    handleStyleChange(field, color);
    setterFunction(null);
  };

  const handleBackgroundCrop = (croppedImageUrl: string) => {
    handleBackgroundImageChange('url', croppedImageUrl);
    setShowBackgroundCropper(false);
  };

  const renderColorSelector = (
    field: string,
    label: string,
    currentColor: string,
    showPicker: string | null,
    setShowPicker: (value: string | null) => void
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-6 gap-2 mb-3">
        {Object.entries(colorShades).map(([colorName, shades]) => (
          <button
            key={colorName}
            onClick={() => setShowPicker(showPicker === colorName ? null : colorName)}
            className="w-8 h-8 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200"
            style={{ backgroundColor: shades[5] }}
            title={colorName}
          />
        ))}
      </div>
      
      {showPicker && (
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
          <div className="grid grid-cols-6 gap-2">
            {colorShades[showPicker as keyof typeof colorShades].map((shade, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(field, shade, setShowPicker)}
                className={`w-8 h-8 rounded border-2 transition-all duration-200 ${
                  currentColor === shade
                    ? 'border-gray-800 dark:border-white scale-110'
                    : 'border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400'
                }`}
                style={{ backgroundColor: shade }}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-3">
        <input
          type="color"
          className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600"
          value={currentColor}
          onChange={(e) => handleStyleChange(field, e.target.value)}
        />
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          value={currentColor}
          onChange={(e) => handleStyleChange(field, e.target.value)}
        />
      </div>
    </div>
  );

  if (!selectedTemplate) return null;

  const currentStyle = currentPlacement?.style || selectedTemplate.style;

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Palette className="w-4 h-4" />
          <span>Style Settings</span>
        </h4>

        <div className="space-y-3">
          {/* Color Presets */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Presets
            </label>
            <div className="grid grid-cols-6 gap-1">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className="flex flex-col items-center p-1.5 rounded border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200"
                >
                  <div className="flex space-x-0.5 mb-0.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: preset.secondary }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300 text-center leading-tight">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Background Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Background Type
            </label>
            <div className="grid grid-cols-3 gap-1 mb-3">
              {[
                { id: 'color', label: 'Color' },
                { id: 'image', label: 'Image' },
                { id: 'gradient', label: 'Gradient' }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setBackgroundType(type.id as any)}
                  className={`px-2 py-1 text-xs font-medium rounded border transition-colors duration-200 ${
                    backgroundType === type.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Background Color */}
            {backgroundType === 'color' && renderColorSelector(
              'backgroundColor',
              'Background Color',
              currentStyle.backgroundColor,
              showBackgroundPicker,
              setShowBackgroundPicker
            )}

            {/* Background Image */}
            {backgroundType === 'image' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                    <Image className="w-4 h-4" />
                    <span>Background Image</span>
                  </label>
                  
                  {/* Image Input Tabs */}
                  <div className="mb-2">
                    <div className="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setActiveBackgroundImageTab('url')}
                        className={`flex-1 px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                          activeBackgroundImageTab === 'url'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                      >
                        URL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveBackgroundImageTab('upload');
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              handleBackgroundImageChange('url', url);
                            }
                          };
                          input.click();
                        }}
                        className={`flex-1 px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                          activeBackgroundImageTab === 'upload'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  
                  {/* URL Input */}
                  <div className="space-y-2">
                    {activeBackgroundImageTab === 'url' && (
                      <>
                        <input
                          type="url"
                          className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="https://example.com/background.jpg"
                          value={currentPlacement?.style?.backgroundImage?.url || ''}
                          onChange={(e) => handleBackgroundImageChange('url', e.target.value)}
                        />
                        
                        {/* Quick Stock Images */}
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
                            'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
                            'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
                            'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=800'
                          ].map((stockUrl, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleBackgroundImageChange('url', stockUrl)}
                              className="aspect-square rounded border border-gray-300 dark:border-gray-600 overflow-hidden hover:border-blue-500 transition-colors duration-200"
                            >
                              <img
                                src={stockUrl}
                                alt={`Background ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    
                    {activeBackgroundImageTab === 'upload' && (
                      <div className="text-center py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Click "Upload" above to select a background image
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Background Image Controls */}
                {currentPlacement?.style?.backgroundImage?.url && (
                  <div className="space-y-2">
                    {/* Image Fit */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Image Fit
                      </label>
                      <select
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        value={currentPlacement?.style?.backgroundImage?.fit || 'cover'}
                        onChange={(e) => handleBackgroundImageChange('fit', e.target.value)}
                      >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="stretch">Stretch</option>
                      </select>
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Position
                      </label>
                      <select
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        value={currentPlacement?.style?.backgroundImage?.position || 'center'}
                        onChange={(e) => handleBackgroundImageChange('position', e.target.value)}
                      >
                        <option value="center">Center</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>

                    {/* Opacity */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Opacity: {Math.round((currentPlacement?.style?.backgroundImage?.opacity || 1) * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        value={currentPlacement?.style?.backgroundImage?.opacity || 1}
                        onChange={(e) => handleBackgroundImageChange('opacity', parseFloat(e.target.value))}
                      />
                    </div>

                    {/* Overlay Color */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Overlay Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          className="w-8 h-6 rounded border border-gray-300 dark:border-gray-600"
                          value={currentPlacement?.style?.backgroundImage?.overlayColor || '#000000'}
                          onChange={(e) => handleBackgroundImageChange('overlayColor', e.target.value)}
                        />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                          value={currentPlacement?.style?.backgroundImage?.overlayOpacity || 0}
                          onChange={(e) => handleBackgroundImageChange('overlayOpacity', parseFloat(e.target.value))}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[2rem]">
                          {Math.round((currentPlacement?.style?.backgroundImage?.overlayOpacity || 0) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Gradient (placeholder) */}
            {backgroundType === 'gradient' && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Gradient builder coming soon
                </p>
              </div>
            )}
          </div>

          {/* Primary Color */}
          {renderColorSelector(
            'primaryColor',
            'Primary Color',
            currentStyle.primaryColor,
            showPrimaryPicker,
            setShowPrimaryPicker
          )}

          {/* Secondary Color */}
          {renderColorSelector(
            'secondaryColor',
            'Secondary Color',
            currentStyle.secondaryColor,
            showSecondaryPicker,
            setShowSecondaryPicker
          )}

          {/* Button Text Color */}
          {renderColorSelector(
            'buttonTextColor',
            'Button Text Color',
            currentStyle.buttonTextColor || '#FFFFFF',
            showButtonTextPicker,
            setShowButtonTextPicker
          )}

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size: {parseInt(currentStyle.fontSize) || 16}px
            </label>
            <div className="relative">
              <input
                type="range"
                min="12"
                max="32"
                step="2"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                value={parseInt(currentStyle.fontSize) || 16}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>12px</span>
                <span>18px</span>
                <span>24px</span>
                <span>32px</span>
              </div>
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Border Radius: {currentStyle.borderRadius || 0}px
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="24"
                step="4"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                value={currentStyle.borderRadius || 0}
                onChange={(e) => handleStyleChange('borderRadius', parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0px</span>
                <span>8px</span>
                <span>16px</span>
                <span>24px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Image Cropper Modal */}
      {showBackgroundCropper && currentPlacement?.style?.backgroundImage?.url && (
        <ImageCropper
          imageUrl={currentPlacement.style.backgroundImage.url}
          onCrop={handleBackgroundCrop}
          onClose={() => setShowBackgroundCropper(false)}
        />
      )}
    </div>
  );
}