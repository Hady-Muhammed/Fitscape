import jwtDecode from "jwt-decode";
import { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import useRest from "../useRest/useRest";
import { Token } from "../../types/token";
import { enviroment } from "../../enviroment";
import { t } from "i18next";

function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorTerms, setErrorTerms] = useState("");
  const { post, get } = useRest();
  const history = useHistory();

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      toast.success(t("general.Logged out successfully!"));
      setIsLoading(false);
      history.push("/signin");
    }, 3000);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logIn = async ({ email, password, thirdPartyAuthentication }: any) => {
    setIsLoading(true);

    try {
      const url = enviroment.API_URL + "/api/auth/";
      const res = await post(url, {
        email,
        ...(thirdPartyAuthentication
          ? { thirdPartyAuthentication }
          : { password }),
      });
      setIsLoading(false);
      toast.success(t(`general.${res.message + "!"}`));
      localStorage.setItem("token", JSON.stringify(res.token));
      const user = jwtDecode(res.token) as Token;
      // setTimeout(() => {
      user.email === "admin@gmail.com" && user.password === "admin"
        ? history.push("/dashboard")
        : history.push("/");
      // }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.status === 401) {
        setTimeout(() => {
          setIsLoading(false);
          toast.error(err.message + "!");
        }, 1500);
      }
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token") || "";

      const { email } = jwtDecode(token) as Token;
      const res = await get(enviroment.API_URL + `/api/users/${email}`);
      return { name: res.user.name, email: res.user.email };
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    if (!message) {
      toast.error("Enter a message!");
      setIsLoading(false);
    } else {
      try {
        const token = localStorage.getItem("token") || "";

        const user = jwtDecode(token) as Token;
        if (user) {
          await post(enviroment.API_URL + "/api/users/contact", {
            email: user.email,
            message: message,
            avatar: "",
          });
          toast.success("Sent successfully!");
          setIsLoading(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    }
  };

  const likeTheApp = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const { email } = jwtDecode(token) as { email: string };
      await post(enviroment.API_URL + "/api/users/like", {
        email,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        // Handle other types of errors
        console.error("An unknown error occurred:", err);
      }
    }
  };

  const checkLiked = async () => {
    const token = localStorage.getItem("token") || "";
    const { email } = jwtDecode(token) as { email: string };
    const res = await get(enviroment.API_URL + `/api/users/isLiked/${email}`);

    return res?.liked ? true : false;
  };

  const signUp = async ({
    name,
    email,
    password,
    acceptTerms,
    avatar,
    thirdPartyAuthentication,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => {
    setIsLoading(true);
    try {
      setErrorName("");
      setErrorTerms("");
      setErrorPass("");
      const url = enviroment.API_URL + "/api/users/";
      const res = await post(url, {
        name: thirdPartyAuthentication ? name : name?.current?.value,
        email: thirdPartyAuthentication ? email : email?.current?.value,
        password: thirdPartyAuthentication
          ? "default"
          : password?.current?.value,
        acceptTerms: thirdPartyAuthentication
          ? true
          : acceptTerms?.current?.checked,
        liked: false,
        avatar: avatar ? avatar : "default",
        createdAt: new Date().toLocaleDateString().toString(),
        workouts: [],
        ...(thirdPartyAuthentication && { thirdPartyAuthentication }),
      });
      if (res.message === "User created successfully") {
        setIsLoading(false);
        toast.success("User created successfully!");
        setTimeout(() => {
          history.push("/signin");
        }, 3000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.message === '"name" length must be at least 5 characters long') {
        setIsLoading(false);
        setErrorName("Must be at least 5 characters!");
      } else if (
        err?.message === '"password" length must be at least 5 characters long'
      ) {
        setIsLoading(false);
        setErrorPass("Must be at least 5 characters!");
      } else if (err?.message === '"acceptTerms" must be [true]') {
        setIsLoading(false);
        setErrorTerms("Must be checked!");
      } else if (err?.message === "That user already exists!") {
        setIsLoading(false);
        toast.error("User already exists!");
      }
    }
  };

  return {
    isLoading,
    errorName,
    errorPass,
    errorTerms,
    signUp,
    logout,
    logIn,
    likeTheApp,
    sendMessage,
    checkLiked,
    getUser,
  };
}

export default useUser;
