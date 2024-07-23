import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_LANG, CHANGE_THEME } from "../../redux/slices/themeSlice";
import DashbNav, { RootState } from "../../components/DashbNav";
import ScrollReveal from "../../animations/ScrollReveal";

const Settings = () => {
  // Utilites
  const dispatch = useDispatch();
  // Global States
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const lang = useSelector((state: RootState) => state.theme.language);
  // Functions
  const changeTheme = () => {
    dispatch(CHANGE_THEME());
  };
  const changeLang = () => {
    if (lang === "AR") dispatch(CHANGE_LANG("EN"));
    else dispatch(CHANGE_LANG("AR"));
  };
  // Effects

  return (
    <div
      className={`flex ${
        lang === "AR" ? "flex-row-reverse" : "flex-row"
      } text-white dashboard relative`}
    >
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-transparent to-black"></div>
      {/* nav */}
      <DashbNav />
      <div
        className={`${
          darkMode ? "backdrop-blur-sm text-white" : "bg-[#ebebeb] text-black"
        } flex flex-col justify-around ${
          lang === "AR" ? "items-end text-5xl" : "xs:text-xl sm:text-5xl"
        }  duration-500   font-mont font-bold w-[70%] p-8 z-20`}
      >
        <ScrollReveal animationName="rollIn">
          <p className="mb-5 mt-12">
            {lang === "AR"
              ? !darkMode
                ? "الوضع النهاري"
                : "الوضع الليلي"
              : darkMode
                ? "Dark Mode"
                : "Light Mode"}
          </p>
          <div className="w-[50px] h-[50px] p-2">
            <input
              onClick={changeTheme}
              defaultChecked={darkMode}
              type="checkbox"
              id="toggle"
              className="toggle--checkbox"
            />
            <label htmlFor="toggle" className="toggle--label cursor-pointer">
              <span className="toggle--label-background"></span>
            </label>
          </div>
        </ScrollReveal>
        <ScrollReveal animationName="rollIn">
          <p className="mb-5 mt-[7em]">
            {lang === "AR" ? "اللغه العربيه" : "Arabic Language"}
          </p>
          <label className="switch">
            <input
              onClick={changeLang}
              defaultChecked={lang === "AR" ? true : false}
              id="zas"
              type="checkbox"
            />
            <span className="slider round"></span>
          </label>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Settings;
