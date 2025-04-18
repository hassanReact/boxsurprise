import React, { useState } from 'react';
import { Mail, Lock, Bell, CreditCard, Shield } from 'lucide-react';

// Define the initial profile state with notifications and paymentMethods
const initialProfile = {
  notifications: {
    email: true,
    push: false,
    sms: true,
  },
  paymentMethods: [
    { type: 'visa', last4: '1234' },
    { type: 'mastercard', last4: '5678' },
  ],
};

const UserSettings: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);

  const handleNotificationToggle = (type: keyof typeof profile.notifications) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  return (
    <div className="space-y-6 my-16">
      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-700">Email Notifications</span>
            </div>
            <button
              onClick={() => handleNotificationToggle('email')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                profile.notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  profile.notifications.email ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-700">Push Notifications</span>
            </div>
            <button
              onClick={() => handleNotificationToggle('push')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                profile.notifications.push ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  profile.notifications.push ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-700">SMS Notifications</span>
            </div>
            <button
              onClick={() => handleNotificationToggle('sms')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                profile.notifications.sms ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  profile.notifications.sms ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <span>Change Password</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-2" />
              <span>Two-Factor Authentication</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {profile.paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">
                  {method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.last4}
                </span>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
            </div>
          ))}
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <CreditCard className="h-5 w-5 mr-2" />
            Add New Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;