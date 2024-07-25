import React, { useRef } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import useUser from "../hooks/useUser";
import { IonContent, IonPage } from "@ionic/react";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();
  // Refs
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  // States
  // Functions
  const { logIn, isLoading } = useUser();

  return (
    <IonPage>
      <IonContent>
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
              {t("general.LOGIN")}
            </motion.h1>
            <form action="" className="space-y-2">
              <motion.div
                className="flex bg-slate-500 p-2 rounded-sm gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.2 }}
              >
                <AiOutlineMail size={30} />
                <input
                  type="email"
                  placeholder={t("general.Email")}
                  className="w-full border-none outline-none bg-transparent"
                  ref={email}
                />
              </motion.div>
              <motion.div
                className="flex gap-2 bg-slate-500 p-2 rounded-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.4 }}
              >
                <AiOutlineLock size={30} />
                <input
                  type="password"
                  placeholder="***********"
                  className="w-full border-none outline-none bg-transparent"
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
                  {t("Login.Remember me")}
                </label>
              </motion.div>

              <motion.button
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.8 }}
                onClick={(e) =>
                  logIn(e, {
                    email: email?.current?.value || "",
                    password: password?.current?.value || "",
                  })
                }
              >
                <div className="btn btn-one text-center p-2">
                  <p className="relative z-30">{t("general.LOGIN")}</p>
                </div>
              </motion.button>
            </form>
            <motion.p
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}
            >
              {t("Login.Not a member?")}
              <Link to={"/signup"} className="underline">
                {t("Login.Sign up now")}
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
