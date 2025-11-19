import React from 'react';
import { Monitor, Smartphone, Tablet, Eye } from 'lucide-react';
import { usePopupBuilder } from '../../hooks/usePopupBuilder';
import { ImageCropper } from '../common/ImageCropper';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function PreviewPanel() {
  const [activeDevice, setActiveDevice] = React.useState<DeviceType>('desktop');
  const { selectedTemplate, currentPlacement } = usePopupBuilder();
  const [showContentImageCropper, setShowContentImageCropper] = React.useState(false);
  const [showBackgroundImageCropper, setShowBackgroundImageCropper] = React.useState(false);

  const devices = [
    { id: 'desktop' as DeviceType, label: 'Desktop', icon: <Monitor className="w-4 h-4" /> },
    { id: 'tablet' as DeviceType, label: 'Tablet', icon: <Tablet className="w-4 h-4" /> },
    { id: 'mobile' as DeviceType, label: 'Mobile', icon: <Smartphone className="w-4 h-4" /> },
  ];

  const getPreviewStyles = () => {
    if (!selectedTemplate) return {};

    // Use current placement style if available, otherwise fall back to template style
    const currentStyle = currentPlacement?.style || selectedTemplate.style;
    
    const baseStyles: React.CSSProperties = {
      backgroundColor: currentStyle.backgroundColor,
      borderRadius: `${currentStyle.borderRadius}px`,
      color: currentStyle.textColor,
    };

    // Add background image if present
    if (currentStyle.backgroundImage?.url) {
      const { url, fit, position, opacity, overlayColor, overlayOpacity } = currentStyle.backgroundImage;
      
      baseStyles.backgroundImage = overlayOpacity && overlayOpacity > 0 
        ? `linear-gradient(rgba(${parseInt(overlayColor.slice(1, 3), 16)}, ${parseInt(overlayColor.slice(3, 5), 16)}, ${parseInt(overlayColor.slice(5, 7), 16)}, ${overlayOpacity}), rgba(${parseInt(overlayColor.slice(1, 3), 16)}, ${parseInt(overlayColor.slice(3, 5), 16)}, ${parseInt(overlayColor.slice(5, 7), 16)}, ${overlayOpacity})), url(${url})`
        : `url(${url})`;
      
      baseStyles.backgroundSize = fit === 'stretch' ? '100% 100%' : fit;
      baseStyles.backgroundPosition = position;
      baseStyles.backgroundRepeat = 'no-repeat';
      baseStyles.opacity = opacity;
    }
    
    return baseStyles;
  };

  const handleContentImageCrop = (croppedImageUrl: string) => {
    // Update the content image URL with the cropped version
    const { updateCurrentPlacement } = usePopupBuilder.getState();
    updateCurrentPlacement({
      content: {
        ...currentPlacement?.content,
        imageUrl: croppedImageUrl
      }
    });
    setShowContentImageCropper(false);
  };

  const handleBackgroundImageCrop = (croppedImageUrl: string) => {
    // Update the background image URL with the cropped version
    const { updateCurrentPlacement } = usePopupBuilder.getState();
    updateCurrentPlacement({
      style: {
        ...currentPlacement?.style,
        backgroundImage: {
          ...currentPlacement?.style?.backgroundImage,
          url: croppedImageUrl
        }
      }
    });
    setShowBackgroundImageCropper(false);
  };

  const getDeviceClass = () => {
    switch (activeDevice) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-80';
      default:
        return 'w-full h-96';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Preview</h3>
        </div>

        <div className="flex items-center space-x-2">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${activeDevice === device.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                }
              `}
            >
              {device.icon}
              <span className="hidden sm:block">{device.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="mx-auto" style={{ maxWidth: activeDevice === 'mobile' ? '320px' : activeDevice === 'tablet' ? '768px' : '100%' }}>
          {selectedTemplate ? (
            <div
              className={`mx-auto transition-all duration-300 ${getDeviceClass()} relative`}
              style={getPreviewStyles()}
            >
              <div className="p-6 h-full flex flex-col justify-center text-center space-y-4 relative z-10">
                {/* Image */}
                {(currentPlacement?.content?.imageUrl || selectedTemplate.content.imageUrl) && (
                  <div className="flex justify-center mb-4">
                    <div className="relative group">
                    {(() => {
                      const imageFit = currentPlacement?.content?.imageFit || 'contain';
                      const imageSize = currentPlacement?.content?.imageSize || 'M';
                      
                      const sizeClasses = {
                        S: 'h-20 w-20',
                        M: 'h-32 w-32', 
                        L: 'h-48 w-48'
                      };
                      
                      const fitClasses = {
                        'fill-background': 'object-cover w-full h-full',
                        'fill-container': 'object-cover',
                        'contain': 'object-contain'
                      };
                      
                      return (
                        <div className={`${sizeClasses[imageSize as keyof typeof sizeClasses]} ${imageFit === 'fill-background' ? 'w-full' : ''}`}>
                          <img
                            src={currentPlacement?.content?.imageUrl || selectedTemplate.content.imageUrl}
                            alt="Popup content"
                            className={`${fitClasses[imageFit as keyof typeof fitClasses]} rounded-lg ${imageFit === 'fill-background' ? 'w-full h-full' : sizeClasses[imageSize as keyof typeof sizeClasses]}`}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {/* Persistent Content Image Crop Icon */}
                          <div 
                            className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-40 rounded-full flex items-center justify-center cursor-pointer z-10"
                            onClick={() => setShowContentImageCropper(true)}
                          >
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                            </svg>
                          </div>
                          {/* Content Image Crop Overlay */}
                          <div
                            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg cursor-pointer flex items-center justify-center"
                            style={{
                              borderRadius: `${(currentPlacement?.style?.borderRadius || selectedTemplate.style.borderRadius)}px`,
                              overflow: 'hidden'
                            }}
                            onClick={() => setShowContentImageCropper(true)}
                          >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      );
                    })()}
                    </div>
                  </div>
                )}
                
                {/* Title */}
                <h2 
                  className="text-2xl font-bold" 
                  style={{ 
                    fontSize: (currentPlacement?.style?.fontSize || selectedTemplate.style.fontSize),
                    color: (currentPlacement?.style?.textColor || selectedTemplate.style.textColor)
                  }}
                >
                  {currentPlacement?.content?.title || selectedTemplate.content.title}
                </h2>
                
                {/* Description */}
                <p 
                  className="opacity-80"
                  style={{ 
                    color: (currentPlacement?.style?.textColor || selectedTemplate.style.textColor)
                  }}
                >
                  {currentPlacement?.content?.description || selectedTemplate.content.description}
                </p>
                
                {/* Button */}
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 mt-4"
                  style={{
                    backgroundColor: (currentPlacement?.style?.primaryColor || selectedTemplate.style.primaryColor),
                    color: (currentPlacement?.style?.buttonTextColor || selectedTemplate.style.buttonTextColor || '#FFFFFF'),
                    borderRadius: `${(currentPlacement?.style?.borderRadius || selectedTemplate.style.borderRadius)}px`,
                  }}
                >
                  {currentPlacement?.content?.buttonText || selectedTemplate.content.buttonText}
                </button>
                
              </div>

              {/* Background Image Crop Overlay - only show if there's a background image */}
              {currentPlacement?.style?.backgroundImage?.url && (
                <>
                  {/* Persistent Background Image Crop Icon */}
                  <div
                    className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-40 rounded-full flex items-center justify-center cursor-pointer z-20"
                    onClick={() => setShowBackgroundImageCropper(true)}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Background Image Crop Overlay */}
                  <div
                    className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center justify-center group"
                    style={{ borderRadius: `${(currentPlacement?.style?.borderRadius || selectedTemplate.style.borderRadius)}px` }}
                    onClick={() => setShowBackgroundImageCropper(true)}
                  >
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8" />
                </div>
                <p>Select a template to see the preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Content Image Cropper Modal */}
      {showContentImageCropper && (currentPlacement?.content?.imageUrl || selectedTemplate?.content.imageUrl) && (
        <ImageCropper
          imageUrl={currentPlacement?.content?.imageUrl || selectedTemplate.content.imageUrl}
          onCrop={handleContentImageCrop}
          onClose={() => setShowContentImageCropper(false)}
        />
      )}
      
      {/* Background Image Cropper Modal */}
      {showBackgroundImageCropper && currentPlacement?.style?.backgroundImage?.url && (
        <ImageCropper
          imageUrl={currentPlacement.style.backgroundImage.url}
          onCrop={handleBackgroundImageCrop}
          onClose={() => setShowBackgroundImageCropper(false)}
        />
      )}
    </div>
  );
}