import React from 'react';
import { UserPlus } from 'lucide-react';

interface InviteButtonProps {
  onClick: () => void;
}

const InviteButton: React.FC<InviteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
      aria-label="Invite users"
      title="Invite users to your network"
    >
      <UserPlus size={20} />
    </button>
  );
};

export default InviteButton;