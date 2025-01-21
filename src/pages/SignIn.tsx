import React, { useRef } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { IonContent, IonPage } from "@ionic/react";
import { t } from "i18next";
import useUser from "../hooks/useUser/useUser";
import { useGoogleLogin } from "@react-oauth/google";
import useRest from "../hooks/useRest/useRest";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

const SignIn = () => {
  // Refs
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  // States
  // Functions
  const { logIn, isLoading } = useUser();
  const { get } = useRest();
  async function initiateGoogleThirdParty() {
    // if (isPlatform("hybrid")) {
    //   console.log("test");
    //   const user = await GoogleAuth.signIn();
    //   console.log("User info:", user);
    // } else {
    signInWithGoogle();
    // }
  }

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      console.log("tst");
      const googleUserData = await get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          Authorization: `Bearer ${res.access_token}`,
        }
      );
      logIn({
        email: googleUserData.email,
        thirdPartyAuthentication: "Google",
      });
    },
  });

  function signInNormally(e: { preventDefault: () => void }) {
    e.preventDefault();
    logIn({
      email: email?.current?.value || "",
      password: password?.current?.value || "",
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
            className="text-white relative z-10 bg-black/80 xs:p-10  xs:w-full md:w-1/2 lg:w-1/4 h-fit space-y-6 rounded-md border shadow-2xl"
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
                onClick={signInNormally}
              >
                <div className="btn btn-one text-center p-2">
                  <p className="relative z-30">{t("general.LOGIN")}</p>
                </div>
              </motion.button>
              {/* Continue with */}
              <div>
                <motion.h4
                  className="text-center mb-4 text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 3 }}
                >
                  {t("Login.Or continue with")}
                </motion.h4>
                <div className="flex flex-col gap-4">
                  <motion.button
                    className="bg-white text-black flex justify-center items-center gap-4 p-2"
                    onClick={initiateGoogleThirdParty}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="button"
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
            </form>
            <motion.p
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}
            >
              {t("Login.Not a member?")}{" "}
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
