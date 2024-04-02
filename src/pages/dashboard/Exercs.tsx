import React, { useEffect, useRef, useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import axios from "axios";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";
import { enviroment } from "../../enviroment";
import { Exercise } from "../../types/exercise";
const DashbNav = lazy(() => import("../../components/DashbNav"));

const Exercs = () => {
  // Utilites
  const navigate = useNavigate();
  // States
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Global States
  const lang = useSelector((state: any) => state.theme.language);
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  // Refs
  const name = useRef<HTMLInputElement>(null);
  const desc = useRef<HTMLInputElement>(null);
  const imgURL = useRef<HTMLInputElement>(null);
  const vidLink = useRef<HTMLInputElement>(null);
  // Functions
  const getAllExercises = async () => {
    try {
      setError("");
      const res = await axios.get(enviroment.API_URL + "/api/exercises");
      setExercises(res.data.exers);
    } catch (error) {
      setError("No Data Found!");
    }
  };
  const openDeleteModal = (name: string) => {
    if (lang !== "AR")
      swal
        .fire({
          icon: "warning",
          title: "Are you sure?",
          text: "exercise will be deleted permanently",
          showCancelButton: true,
        })
        .then((res) => {
          if (res.isConfirmed) deleteExercise(name);
        });
    else
      swal
        .fire({
          icon: "warning",
          title: "هل انت متأكد ؟",
          text: "سوف تقوم بمسح التمرين نهائيا",
          showCancelButton: true,
        })
        .then((res) => {
          if (res.isConfirmed) deleteExercise(name);
        });
  };
  const openAddModal = () => {
    setOpen(true);
  };
  const addExercise = async () => {
    setIsLoading(true);
    try {
      await axios.post(enviroment.API_URL + "/api/exercises/addExercise", {
        name: name?.current?.value,
        description: desc?.current?.value,
        img: imgURL?.current?.value,
        vid: vidLink?.current?.value,
      });
      getAllExercises();
      setIsLoading(false);
      toast.success("Champion added successfully!");
      setOpen(false);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message);
      setOpen(false);
    }
  };
  const deleteExercise = async (name: string) => {
    try {
      await axios.post(enviroment.API_URL + "/api/exercises/deleteExercise", {
        name,
      });
      getAllExercises();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  // Effects
  useEffect(() => {
    getAllExercises();
  }, []);

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
          className={`${
            darkMode ? "backdrop-blur-sm" : "bg-[#ebebeb]"
          } text-white z-20 w-[70%] overflow-scroll`}
        >
          <div className="mt-8 p-5">
            <h2
              dir={lang === "AR" ? "rtl" : "ltr"}
              className={`${
                darkMode ? "text-white" : "text-black"
              } text-2xl font-mont`}
            >
              {lang === "AR" ? "التمارين المعروضه" : "Displayed Exercises"}
            </h2>
          </div>
          <div className="grid xs:space-y-4 lg:space-y-0 xs:grid-cols-1 lg:grid-cols-2">
            {error && (
              <div className="p-5 bg-red-700 text-white rounded-lg">
                {error}
              </div>
            )}
            {exercises?.map((exer, index) => (
              <ScrollAnimation
                delay={index * 100}
                animateIn="animate__animated animate__rollIn"
                className={`xs:w-[200px] sm:w-[300px] h-fit ${
                  darkMode ? "bg-transparent" : "bg-white shadow-xl"
                } mx-auto border rounded-lg overflow-hidden space-y-3`}
                key={exer._id}
              >
                <img
                  className="w-full h-[200px] object-cover"
                  src={exer.img}
                  alt={exer.name}
                />
                <div className="text-center">
                  <h4
                    className={`${
                      darkMode ? "text-white" : "text-black"
                    } text-2xl font-bold`}
                  >
                    {exer.name}
                  </h4>
                  <p
                    className={`${darkMode ? "text-white" : "text-black"} my-4`}
                  >
                    {exer.description.slice(0, 90) + "..."}
                  </p>
                </div>
                <div className="flex justify-evenly pb-4">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/edit/${exer.name}`, {
                        state: { type: "exer" },
                      })
                    }
                    className="btnfos btnfos-4 bg-blue-600 text-white rounded-full border-2 w-[45%] border-blue-700 p-2"
                  >
                    {lang === "AR" ? "تعديل" : "Edit"}
                  </button>
                  <button
                    onClick={() => openDeleteModal(exer.name)}
                    className="btnfos btnfos-4 bg-blue-600 text-white rounded-full border-2 w-[45%] border-blue-700 p-2"
                  >
                    {lang === "AR" ? "حذف" : "Delete"}
                  </button>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className="bg-white p-5 space-y-4 absolute left-1/2 top-1/2 translate-x-[-50%] w-[400px] translate-y-[-50%]">
              <input
                ref={name}
                type="text"
                className="outline-none p-2 w-full border border-black rounded-md"
                placeholder="Name"
              />
              <input
                ref={desc}
                type="text"
                className="outline-none p-2 w-full border border-black rounded-md"
                placeholder="Descripition"
              />
              <input
                ref={imgURL}
                type="text"
                className="outline-none p-2 w-full border border-black rounded-md"
                placeholder="Image URL"
              />
              <input
                ref={vidLink}
                type="text"
                className="outline-none p-2 w-full border border-black rounded-md"
                placeholder="Video Link"
              />
              <button
                onClick={addExercise}
                className="bg-black text-white p-2 rounded-md"
              >
                Add Champ
              </button>
            </Box>
          </Fade>
        </Modal>
      </div>
      {/* Add Champ Btn */}
      <button
        onClick={openAddModal}
        style={{ position: "fixed" }}
        className={`btnfos btnfos-4 bg-blue-600 text-white bottom-5 ${
          lang === "AR" ? "left-5" : "right-5"
        } p-5 border rounded-md z-30`}
      >
        {lang === "AR" ? "أضافه تمرين جديد" : "Add New Exercise"}
      </button>
    </>
  );
};

export default Exercs;
