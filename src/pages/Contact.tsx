import React, { useState } from "react";
import Logo from "../components/Logo";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import useUser from "../hooks/useUser";
import ScrollReveal from "../animations/ScrollReveal";
import { IonContent, IonPage } from "@ionic/react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  // States
  const [message, setMessage] = useState("");
  // Functions
  const { sendMessage, isLoading } = useUser();
  return (
    <IonPage>
      <IonContent>
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
              {t(
                "HeroSection.Give us your Feedback , so we can improve and enhance the features of our app!",
              )}
            </motion.h1>
            <motion.span
              className="text-xl block italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {t("HeroSection.Strive progress NOT perfection!")}
            </motion.span>
          </motion.div>
        </div>
        <div className="flex justify-center items-center p-12 pt-16">
          <ScrollReveal animationName="bounceInLeft">
            <div className="bg-white relative rounded-md xs:w-[300px] sm:w-[550px] p-6 contt ">
              <form className="">
                <div className="p-5 bg-[#795548] text-white text-center rounded-md w-[80%] absolute left-1/2 translate-x-[-50%] top-[-8%] font-mont">
                  {t("Contact.Get in Touch")}
                </div>
                <textarea
                  value={message}
                  onChange={({ target }) => setMessage(target.value)}
                  className="pt-12 resize-none outline-none p-2 w-full block"
                  placeholder={t("Contact.Your Message")}
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                ></textarea>
                <button
                  onClick={() => sendMessage(message)}
                  type="button"
                  className="bg-[#795548] whitespace-nowrap send text-white p-5 rounded-md"
                >
                  {t("Contact.SEND MESSAGE")}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Contact;
