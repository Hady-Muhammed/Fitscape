import React, { MouseEventHandler, useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enviroment } from "../enviroment";

const SignUp = () => {
  // Utilites
  const navigate = useNavigate();
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorTerms, setErrorTerms] = useState("");
  // Refs
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const acceptTerms = useRef<HTMLInputElement>(null);
  // Functions
  const createUser: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setErrorName("");
      setErrorTerms("");
      setErrorPass("");
      const url = enviroment.API_URL + "/api/users/";
      const res = await axios.post(
        url,
        JSON.stringify({
          name: name?.current?.value,
          email: email?.current?.value,
          password: password?.current?.value,
          acceptTerms: acceptTerms?.current?.checked,
          liked: false,
          avatar: "default",
          createdAt: new Date().toLocaleDateString().toString(),
          workouts: [],
        }),
        { headers: { "Content-Type": "application/json" } },
      );
      if (res.data.message === "That user already exists") {
        setIsLoading(false);
        toast.error("User already exists!");
      } else if (res.data.message === "User created successfully") {
        setIsLoading(false);
        toast.success("User created successfully!");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    } catch (err) {
      const error = err as {
        response?: { data?: string | { message: string } } | undefined;
      };
      if (
        error?.response?.data ===
        '"name" length must be at least 5 characters long'
      ) {
        setIsLoading(false);
        setErrorName("Must be at least 5 characters!");
      } else if (
        error.response?.data ===
        '"password" length must be at least 5 characters long'
      ) {
        setIsLoading(false);
        setErrorPass("Must be at least 5 characters!");
      } else if (error.response?.data === '"acceptTerms" must be [true]') {
        setIsLoading(false);
        setErrorTerms("Must be checked!");
      } else if (
        typeof error.response?.data === "object" && // Check if data is an object
        "message" in error.response.data && // Check if data has a message property
        error.response?.data?.message === "That user already exists!"
      ) {
        setTimeout(() => {
          let msg: string | undefined;
          if (
            typeof error.response?.data === "object" &&
            "message" in error.response.data
          ) {
            msg = error.response.data.message;
          } else {
            msg = undefined;
          }
          setIsLoading(false);
          toast.error(msg);
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
        className="text-white relative z-10 bg-black/80 xs:p-10 sm:p-14 max-w-1/3 h-fit space-y-6 rounded-md border shadow-2xl"
        initial={{ y: "-80vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        exit={{ x: "-100vh", transition: { duration: 0.5 } }}
      >
        <motion.h1
          className="font-bold text-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6 }}
        >
          CREATE AN ACCOUNT
        </motion.h1>
        <motion.p
          className="text-white/50 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6 }}
        >
          Want to sign up fill out this form
        </motion.p>
        {/* target="cont" method="POST" action="/api/users" */}
        <form className="space-y-2">
          <motion.div
            className="flex bg-slate-500 p-2 rounded-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          >
            <AiOutlineUser size={30} />
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="ml-2 w-full border-none outline-none bg-transparent"
              required
              ref={name}
            />
          </motion.div>
          {errorName && (
            <div className="text-white bg-red-600 p-1 text-sm italic text-center">
              {errorName}
            </div>
          )}
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
              name="email"
              className="ml-2 w-full border-none outline-none bg-transparent"
              pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,4}"
              title="johndoe@xxxx.com"
              required
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
              name="password"
              className="ml-2 w-full border-none outline-none bg-transparent"
              required
              ref={password}
            />
          </motion.div>
          {errorPass && (
            <div className="text-white bg-red-600 p-1 text-sm italic text-center">
              {errorPass}
            </div>
          )}
          <motion.div
            className="checkbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.6 }}
          >
            <input type="checkbox" id="remember" required ref={acceptTerms} />
            <span className="checkbox_span"></span>
            <label className="text-white/70 select-none" htmlFor="remember">
              I accept all the terms and conditions
            </label>
          </motion.div>
          {errorTerms && (
            <div className="text-white bg-red-600 p-1 text-sm italic text-center">
              {errorTerms}
            </div>
          )}
          <motion.button
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.8 }}
            onClick={createUser}
            type="submit"
          >
            <div className="btn btn-one text-center p-2">
              <p className="relative z-30">SIGNUP</p>
            </div>
          </motion.button>
        </form>
        <motion.p
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
        >
          Have an account?{" "}
          <Link to={"/signin"} className="underline">
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;
