import React, { useEffect, useState, lazy } from "react";
import img from "../../assets/ruf.webp";
import jwtDecode from "jwt-decode";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import ScrollAnimation from "react-animate-on-scroll";
import { useSelector } from "react-redux";
import { enviroment } from "../../enviroment";
const DashbNav = lazy(() => import("../../components/DashbNav"));

const Account = () => {
  // Global States
  const darkMode = useSelector((state) => state.theme.darkMode);
  const lang = useSelector((state) => state.theme.language);
  // States
  const [disabled, setDisabled] = useState(true);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  // Functions
  const getUserData = async () => {
    const token = jwtDecode(localStorage.getItem("token"));
    const res = await axios.post(enviroment.API_URL + "/api/users/getUser", {
      email: token.email,
      password: token.password,
    });
    setPass(res.data.password);
    setEmail(res.data.email);
  };
  // EFFECTS
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      className={`flex dashboard relative ${
        lang === "AR" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-transparent to-black"></div>
      {/* nav */}
      <DashbNav />
      <div
        className={`${
          darkMode ? "backdrop-blur-sm" : "bg-[#ebebeb]"
        } overflow-scroll z-20 w-[70%] p-8`}
      >
        <div className="mt-20 mb-5">
          <span
            dir={lang === "AR" ? "rtl" : "ltr"}
            className={`${
              darkMode ? "" : "text-black"
            } block text-xs font-light text-white `}
          >
            {lang === "AR" ? "نظرة عامة" : "OVERVIEW"}
          </span>
          <h1
            dir={lang === "AR" ? "rtl" : "ltr"}
            className={`${
              darkMode ? "" : "text-black"
            } font-bold text-4xl text-white font-mont`}
          >
            {lang === "AR" ? "الحساب الإداري" : "Admin Profile"}
          </h1>
        </div>
        <div
          className={`flex xs:space-y-4 lg:space-y-0 xs:flex-col ${
            lang === "AR" ? "lg:flex-row-reverse" : "lg:flex-row"
          } justify-between h-fit`}
        >
          {/* left */}
          <ScrollAnimation
            animateIn="animate__animated animate__fadeIn"
            scrollableParentSelector="#root"
            className="p-2 bg-white rounded-md xs:w-full lg:w-[40%] flex flex-col justify-evenly shadow-xl"
          >
            <div className="text-center space-y-2">
              <span className="block mx-auto">
                <img
                  className="rounded-full w-[150px] h-[150px] mx-auto object-cover"
                  src={img}
                  alt="x"
                />
              </span>
              <h2 className="font-bold text-2xl">Hady Muhammed</h2>
              <span className="text-sm font-light">Software Engineer</span>
              <button
                onClick={() => setDisabled(false)}
                className="flex mx-auto bg-white duration-300 hover:bg-blue-600 hover:text-white py-1 shadow-lg rounded-full px-4 text-blue-600 space-x-1 border-2 border-blue-600"
              >
                <FiEdit size={20} />
                <span>{lang === "AR" ? "تعديل" : "Edit"}</span>
              </button>
            </div>
            <div className="p-2">
              <h3
                dir={lang === "AR" ? "rtl" : "ltr"}
                className="text-lg font-semibold"
              >
                {lang === "AR" ? "الوصف" : "Description"}
              </h3>
              <p dir={lang === "AR" ? "rtl" : "ltr"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus sint sit repudiandae.
              </p>
            </div>
          </ScrollAnimation>
          {/* right */}
          <ScrollAnimation
            initiallyVisible={window.screen.width >= 1025 ? false : true}
            animateIn="animate__animated animate__fadeIn"
            scrollableParentSelector="#root"
            delay={200}
            className="bg-white xs:w-full lg:w-[55%] rounded-md shadow-xl"
          >
            <h2 dir={lang === "AR" ? "rtl" : "ltr"} className="p-3">
              {lang === "AR" ? "تفاصيل الحساب" : "Account Details"}
            </h2>
            <hr />
            <form dir={lang === "AR" ? "rtl" : "ltr"} action="" className="p-3">
              <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-1">
                <div>
                  <label className="block font-bold text-lg" htmlFor="">
                    {lang === "AR" ? "الاسم الاول" : "First Name"}
                  </label>
                  <input
                    value={"Hady"}
                    disabled={disabled}
                    className="border w-full outline-none"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-bold text-lg" htmlFor="">
                    {lang === "AR" ? "الاسم الاخير" : "Last Name"}
                  </label>
                  <input
                    value={"Muhammed"}
                    disabled={disabled}
                    className="border w-full outline-none"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-bold text-lg" htmlFor="">
                    {lang === "AR" ? "البريد الالكتروني" : "ُEmail"}
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={disabled}
                    className="border w-full outline-none"
                    type="email"
                  />
                </div>
                <div>
                  <label className="block font-bold text-lg" htmlFor="">
                    {lang === "AR" ? "كلمه السر" : "Password"}
                  </label>
                  <input
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    disabled={disabled}
                    className="border w-full outline-none"
                    type="password"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-lg" htmlFor="">
                  {lang === "AR" ? "العنوان" : "Address"}
                </label>
                <input
                  value={"Shoubra , Egypt"}
                  disabled={disabled}
                  className="border outline-none w-full"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-bold text-lg" htmlFor="">
                  {lang === "AR" ? "المدينه" : "City"}
                </label>
                <input
                  value={"Cairo"}
                  disabled={disabled}
                  className="border outline-none w-full"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-bold text-lg" htmlFor="">
                  {lang === "AR" ? "الوصف" : "Description"}
                </label>
                <textarea
                  value={
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo dolore deserunt saepe. Molestiae nam labore maiores vel voluptas alias rerum quas eius nesciunt, iure assumenda distinctio ut? Necessitatibus, eos ullam!"
                  }
                  disabled={disabled}
                  className="border w-full resize-none"
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                disabled={disabled}
                className="text-white disabled:bg-black disabled:pointer-events-none disabled:text-white/40 select-none bg-blue-600 hover:tracking-wider duration-500 p-3 rounded-lg mt-10 shadow-lg"
              >
                {lang === "AR" ? "تعديل الحساب" : "Update Account"}
              </button>
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default Account;
