import React, { useCallback, useEffect, useState, lazy } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enviroment } from "../../enviroment";
const DashbNav = lazy(() => import("../../components/DashbNav"));
interface RootState {
  theme: ThemeState;
}

interface ThemeState {
  darkMode: boolean;
  language: string;
}
const Edit = () => {
  // Utilites
  const { id } = useParams();
  const {
    state: { type },
  } = useLocation();
  const navigate = useNavigate();
  // States
  const [Name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Global States
  const lang = useSelector((state: RootState) => state.theme.language);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  // Functions
  const saveChanges = async () => {
    try {
      setIsLoading(true);
      if (type === "champ") {
        await axios.post(enviroment.API_URL + `/api/champs?id=${id}`, {
          name: Name,
          description: desc,
          img: url,
        });
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/champions");
      } else {
        await axios.put(enviroment.API_URL + `/api/exercises/${id}`, {
          name: Name,
          description: desc,
          img: url,
        });
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/exercises");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  const getData = useCallback(async () => {
    try {
      if (type === "champ") {
        console.log(id);
        const res = await axios.get(
          enviroment.API_URL + `/api/champs?id=${id}`,
        );
        console.log(res);
        setName(res?.data?.champ?.name);
        setDesc(res?.data?.champ?.description);
        setUrl(res?.data?.champ?.img);
      } else {
        console.log(id);
        const res = await axios.get(
          enviroment.API_URL + `/api/exercises/${id}`,
        );
        setName(res.data?.exer?.name);
        setDesc(res.data?.exer?.description);
        setUrl(res.data?.exer?.img);
      }
    } catch (err) {
      console.error(err);
    }
  }, [name, type]);
  // Effects

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <>
      <div
        className={`flex text-white dashboard relative ${
          lang === "AR" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Overlay Screen */}
        <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-transparent to-black"></div>
        {/* Loader */}
        {isLoading && (
          <div className="fixed w-full h-full bg-black/60 z-50 grid place-items-center">
            <Loader />
          </div>
        )}
        {/* nav */}
        <DashbNav />
        <div
          dir={lang === "AR" ? "rtl" : "ltr"}
          className={`${
            darkMode ? "backdrop-blur-sm" : "bg-[#ebebeb]"
          } space-y-6 p-12 text-white z-20 w-[70%] overflow-scroll`}
        >
          <button
            dir={lang === "AR" ? "rtl" : "ltr"}
            className={`flex font-mont group text-3xl items-center font-bold relative hover:before:w-[100px] before:duration-300  before:w-[35px] before:h-[2px] ${
              darkMode
                ? "before:bg-white text-white"
                : "before:bg-black text-black"
            } before:bg-white before:bottom-0 before:absolute py-2`}
            onClick={() => window.history.back()}
          >
            <IoChevronBackOutline
              className={`absolute left-[-30px] ${
                darkMode ? "text-white" : "text-black"
              } group-hover:opacity-[1] opacity-0 duration-500`}
            />{" "}
            {lang === "AR" ? "الرجوع" : "Return"}
          </button>
          <div className="w-1/3 mx-auto border border-white">
            <img className="w-full" src={url} alt={Name} />
          </div>
          <div className="blue-xl">
            <label
              className={`${darkMode ? "text-white" : "text-black"} `}
              htmlFor=""
            >
              {lang === "AR" ? "الاسم" : "Name"}
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className="bg-white block outline-none text-black w-full border-l-8 border-l-blue-600 p-3"
              placeholder="Name"
              type="text"
            />
          </div>
          <div className="blue-xl">
            <label
              className={`${darkMode ? "text-white" : "text-black"} `}
              htmlFor=""
            >
              {lang === "AR" ? "رابط الصوره" : "Image URL"}
            </label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              className="bg-white block outline-none text-black w-full border-l-8 border-l-blue-600 p-3"
              placeholder="Image URL"
              type="text"
            />
          </div>
          <div className="blue-xl">
            <label
              className={`${darkMode ? "text-white" : "text-black"} `}
              htmlFor=""
            >
              {lang === "AR" ? "الوصف" : "Description"}
            </label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="Description"
              className="bg-white block outline-none text-black w-full border-l-8 border-l-blue-600 p-3"
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <button
            onClick={saveChanges}
            className="btnfos btnfos-4 bg-blue-600 text-white rounded-full border-2 xs:w-[150px] md:w-[25%] border-blue-700 p-2"
          >
            {lang === "AR" ? "حفظ التغييرات" : "SAVE CHANGES"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;
