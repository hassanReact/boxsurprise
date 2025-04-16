import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { User, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../features/auth/authSlice";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  paymentMethods: {
    type: string;
    last4: string;
  }[];
}

const UserProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  // This would come from your API/database
  const [profile, setProfile] = useState<UserProfile>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    paymentMethods: [
      { type: "visa", last4: "4242" },
      { type: "mastercard", last4: "8888" },
    ],
  });

   useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        dispatch(setUser(JSON.parse(user)));
      }
    }, [dispatch]);

  // Create a temporary profile state for the modal
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const openModal = () => {
    setTempProfile({...profile}); // Reset temp profile to current values
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // add auth header if needed
        },
        body: JSON.stringify({
          name: tempProfile.fullName,
          email: tempProfile.email,
          phone: tempProfile.phone,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      console.log(data)
      // Update the main profile state with temp values
      setProfile({...tempProfile});
      
      console.log("Profile updated successfully:", data.user);
      dispatch(setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phoneNumber: data.user.phone,
        referral_id: data.user.referralId || null,
        createdAt: data.user.createdAt,
      }));
      // Show success notification
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Close the modal
      closeModal();
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-16">
      {/* Toast Notification Container */}
      <ToastContainer />
      
      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Profile Settings
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 block w-full text-gray-700 sm:text-sm">
              {profile.fullName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 block w-full text-gray-700 sm:text-sm">
              {profile.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 block w-full text-gray-700 sm:text-sm">
              {profile.phone || "Not provided"}
            </div>
          </div>

          <button
            onClick={openModal}
            className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Edit Profile</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5 cursor-pointer" />
              </button>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={tempProfile.fullName}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, fullName: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={tempProfile.email}
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={tempProfile.phone}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, phone: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;