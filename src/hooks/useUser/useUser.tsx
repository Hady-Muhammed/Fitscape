import jwtDecode from "jwt-decode";
import { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import useRest from "../useRest/useRest";
import { Token } from "../../types/token";
import { enviroment } from "../../enviroment";

function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { post, get } = useRest();
  const history = useHistory();

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      toast.success("Logged out successfully!");
      setIsLoading(false);
      history.push("/signin");
    }, 3000);
  };

  const logIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { email, password }: { email: string; password: string },
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = enviroment.API_URL + "/api/auth/";
      const res = await post(url, {
        email,
        password,
      });
      setIsLoading(false);
      toast.success(res.message + "!");

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

  return {
    isLoading,
    logout,
    logIn,
    likeTheApp,
    sendMessage,
    checkLiked,
    getUser,
  };
}

export default useUser;
