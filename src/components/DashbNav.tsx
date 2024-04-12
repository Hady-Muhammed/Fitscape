import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { GiChampions } from "react-icons/gi";
import { IoMdFitness, IoIosSettings } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { MdManageAccounts } from "react-icons/md";
import useUser from "../hooks/useUser";
export interface RootState {
  theme: ThemeState;
}

interface ThemeState {
  darkMode: boolean;
  language: string;
}

const DashbNav = () => {
  // Utilites
  const location = useLocation();
  const { logout, isLoading } = useUser();
  // Global States
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const lang = useSelector((state: RootState) => state.theme.language);
  return (
    <>
      {/* Loader */}
      {isLoading && (
        <div className="fixed w-full h-full bg-black/60 z-50 grid place-items-center">
          <Loader />
        </div>
      )}

      <ul
        className={`${
          darkMode ? "backdrop-blur-2xl text-black" : "bg-white"
        } duration-500  flex flex-col justify-evenly text-center z-20 w-[30%] h-full overflow-scroll font-mont`}
      >
        <h1
          className={`${
            darkMode ? "text-white" : "text-black"
          } xs:text-lg sm:text-4xl font-bold italic text-white`}
        >
          Fitscape
        </h1>
        <div className="space-y-4 ">
          <Link to={"/dashboard"} className="block">
            <li className="group">
              <div
                className={`p-4 bg-slate-100 text-blue-600 w-fit rounded-md ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-600 shadow-md text-slate-100 shadow-blue-700"
                    : ""
                } group-hover:bg-blue-600 group-hover:shadow-md group-hover:shadow-blue-700 group-hover:text-slate-100 mx-auto duration-500`}
              >
                <HiMenuAlt1 size={20} />
              </div>
              <span
                className={`${
                  darkMode ? "text-white" : "text-black"
                } text-white group-hover:text-blue-600 ${
                  location.pathname === "/dashboard"
                    ? "text-blue-600 text-shadow scale-[1.03]"
                    : ""
                } group-hover:scale-[1.03] font-medium mt-2 block  duration-500`}
              >
                {lang === "AR" ? "لوحه التحكم" : "Dashboard"}
              </span>
            </li>
          </Link>
          <Link to={"/dashboard/champions"} className="block">
            <li className="group">
              <div
                className={`p-4 bg-slate-100 text-blue-600 w-fit rounded-md ${
                  location.pathname === "/dashboard/champions"
                    ? "bg-blue-600 shadow-md text-slate-100 shadow-blue-700"
                    : ""
                } group-hover:bg-blue-600 group-hover:shadow-md group-hover:shadow-blue-700 group-hover:text-slate-100 mx-auto duration-500`}
              >
                <GiChampions size={20} />
              </div>
              <span
                className={`${
                  darkMode ? "text-white" : "text-black"
                } text-white group-hover:text-blue-600 ${
                  location.pathname === "/dashboard/champions"
                    ? "text-blue-600 text-shadow scale-[1.03]"
                    : ""
                } group-hover:scale-[1.03] font-medium mt-2 block duration-500`}
              >
                {lang === "AR" ? "الابطال" : "Champions"}
              </span>
            </li>
          </Link>
          <Link to={"/dashboard/exercises"} className="block">
            <li className="group">
              <div
                className={`p-4 bg-slate-100 text-blue-600 w-fit rounded-md ${
                  location.pathname === "/dashboard/exercises"
                    ? "bg-blue-600 shadow-md text-slate-100 shadow-blue-700"
                    : ""
                } group-hover:bg-blue-600 group-hover:shadow-md group-hover:shadow-blue-700 group-hover:text-slate-100 mx-auto duration-500`}
              >
                <IoMdFitness size={20} />
              </div>
              <span
                className={`${
                  darkMode ? "text-white" : "text-black"
                } text-white group-hover:text-blue-600 ${
                  location.pathname === "/dashboard/exercises"
                    ? "text-blue-600 text-shadow scale-[1.03]"
                    : ""
                } group-hover:scale-[1.03] font-medium mt-2 block  duration-500`}
              >
                {lang === "AR" ? "التمارين" : "Exercises"}
              </span>
            </li>
          </Link>
          <Link to={"/dashboard/users"} className="block">
            <li className="group">
              <div
                className={`p-4 bg-slate-100 text-blue-600 w-fit rounded-md ${
                  location.pathname === "/dashboard/users"
                    ? "bg-blue-600 shadow-md text-slate-100 shadow-blue-700"
                    : ""
                } group-hover:bg-blue-600 group-hover:shadow-md group-hover:shadow-blue-700 group-hover:text-slate-100 mx-auto duration-500`}
              >
                <FaUsers size={20} />
              </div>
              <span
                className={`${
                  darkMode ? "text-white" : "text-black"
                } text-white group-hover:text-blue-600 ${
                  location.pathname === "/dashboard/users"
                    ? "text-blue-600 text-shadow scale-[1.03]"
                    : ""
                } group-hover:scale-[1.03] font-medium mt-2 block  duration-500`}
              >
                {lang === "AR" ? "المستخدمين" : "Users"}
              </span>
            </li>
          </Link>
          <Link to={"/dashboard/settings"} className="block">
            <li className="group">
              <div
                className={`p-4 bg-slate-100 text-blue-600 w-fit rounded-md ${
                  location.pathname === "/dashboard/settings"
                    ? "bg-blue-600 shadow-md text-slate-100 shadow-blue-700"
                    : ""
                } group-hover:bg-blue-600 group-hover:shadow-md group-hover:shadow-blue-700 group-hover:text-slate-100 mx-auto duration-500`}
              >
                <IoIosSettings size={20} />
              </div>
              <span
                className={`${
                  darkMode ? "text-white" : "text-black"
                } text-white group-hover:text-blue-600 ${
                  location.pathname === "/dashboard/settings"
                    ? "text-blue-600 text-shadow scale-[1.03]"
                    : ""
                } group-hover:scale-[1.03] font-medium mt-2 block  duration-500`}
              >
                {lang === "AR" ? "الاعدادات" : "Settings"}
              </span>
            </li>
          </Link>
          <Link to={"/dashboard/account"} className="block">
            <li className="group">
              <div
                className={`p-4 bg-slate-100 text-blue-600 w-fit rounded-md ${
                  location.pathname === "/dashboard/account"
                    ? "bg-blue-600 shadow-md text-slate-100 shadow-blue-700"
                    : ""
                } group-hover:bg-blue-600 group-hover:shadow-md group-hover:shadow-blue-700 group-hover:text-slate-100 mx-auto duration-500`}
              >
                <MdManageAccounts size={20} />
              </div>
              <span
                className={`${
                  darkMode ? "text-white" : "text-black"
                } text-white group-hover:text-blue-600 ${
                  location.pathname === "/dashboard/account"
                    ? "text-blue-600 text-shadow scale-[1.03]"
                    : ""
                } group-hover:scale-[1.03] font-medium mt-2 block duration-500`}
              >
                {lang === "AR" ? "الحساب" : "Account"}
              </span>
            </li>
          </Link>
        </div>

        <li className="group block cursor-pointer" onClick={logout}>
          <div
            className={`p-4 bg-slate-100 text-blue-600 w-fit rounded-md group-hover:bg-blue-600 group-hover:shadow-md group-hover:shadow-blue-700 group-hover:text-slate-100 mx-auto duration-500`}
          >
            <AiOutlinePoweroff size={20} />
          </div>
          <span
            className={`${
              darkMode ? "text-white" : "text-black"
            } text-white group-hover:text-blue-600  group-hover:scale-[1.03] font-medium mt-2 block duration-500`}
          >
            {lang === "AR" ? "تسجيل الخروج" : "Logout"}
          </span>
        </li>
      </ul>
    </>
  );
};

export default DashbNav;
