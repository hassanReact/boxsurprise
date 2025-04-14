// import { useClerk } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";

// export const useLogout = () => {
//   const { signOut } = useClerk(); // Clerk se signOut access karo
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await signOut(); // Clerk se logout
      
//       // Extra security: Local & session storage clear
//       localStorage.clear();
//       sessionStorage.clear();

//       // Cookies clear karne ka method
//       document.cookie.split(";").forEach((c) => {
//         document.cookie = c
//           .replace(/^ +/, "")
//           .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//       });

//       navigate("/login"); // Logout ke baad login page pe redirect
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   return handleLogout;
// };
