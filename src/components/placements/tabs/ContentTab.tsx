import React from 'react';
import { Image, Link, Type } from 'lucide-react';
import { usePopupBuilder } from '../../../hooks/usePopupBuilder';
import { ImageCropper } from '../../common/ImageCropper';

export function ContentTab() {
  const { selectedTemplate, currentPlacement, updateCurrentPlacement } = usePopupBuilder();
  const [showCropper, setShowCropper] = React.useState(false);
  const [activeImageTab, setActiveImageTab] = React.useState<'url' | 'upload' | 'previous'>('url');

  const handleInputChange = (field: string, value: string) => {
    updateCurrentPlacement({
      content: {
        ...currentPlacement?.content,
        [field]: value
      }
    });
  };

  const handleCrop = (croppedImageUrl: string) => {
    handleInputChange('imageUrl', croppedImageUrl);
    setShowCropper(false);
  };

  if (!selectedTemplate) return null;

  const currentImageUrl = currentPlacement?.content?.imageUrl || selectedTemplate.content.imageUrl;

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Type className="w-4 h-4" />
          <span>Content Settings</span>
        </h4>

        <div className="space-y-3">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentPlacement?.content?.title || selectedTemplate.content.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentPlacement?.content?.description || selectedTemplate.content.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Button Text
            </label>
            <input
              type="text"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentPlacement?.content?.buttonText || selectedTemplate.content.buttonText}
              onChange={(e) => handleInputChange('buttonText', e.target.value)}
            />
          </div>

          {/* Button Link */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
              <Link className="w-4 h-4" />
              <span>Button Link</span>
            </label>
            <input
              type="url"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentPlacement?.content?.buttonLink || selectedTemplate.content.buttonLink}
              onChange={(e) => handleInputChange('buttonLink', e.target.value)}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
              <Image className="w-4 h-4" />
              <span>Image</span>
            </label>
            
            {/* Image Input Tabs */}
            <div className="mb-2">
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveImageTab('url')}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    activeImageTab === 'url'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveImageTab('upload');
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        handleInputChange('imageUrl', url);
                      }
                    };
                    input.click();
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    activeImageTab === 'upload'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  Upload
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="space-y-2">
              {activeImageTab === 'url' && (
                <>
                  <input
                    type="url"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://example.com/image.jpg"
                    value={currentImageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  />
                  
                  {/* Quick Stock Images */}
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=400',
                      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
                      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
                      'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=400'
                    ].map((stockUrl, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleInputChange('imageUrl', stockUrl)}
                        className="aspect-square rounded border border-gray-300 dark:border-gray-600 overflow-hidden hover:border-blue-500 transition-colors duration-200"
                      >
                        <img
                          src={stockUrl}
                          alt={`Stock image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {activeImageTab === 'upload' && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click "Upload" above to select an image file
                  </p>
                </div>
              )}
              </div>

            {/* Image Controls */}
            {currentImageUrl && (
              <div className="mt-2 space-y-2">
                {/* Image Fit */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image Fit
                  </label>
                  <select
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    value={currentPlacement?.content?.imageFit || 'contain'}
                    onChange={(e) => handleInputChange('imageFit', e.target.value)}
                  >
                    <option value="fill-background">Fill Background</option>
                    <option value="fill-container">Fill Container</option>
                    <option value="contain">Contain</option>
                  </select>
                </div>

                {/* Image Size */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image Size
                  </label>
                  <div className="flex space-x-1">
                    {['S', 'M', 'L'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleInputChange('imageSize', size)}
                        className={`
                          flex-1 px-2 py-1 text-xs font-medium rounded border transition-colors duration-200
                          ${(currentPlacement?.content?.imageSize || 'M') === size
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                          }
                        `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Cropper Modal */}
      {showCropper && currentImageUrl && (
        <ImageCropper
          imageUrl={currentImageUrl}
          onCrop={handleCrop}
          onClose={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}