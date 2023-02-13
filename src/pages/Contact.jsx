import React, { useState } from "react";
import Logo from "../components/Logo";
import { motion } from "framer-motion";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import { enviroment } from "../enviroment";

const Contact = () => {
  // States
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Functions
  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!message) {
      toast.error("Enter a message!");
      setIsLoading(false);
    } else {
      try {
        const token = localStorage.getItem("token");
        const user = jwtDecode(token);
        if (user) {
          await axios.post(
            enviroment.API_URL + "/api/users/contact",
            {
              email: user.email,
              message: message,
              avatar: "",
            }
          );
          toast.success("Sent successfully!");
          setIsLoading(false);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <>
      {isLoading && (
        <div className="fixed w-full h-full bg-black/60 z-50 grid place-items-center">
          <Loader />
        </div>
      )}
      <div className="contact relative flex justify-center items-center">
        {/* Overlay Screen */}
        <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-l from-transparent to-black/40 "></div>
        {/* Logo */}
        <Logo />
        <motion.div
          className="relative z-10 text-white text-center space-y-4"
          exit={{ y: "-100vh", transition: { duration: 0.5 } }}
        >
          <motion.h1
            className="text-3xl font-bold font-mont"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Give us your Feedback , <br /> so we can improve and enhance the
            features of our app!
          </motion.h1>
          <motion.span
            className="text-xl block italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            "Strive progress NOT perfection!"
          </motion.span>
        </motion.div>
      </div>
      <div className="flex justify-center items-center p-12 pt-16">
        <ScrollAnimation
          className="bg-white relative rounded-md xs:w-[450px] lg:w-[50%] p-6 contt "
          animateIn="animate__bounceInLeft"
        >
          <form className="">
            <div className="p-5 bg-[#795548] text-white text-center rounded-md w-[80%] absolute left-1/2 translate-x-[-50%] top-[-8%] font-mont">
              Get in Touch
            </div>
            <textarea
              value={message}
              onChange={({ target }) => setMessage(target.value)}
              className="pt-12 resize-none outline-none p-2 w-full block"
              placeholder="Your Message"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button
              onClick={sendMessage}
              className="bg-[#795548] whitespace-nowrap send text-white p-5 rounded-md"
            >
              SEND MESSAGE
            </button>
          </form>
        </ScrollAnimation>
      </div>
    </>
  );
};

export default Contact;
