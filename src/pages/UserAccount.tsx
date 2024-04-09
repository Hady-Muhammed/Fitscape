import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import userr from "../assets/user.jpg";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { BsCheckCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";
import ScrollAnimation from "react-animate-on-scroll";
import { GiCheckMark } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { enviroment } from "../enviroment";
import Pako, { Data } from "pako";
import { Token } from "../types/token";
import useUser from "../hooks/useUser";

const UserAccount = () => {
  // States
  const [workoutsDone, setWorkoutsDone] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const [disabled, setDisabled] = useState(true);
  // Functions
  const { getUser } = useUser();
  const getWorkoutsDone = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as Token;
      const res = await axios.get(
        enviroment.API_URL + `/api/users/getAllWorkouts/${email}`,
      );
      setWorkoutsDone(res?.data?.workouts?.length);
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
      await axios.post(enviroment.API_URL + "/api/users/uploadImg", {
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
      const res = await axios.get(
        enviroment.API_URL + `/api/users/getAvatar/${email}`,
      );
      const image = Pako.inflate(res?.data?.avatar, { to: "string" });
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
        await axios.post(enviroment.API_URL + `/api/users/updateUser/`, {
          email,
          name,
          password,
        });
      } else {
        await axios.post(enviroment.API_URL + `/api/users/updateUser/`, {
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
    <div className="bg-cover flex justify-center items-center acc relative">
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-[#221713]/90"></div>
      {/* Logo */}
      <Logo />
      <ScrollAnimation
        animateIn="animate__fadeInUp"
        className="relative rounded-md shadow-md shadow-yellow-700 border-r-4 border-r-yellow-700 p-5 xs:w-[300px] sm:w-[400px] bg-white z-10"
      >
        {/* Circle */}
        <div className="absolute left-0 top-0 w-[60px] h-[60px] bg-yellow-700 zz"></div>
        <div className="group bg-black rounded-full border-2 w-[100px] h-[100px] border-[#795548] overflow-hidden absolute top-[-40px] left-1/2 translate-x-[-50%]">
          <div className="relative group h-full">
            <label className="absolute flex justify-center items-center bg-black/60 cursor-pointer text-white font-mont left-0 top-0 opacity-0 duration-500 group-hover:opacity-[1] border-none outline-none w-full h-full">
              upload
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
            <p className="mr-1">Workouts Done</p>
            <BsCheckCircleFill className="text-green-600" />
          </div>
          <span className="block italic text-xl font-mont">
            {workoutsDone || 0}
          </span>
        </div>
        <div className="border-t-2 border-t-[#795548] mt-5 py-5">
          <h3 className="font-bold text-xl mb-5 font-mont">Personal Info</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block font-bold" htmlFor="">
                Name
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
                Email
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
                Password
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
              <span className="inline-block ml-4 mr-2">Save Changes</span>{" "}
              <GiCheckMark
                className={`group-hover:opacity-[1] group-hover:scale-[1.2] opacity-0 scale-50 duration-300 ${
                  disabled ? "hidden" : "inline-block"
                }`}
              />
            </button>
          </div>
        </div>
      </ScrollAnimation>
    </div>
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
