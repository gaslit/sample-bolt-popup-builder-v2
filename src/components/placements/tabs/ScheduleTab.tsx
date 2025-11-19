import React from 'react';
import { Calendar, Clock, Globe } from 'lucide-react';
import { usePopupBuilder } from '../../../hooks/usePopupBuilder';

export function ScheduleTab() {
  const { currentPlacement, updateCurrentPlacement } = usePopupBuilder();
  const [selectedWeekdays, setSelectedWeekdays] = React.useState<number[]>([]);
  const [monthlyType, setMonthlyType] = React.useState<'date' | 'weekday'>('date');
  const [monthlyWeekday, setMonthlyWeekday] = React.useState<number>(1); // 1 = Monday
  const [monthlyOccurrence, setMonthlyOccurrence] = React.useState<number>(1); // 1 = First, -1 = Last

  const handleScheduleChange = (field: string, value: string | boolean) => {
    updateCurrentPlacement({
      schedule: {
        ...currentPlacement?.schedule,
        [field]: value
      }
    });
  };

  const currentSchedule = currentPlacement?.schedule || {
    startDate: '',
    endDate: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    recurring: false,
    pattern: 'daily' as const,
    blackoutDates: []
  };

  const weekdays = [
    { id: 0, name: 'Sun', full: 'Sunday' },
    { id: 1, name: 'Mon', full: 'Monday' },
    { id: 2, name: 'Tue', full: 'Tuesday' },
    { id: 3, name: 'Wed', full: 'Wednesday' },
    { id: 4, name: 'Thu', full: 'Thursday' },
    { id: 5, name: 'Fri', full: 'Friday' },
    { id: 6, name: 'Sat', full: 'Saturday' }
  ];

  const toggleWeekday = (dayId: number) => {
    setSelectedWeekdays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId].sort()
    );
  };
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Schedule Settings</span>
        </h4>

        <div className="space-y-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentSchedule.startDate}
              onChange={(e) => handleScheduleChange('startDate', e.target.value)}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentSchedule.endDate}
              onChange={(e) => handleScheduleChange('endDate', e.target.value)}
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>Timezone</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentSchedule.timezone}
              onChange={(e) => handleScheduleChange('timezone', e.target.value)}
            >
              <optgroup label="North America">
                <option value="America/New_York">New York (EST/EDT)</option>
                <option value="America/Los_Angeles">Los Angeles (PST/PDT)</option>
                <option value="America/Chicago">Chicago (CST/CDT)</option>
                <option value="America/Toronto">Toronto (EST/EDT)</option>
                <option value="America/Vancouver">Vancouver (PST/PDT)</option>
                <option value="America/Mexico_City">Mexico City (CST/CDT)</option>
              </optgroup>
              <optgroup label="Europe">
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Paris">Paris (CET/CEST)</option>
                <option value="Europe/Berlin">Berlin (CET/CEST)</option>
                <option value="Europe/Amsterdam">Amsterdam (CET/CEST)</option>
                <option value="Europe/Stockholm">Stockholm (CET/CEST)</option>
                <option value="Europe/Madrid">Madrid (CET/CEST)</option>
                <option value="Europe/Rome">Rome (CET/CEST)</option>
                <option value="Europe/Moscow">Moscow, St. Petersburg (MSK)</option>
                <option value="Europe/Istanbul">Istanbul (TRT)</option>
              </optgroup>
              <optgroup label="Asia Pacific">
                <option value="Asia/Singapore">Singapore (SGT)</option>
                <option value="Asia/Tokyo">Tokyo, Osaka (JST)</option>
                <option value="Asia/Hong_Kong">Hong Kong (HKT)</option>
                <option value="Asia/Seoul">Seoul (KST)</option>
                <option value="Asia/Taipei">Taipei (CST)</option>
                <option value="Asia/Bangkok">Bangkok (ICT)</option>
                <option value="Asia/Jakarta">Jakarta (WIB)</option>
                <option value="Asia/Manila">Manila (PHT)</option>
                <option value="Asia/Kuala_Lumpur">Kuala Lumpur (MYT)</option>
                <option value="Asia/Mumbai">Mumbai (IST)</option>
                <option value="Asia/Dubai">Dubai (GST)</option>
                <option value="Australia/Sydney">Sydney (AEDT/AEST)</option>
                <option value="Pacific/Auckland">Auckland (NZDT/NZST)</option>
              </optgroup>
              <option value="UTC">UTC</option>
            </select>
          </div>

          {/* Recurring */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Recurring Schedule</span>
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Repeat the schedule pattern
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={currentSchedule.recurring}
                onChange={(e) => handleScheduleChange('recurring', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Recurring Pattern */}
          {currentSchedule.recurring && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Recurring Pattern
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {['daily', 'weekly', 'monthly'].map((pattern) => (
                    <button
                      key={pattern}
                      type="button"
                      onClick={() => handleScheduleChange('pattern', pattern)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 capitalize ${
                        currentSchedule.pattern === pattern
                          ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {pattern}
                    </button>
                  ))}
                </div>
                
                {currentSchedule.pattern === 'weekly' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Days of the week
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {weekdays.map((day) => (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => toggleWeekday(day.id)}
                          className={`px-2 py-2 text-xs font-medium rounded border transition-colors duration-200 ${
                            selectedWeekdays.includes(day.id)
                              ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300'
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          title={day.full}
                        >
                          {day.name}
                        </button>
                      ))}
                    </div>
                    {selectedWeekdays.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Selected: {selectedWeekdays.map(id => weekdays.find(d => d.id === id)?.full).join(', ')}
                      </p>
                    )}
                  </div>
                )}
                
                {currentSchedule.pattern === 'monthly' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-3">
                      Monthly Pattern
                    </label>
                    
                    <div className="space-y-3">
                      {/* Monthly Type Selection */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setMonthlyType('date')}
                          className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                            monthlyType === 'date'
                              ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          By Date
                        </button>
                        <button
                          type="button"
                          onClick={() => setMonthlyType('weekday')}
                          className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                            monthlyType === 'weekday'
                              ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          By Weekday
                        </button>
                      </div>
                      
                      {/* Date-based monthly */}
                      {monthlyType === 'date' && (
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Day</span>
                          <input
                            type="number"
                            min="1"
                            max="31"
                            defaultValue="1"
                            className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">of every month</span>
                        </div>
                      )}
                      
                      {/* Weekday-based monthly */}
                      {monthlyType === 'weekday' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <select
                              value={monthlyOccurrence}
                              onChange={(e) => setMonthlyOccurrence(parseInt(e.target.value))}
                              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value={1}>First</option>
                              <option value={2}>Second</option>
                              <option value={3}>Third</option>
                              <option value={4}>Fourth</option>
                              <option value={-1}>Last</option>
                            </select>
                            <select
                              value={monthlyWeekday}
                              onChange={(e) => setMonthlyWeekday(parseInt(e.target.value))}
                              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              {weekdays.slice(1).map((day) => (
                                <option key={day.id} value={day.id}>{day.full}</option>
                              ))}
                            </select>
                            <span className="text-sm text-gray-600 dark:text-gray-400">of every month</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Example: "{monthlyOccurrence === -1 ? 'Last' : ['First', 'Second', 'Third', 'Fourth'][monthlyOccurrence - 1]} {weekdays.find(d => d.id === monthlyWeekday)?.full} of every month"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}