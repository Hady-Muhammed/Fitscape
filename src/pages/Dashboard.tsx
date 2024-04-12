import React, { useEffect, useState } from "react";
import DashbNav from "../components/DashbNav";
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GrUserExpert } from "react-icons/gr";
import { BiLike } from "react-icons/bi";
import ScrollAnimation from "react-animate-on-scroll";
import { useSelector } from "react-redux";
import userr from "../assets/user.jpg";
import { enviroment } from "../enviroment";
import { Line } from "react-chartjs-2";
import Pako from "pako";
import { Email } from "../types/email";
import useRest from "../hooks/useRest";
interface RootState {
  theme: ThemeState;
}

interface ThemeState {
  darkMode: boolean;
  language: string;
}

const Dashboard = () => {
  // Global States
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const lang = useSelector((state: RootState) => state.theme.language);
  // States
  const [emails, setEmails] = useState<Email[]>([]);
  const [user, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);
  const { get } = useRest();
  const [chartData] = useState({
    labels: [2018, 2019, 2020, 2021, 2022],
    datasets: [
      {
        label: "Money Gained ",
        data: [50, 60, 40, 50, 30],
        backgroundColor: ["blue", "blue", "blue", "blue", "blue"],
        borderColor: "#2563eb",
        borderWidth: 2,
      },
    ],
  });
  const [chartOptions] = useState({
    plugins: {
      title: {
        display: true,
        text: "Users Gained between 2016-2020",
      },
      legend: {
        display: false,
      },
    },
    tension: 0.4,
    animation: {
      delay: 1200,
    },
  });
  // Functions
  const getRecentEmails = async () => {
    const res = await get(enviroment.API_URL + "/api/users/emails/3");
    setEmails(res.emails);
  };
  const getAllAccounts = async () => {
    const res = await get(enviroment.API_URL + "/api/users/accounts");
    setUsers(res.users);
  };
  const getAllLikes = async () => {
    const res = await get(enviroment.API_URL + "/api/users/alllikes");
    setLikes(res.likes);
  };
  // Effects
  useEffect(() => {
    getRecentEmails();
    getAllAccounts();
    getAllLikes();
  }, []);
  return (
    <div
      className={`dashboard relative flex ${
        lang === "AR" ? "flex-row-reverse" : "flex-row"
      }  font-mont`}
    >
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-transparent to-black"></div>
      {/* nav */}
      <DashbNav />
      <div
        className={`${
          darkMode ? "backdrop-blur-sm" : "bg-[#ebebeb]"
        } overflow-scroll w-[70%] z-20 text-white p-5`}
      >
        <div className="mt-8" dir={lang === "AR" ? "rtl" : "ltr"}>
          <h2
            className={`${
              darkMode ? "text-white" : "text-black"
            } text-3xl font-extrabold`}
          >
            {lang === "AR" ? "لوحه التحكم" : "Dashboard"}
          </h2>
          <hr
            className={`${
              darkMode ? "bg-white" : "bg-black"
            } border-none h-[1px]`}
          />
          <span className={`${darkMode ? "text-white/60" : "text-black"}`}>
            {lang === "AR" ? "تحديثات الدفع" : "Payment updates"}
          </span>
          <div className="flex xs:flex-col lg:flex-row gap-4">
            <ScrollAnimation
              className="xs:w-full lg:w-1/3"
              offset={10}
              animateOnce
              animateIn="animate__flipInX animate__animated"
              scrollableParentSelector="#root"
            >
              <div className="text-center shadow-xl bg-white text-black p-4 rounded-md space-y-1">
                <div className="rounded-full text-white bg-black w-fit mx-auto p-3">
                  <GiReceiveMoney size={35} className="mx-auto" />
                </div>
                <span className="font-extrabold text-3xl block">$1200</span>
                <p className="text-black/70">
                  {lang === "AR" ? "23% هذا الاسبوع" : "23% this week"}
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              className="xs:w-full lg:w-1/3"
              offset={10}
              delay={200}
              animateOnce
              animateIn="animate__flipInX animate__animated"
              scrollableParentSelector="#root"
            >
              <div className="text-center shadow-xl bg-white text-black p-4 rounded-md space-y-1">
                <div className="rounded-full text-yellow-500 bg-black w-fit mx-auto p-3">
                  <RiMoneyDollarCircleFill size={35} className="mx-auto" />
                </div>
                <span className="font-extrabold text-3xl block">$2400</span>
                <p className="text-black/70">
                  {lang === "AR" ? "52% هذا الشهر" : "52% this month"}
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              className="xs:w-full lg:w-1/3"
              offset={10}
              delay={300}
              animateOnce
              animateIn="animate__flipInX animate__animated"
              scrollableParentSelector="#root"
            >
              <div className="text-center shadow-xl bg-white text-black p-4 rounded-md space-y-1">
                <div className="rounded-full text-green-600 bg-black w-fit mx-auto p-3">
                  <GiTakeMyMoney size={35} className="mx-auto" />
                </div>
                <span className="font-extrabold text-3xl block">$4800</span>
                <p className="text-black/70">
                  {lang === "AR" ? "32% هذا العام" : "32% this year"}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
        <div
          dir={lang === "AR" ? "rtl" : "ltr"}
          className="flex xs:flex-col-reverse lg:flex-row mt-12 justify-between"
        >
          <div className="flex xs:flex-row lg:flex-col justify-between xs:w-full lg:w-[33%]">
            <ScrollAnimation
              initiallyVisible={window.screen.width >= 1025 ? false : true}
              delay={600}
              className={`shadow-xl flex flex-col justify-center bg-white text-black p-4 rounded-md space-y-1 xs:w-[47%] lg:w-full xs:h-full lg:h-[48%]`}
              animateIn="animate__animated animate__jackInTheBox"
              scrollableParentSelector="#root"
            >
              <h3 className="font-bold flex items-center">
                <span className="mx-1">
                  {lang === "AR" ? "العملاء الجدد" : "New clients"}
                </span>
                <GrUserExpert />
              </h3>
              <span className="font-extrabold text-5xl text-blue-600">
                {user.length}
              </span>
            </ScrollAnimation>
            <ScrollAnimation
              initiallyVisible={window.screen.width >= 1025 ? false : true}
              delay={700}
              className={`shadow-xl flex flex-col justify-center bg-white text-black p-4 rounded-md space-y-1 xs:w-[47%] lg:w-full xs:h-full lg:h-[48%]`}
              animateIn="animate__animated animate__jackInTheBox"
              scrollableParentSelector="#root"
            >
              <h3 className="font-bold flex items-center">
                <span className="mx-1">
                  {lang === "AR" ? "إجمالي الإعجابات" : "Total Likes"}
                </span>
                <BiLike />
              </h3>
              <span className="font-extrabold text-5xl text-blue-600">
                {likes}
              </span>
            </ScrollAnimation>
          </div>
          <ScrollAnimation
            initiallyVisible={window.screen.width >= 1025 ? false : true}
            delay={900}
            className="xs:w-full lg:w-[65%] xs:mb-5 lg:mb-0 h-full overflow-auto shadow-xl bg-white text-black rounded-md"
            animateIn="animate__animated animate__fadeInRight"
            scrollableParentSelector="#root"
          >
            <div className="flex xs:flex-col sm:flex-row justify-between p-3">
              <h2 className="font-bold text-xl">
                {lang === "AR" ? "الربح" : "Revenue"}
              </h2>
              <p className="text-black/70">
                {lang === "AR" ? "اخر سبعه ايام" : "Last 7 days VS prior week"}
              </p>
            </div>
            <div className="p-5">
              <Line data={chartData} options={chartOptions} />
            </div>
          </ScrollAnimation>
        </div>
        <ScrollAnimation
          initiallyVisible={window.screen.width >= 1025 ? false : true}
          delay={1200}
          animateIn="animate__animated animate__fadeInUp"
          scrollableParentSelector="#root"
        >
          <div className="flex shadow-xl flex-col justify-between bg-white text-black rounded-md p-5 mt-5">
            <h3
              dir={lang === "AR" ? "rtl" : "ltr"}
              className="font-bold text-2xl"
            >
              {lang === "AR"
                ? "رسائل البريد الإلكتروني الأخيرة"
                : "Recent Emails"}
            </h3>
            <div className="space-y-4 divide-y-2">
              {emails?.map(({ name, sentAt, message, avatar }, i) => (
                <div
                  key={i}
                  className="flex xs:flex-col lg:flex-row pt-5 mt-3 items-center justify-between"
                >
                  <img
                    className="w-[35px] h-[35px] rounded-full object-cover border border-black/70"
                    src={
                      avatar === "default" || avatar === ""
                        ? userr
                        : Pako.inflate(avatar, { to: "string" })
                    }
                    alt="profile"
                  />
                  <p className="text-black/70">{name.slice(0, 10)}</p>
                  <p className="text-black/70">
                    {message.slice(0, 10) + "..."}
                  </p>
                  <p className="text-black/70">{sentAt}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default Dashboard;
