import React, { useRef, useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jwt-decode";
import { enviroment } from "../enviroment";

const SignIn = () => {
  // Utilites
  const navigate = useNavigate();
  // Refs
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  // States
  const [isLoading, setIsLoading] = useState(false);
  // Functions
  const logIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = enviroment.API_URL + "/api/auth/";
      const res = await axios.post(url, {
        email: email?.current?.value,
        password: password?.current?.value,
      });
      setIsLoading(false);
      toast.success(res.data.message + "!");
      localStorage.setItem("token", JSON.stringify(res.data.token));
      const user: any = jwt(res.data.token);
      setTimeout(() => {
        user.email === "admin@gmail.com" && user.password === "admin"
          ? navigate("/dashboard")
          : navigate("/");
      }, 1000);
    } catch (err: any) {
      if (err.response.status === 401) {
        setTimeout(() => {
          setIsLoading(false);
          toast.error(err.response.data.message + "!");
        }, 1500);
      }
    }
  };

  return (
    <div className="signin relative flex justify-center items-center">
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-l from-transparent to-black"></div>

      {/* Loader */}
      {isLoading && (
        <div className="fixed w-full h-full bg-black/60 z-50 grid place-items-center">
          <Loader />
        </div>
      )}

      <motion.div
        className="text-white relative z-10 bg-black/80 xs:p-10 sm:p-20 max-w-1/3 h-fit space-y-6 rounded-md border shadow-2xl"
        initial={{ y: "-80vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        exit={{ x: "100vh", transition: { duration: 0.5 } }}
      >
        <motion.h1
          className="font-bold text-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6 }}
        >
          LOGIN
        </motion.h1>
        <form action="" className="space-y-2">
          <motion.div
            className="flex bg-slate-500 p-2 rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.2 }}
          >
            <AiOutlineMail size={30} />
            <input
              type="email"
              placeholder="Email"
              className="ml-2 w-full border-none outline-none bg-transparent"
              ref={email}
            />
          </motion.div>
          <motion.div
            className="flex bg-slate-500 p-2 rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.4 }}
          >
            <AiOutlineLock size={30} />
            <input
              type="password"
              placeholder="***********"
              className="ml-2 w-full border-none outline-none bg-transparent"
              ref={password}
            />
          </motion.div>
          <motion.div
            className="checkbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.6 }}
          >
            <input type="checkbox" id="remember" />
            <span className="checkbox_span"></span>
            <label className="text-white/70" htmlFor="remember">
              {" "}
              Remember me
            </label>
          </motion.div>

          <motion.button
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.8 }}
            onClick={logIn}
          >
            <div className="btn btn-one text-center p-2">
              <p className="relative z-30">LOGIN</p>
            </div>
          </motion.button>
        </form>
        <motion.p
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
        >
          Not a member?{" "}
          <Link to={"/signup"} className="underline">
            Sign up now
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignIn;
