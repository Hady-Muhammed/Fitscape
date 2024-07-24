import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Loader from "./Loader";
import useUser from "../hooks/useUser";
import { useTranslation } from "react-i18next";

const LogoutBtn = () => {
  const { t } = useTranslation();
  // Utilites
  const location = useLocation();
  // States
  const { logout, isLoading } = useUser();
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
              data-tip={t("general.Logout")}
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
