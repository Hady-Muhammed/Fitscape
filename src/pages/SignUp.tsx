import React from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { IonContent, IonPage } from "@ionic/react";
import { t } from "i18next";
import { useGoogleLogin } from "@react-oauth/google";
import useRest from "../hooks/useRest/useRest";
import useUser from "../hooks/useUser/useUser";

const SignUp = () => {
  // Utilites
  const { get } = useRest();
  const { signUp, isLoading, errorName, errorPass, errorTerms } = useUser();
  // Refs
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const acceptTerms = useRef<HTMLInputElement>(null);
  // Functions

  const signUpWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      const googleUserData = await get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          Authorization: `Bearer ${res.access_token}`,
        },
      );
      console.log(googleUserData);
      signUp({
        name: googleUserData.name,
        email: googleUserData.email,
        avatar: googleUserData.picture,
        thirdPartyAuthentication: "Google",
      });
    },
  });

  function initiateGoogleThirdParty(): void {
    signUpWithGoogle();
  }

  function signUpNormally(e: { preventDefault: () => void }): void {
    e.preventDefault();
    signUp({
      name,
      email,
      password,
      acceptTerms,
    });
  }

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
            className="text-white relative z-10 bg-black/80 xs:p-10 sm:p-10 max-w-1/3 h-fit space-y-6 rounded-md border shadow-2xl"
            initial={{ y: "-80vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            exit={{ x: "-100vh", transition: { duration: 0.5 } }}
          >
            <motion.h1
              className="font-bold text-2xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              {t("Login.CREATE AN ACCOUNT")}
            </motion.h1>
            <motion.p
              className="text-white/50 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              {t("Login.Want to sign up fill out this form")}
            </motion.p>
            <form className="space-y-2">
              <motion.div
                className="flex bg-slate-500 p-2 rounded-sm gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
              >
                <AiOutlineUser size={30} />
                <input
                  type="text"
                  placeholder={t("general.Name")}
                  name="name"
                  className="w-full border-none outline-none bg-transparent"
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
                className="flex bg-slate-500 p-2 rounded-sm gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.2 }}
              >
                <AiOutlineMail size={30} />
                <input
                  type="email"
                  placeholder={t("general.Email")}
                  name="email"
                  className="w-full border-none outline-none bg-transparent"
                  pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,4}"
                  title="johndoe@xxxx.com"
                  required
                  ref={email}
                />
              </motion.div>
              <motion.div
                className="flex bg-slate-500 p-2 rounded-sm gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.4 }}
              >
                <AiOutlineLock size={30} />
                <input
                  type="password"
                  placeholder="***********"
                  name="password"
                  className="w-full border-none outline-none bg-transparent"
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
                transition={{ duration: 1, delay: 2.6 }}
              >
                <input
                  type="checkbox"
                  id="remember"
                  required
                  ref={acceptTerms}
                />
                <span className="checkbox_span"></span>
                <label className="text-white/70 select-none" htmlFor="remember">
                  {t("Login.I accept all the terms and conditions")}
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
                transition={{ duration: 1, delay: 2.8 }}
                onClick={signUpNormally}
                type="submit"
              >
                <div className="btn btn-one text-center p-2">
                  <p className="relative z-30">{t("Login.SIGNUP")}</p>
                </div>
              </motion.button>
            </form>
            {/* Continue with */}
            <div>
              <motion.h4
                className="text-center mb-4 text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
              >
                {t("Login.Or sign up with")}
              </motion.h4>
              <div className="flex flex-col gap-4">
                <motion.button
                  onClick={initiateGoogleThirdParty}
                  className="bg-white text-black flex justify-center items-center gap-4 p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 3.2 }}
                >
                  <img
                    className="w-6 h-6"
                    src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg"
                    alt=""
                  />
                  <span>Google</span>
                </motion.button>
              </div>
            </div>
            <motion.p
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
            >
              {t("Login.Have an account?")}{" "}
              <Link to={"/signin"} className="underline">
                {t("Login.Sign In")}
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
