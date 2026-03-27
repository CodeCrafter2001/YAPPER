import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    console.log("logout button clicked");
    logout();
  };

  return (
    <div className="relative z-50 min-h-screen flex items-center justify-center">
      <button
        type="button"
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default ChatPage;