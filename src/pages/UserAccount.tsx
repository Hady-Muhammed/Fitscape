import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import userr from "../assets/user.jpg";
import jwtDecode from "jwt-decode";
import { BsCheckCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { GiCheckMark } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { enviroment } from "../enviroment";
import Pako, { Data } from "pako";
import { Token } from "../types/token";
import ScrollReveal from "../animations/ScrollReveal";
import { IonContent, IonPage } from "@ionic/react";
import Footer from "../components/Footer";
import LanguagePicker from "../components/LanguagePicker";
import { t } from "i18next";
import useUser from "../hooks/useUser/useUser";
import useRest from "../hooks/useRest/useRest";

const UserAccount = () => {
  // States
  const [workoutsDone, setWorkoutsDone] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const [disabled, setDisabled] = useState(true);
  const { put, get, post } = useRest();
  // Functions
  const { getUser } = useUser();
  const getWorkoutsDone = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as Token;
      const res = await get(
        enviroment.API_URL + `/api/users/getAllWorkouts/${email}`,
      );
      setWorkoutsDone(res?.workouts?.length);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as Token;
      const file: File | undefined = e.target.files?.[0];
      const base64String = file && (await fileToBase64(file));
      const compressedString = Pako.gzip(base64String as string | Data);
      await post(enviroment.API_URL + "/api/users/uploadImg", {
        email,
        file: compressedString,
      });
      getAvatar();
    } catch (err) {
      toast.error("Picture is too large");
    }
  };

  const getAvatar = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as Token;
      const res = await get(
        enviroment.API_URL + `/api/users/getAvatar/${email}`,
      );
      const image = Pako.inflate(res?.avatar, { to: "string" });
      setAvatar(image);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as Token;
      if (password !== "123456") {
        await put(enviroment.API_URL + `/api/users/`, {
          email,
          name,
          password,
        });
      } else {
        await put(enviroment.API_URL + `/api/users/`, {
          email,
          name,
        });
      }
      Swal.fire(
        "Updated Successfully!",
        "your info has been edited",
        "success",
      );
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  // Effects
  useEffect(() => {
    getWorkoutsDone();
    getAvatar();
    getUser().then((user) => {
      setName(user?.name);
      setEmail(user?.email);
    });
  }, []);
  return (
    <IonPage>
      <IonContent>
        <div className="bg-cover flex justify-center items-center acc relative">
          {/* Overlay Screen */}
          <div className="absolute w-full h-full left-0 top-0 bg-[#221713]/90"></div>
          {/* Logo */}
          <Logo />
          <ScrollReveal animationName="fadeInUp">
            <div className="relative rounded-md shadow-md shadow-yellow-700 border-r-4 border-r-yellow-700 p-5 xs:w-[300px] sm:w-[400px] bg-white z-10">
              {/* Circle */}
              <div className="absolute left-0 top-0 w-[60px] h-[60px] bg-yellow-700 zz"></div>
              <div className="group bg-black rounded-full border-2 w-[100px] h-[100px] border-[#795548] overflow-hidden absolute top-[-40px] left-1/2 translate-x-[-50%]">
                <div className="relative group h-full">
                  <label className="absolute flex justify-center items-center bg-black/60 cursor-pointer text-white font-mont left-0 top-0 opacity-0 duration-500 group-hover:opacity-[1] border-none outline-none w-full h-full">
                    {t("general.upload")}
                    <input
                      multiple={false}
                      type="file"
                      name="avatar"
                      onChange={uploadAvatar}
                      className="hidden"
                    />
                  </label>
                  <img
                    className="w-full h-full"
                    src={avatar === "default" || avatar === "" ? userr : avatar}
                    alt="userImg"
                  />
                </div>
              </div>
              <div className="text-black mt-14 font-bold flex flex-col items-center">
                <div className="flex items-center">
                  <p className="mr-1">{t("Account.Workouts Done")}</p>
                  <BsCheckCircleFill className="text-green-600" />
                </div>
                <span className="block italic text-xl font-mont">
                  {workoutsDone || 0}
                </span>
              </div>
              <LanguagePicker />
              <div className="border-t-2 border-t-[#795548] mt-5 py-5">
                <h3 className="font-bold text-xl mb-5 font-mont">
                  {t("Account.Personal Info")}
                </h3>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="block font-bold" htmlFor="">
                      {t("general.Name")}
                    </label>
                    <input
                      className={`block w-full py-2 outline-none border-b border-b-black`}
                      type="text"
                      onChange={(e) => {
                        setDisabled(false);
                        setName(e.target.value);
                      }}
                      value={name}
                    />
                  </div>
                  <div>
                    <label className="block font-bold" htmlFor="">
                      {t("general.Email")}
                    </label>
                    <input
                      className={`block w-full py-2 outline-none border-b border-b-black`}
                      type="email"
                      onChange={(e) => {
                        setDisabled(false);
                        setEmail(e.target.value);
                      }}
                      value={email}
                    />
                  </div>
                  <div>
                    <label className="block font-bold" htmlFor="">
                      {t("general.Password")}
                    </label>
                    <input
                      className={`block w-full py-2 outline-none border-b border-b-black`}
                      type="password"
                      onChange={(e) => {
                        setDisabled(false);
                        setPassword(e.target.value);
                      }}
                      value={password}
                    />
                  </div>
                  <button
                    disabled={disabled}
                    className={`group p-2 text-white ${
                      disabled ? "bg-yellow-700/30" : "bg-yellow-700"
                    } rounded-lg`}
                    onClick={updateUser}
                  >
                    <span className="inline-block ml-4 mr-2">
                      {t("general.Save Changes")}
                    </span>{" "}
                    <GiCheckMark
                      className={`group-hover:opacity-[1] group-hover:scale-[1.2] opacity-0 scale-50 duration-300 ${
                        disabled ? "hidden" : "inline-block"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default UserAccount;

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
