import React, { useState } from 'react';
import { Settings, Clock, RotateCcw, MousePointer, Calendar } from 'lucide-react';

export function BehaviorTab() {
  const [timeDelayEnabled, setTimeDelayEnabled] = useState(false);
  const [timeDelayValue, setTimeDelayValue] = useState(20);
  
  const [repeatDisplayEnabled, setRepeatDisplayEnabled] = useState(false);
  const [repeatDisplayValue, setRepeatDisplayValue] = useState(2);
  
  const [scrollDepthEnabled, setScrollDepthEnabled] = useState(true);
  const [scrollDepthValue, setScrollDepthValue] = useState(50);
  
  const [postConversionEnabled, setPostConversionEnabled] = useState(false);
  const [postConversionValue, setPostConversionValue] = useState(21);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Behavior Settings</span>
        </h4>

        <div className="space-y-6">
          {/* Trigger Settings Header */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Trigger Settings
            </h5>
            
            <div className="space-y-6">
              {/* Time Delay */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Time Delay (seconds)</span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Show popup after specified delay
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={timeDelayEnabled}
                      onChange={(e) => setTimeDelayEnabled(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {timeDelayEnabled && (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="range"
                        min="1"
                        max="60"
                        step="1"
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        value={timeDelayValue}
                        onChange={(e) => setTimeDelayValue(parseInt(e.target.value))}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">{timeDelayValue}s</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>1s</span>
                      <span>30s</span>
                      <span>60s</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Scroll Depth */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <MousePointer className="w-4 h-4" />
                      <span>Scroll Depth</span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Show popup when user scrolls to percentage
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={scrollDepthEnabled}
                      onChange={(e) => setScrollDepthEnabled(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {scrollDepthEnabled && (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        value={scrollDepthValue}
                        onChange={(e) => setScrollDepthValue(parseInt(e.target.value))}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">{scrollDepthValue}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>10%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Frequency Settings */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Frequency Settings
            </h5>
            
            <div className="space-y-6">
              {/* Repeat Display */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Repeat Display (days)</span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Show popup again after specified days
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={repeatDisplayEnabled}
                      onChange={(e) => setRepeatDisplayEnabled(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {repeatDisplayEnabled && (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        value={repeatDisplayValue}
                        onChange={(e) => setRepeatDisplayValue(parseInt(e.target.value))}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[4rem]">{repeatDisplayValue} days</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>1 day</span>
                      <span>15 days</span>
                      <span>30 days</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Post-conversion Repeat Display */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Post-conversion Repeat Display (days)</span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Show popup again after conversion
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={postConversionEnabled}
                      onChange={(e) => setPostConversionEnabled(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {postConversionEnabled && (
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="range"
                        min="1"
                        max="90"
                        step="1"
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        value={postConversionValue}
                        onChange={(e) => setPostConversionValue(parseInt(e.target.value))}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[4rem]">{postConversionValue} days</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>1 day</span>
                      <span>45 days</span>
                      <span>90 days</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}