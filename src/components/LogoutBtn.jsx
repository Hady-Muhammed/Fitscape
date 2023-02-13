import React, { useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import Loader from "./Loader";

const LogoutBtn = () => {
  // Utilites
  const location = useLocation();
  const navigate = useNavigate();
  // States
  const [isLoading, setIsLoading] = useState(false);
  // Functions
  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      toast.success("Logged out successfully!");
      setIsLoading(false);
      navigate("/signin");
    }, 3000);
  };
  return (
    <>
      {!location.pathname.includes("/dashboard") &&
        !location.pathname.includes("/signin") &&
        !location.pathname.includes("/signup") && (
          <>
            {isLoading && (
              <div className="fixed w-full h-full bg-black/60 z-[9999] grid place-items-center">
                <Loader />
              </div>
            )}
            <ReactTooltip />
            <button
              onClick={logout}
              data-tip="Logout"
              className="fixed z-50 left-5 top-5 bg-white xs:p-1 sm:p-2 rounded-full flex items-center text-xs"
            >
              <AiOutlinePoweroff size={20} />
            </button>
          </>
        )}
    </>
  );
};

export default LogoutBtn;
