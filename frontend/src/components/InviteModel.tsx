import React, { useState } from 'react';
import { X, Send, Mail } from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string; // Add user email prop
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, userEmail }) => {
  const [referralEmail, setReferralEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage(null);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(referralEmail)) {
      setFeedbackMessage({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/referral/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userEmail,
            referralEmail
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invitation');
      }
      
      setFeedbackMessage({
        type: 'success',
        message: `Invitation sent to ${referralEmail}`
      });
      setReferralEmail('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setFeedbackMessage({
        type: 'error',
        message: 'Failed to send invitation. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">Invite to Your Network</h3>
          <button 
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Invite someone to join your referral network. They'll receive an email with instructions to sign up.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={referralEmail}
                  onChange={(e) => setReferralEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            
            {feedbackMessage && (
              <div className={`p-3 rounded-md mb-4 ${
                feedbackMessage.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {feedbackMessage.message}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <div className="cursor-pointer flex items-center">
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send size={16} className="mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Invite'}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;