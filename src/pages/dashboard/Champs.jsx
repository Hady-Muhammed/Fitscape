import React, { useEffect, useRef, useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { enviroment } from "../../enviroment";
const DashbNav = lazy(() => import("../../components/DashbNav"));

const Champs = () => {
  // Utilites
  const navigate = useNavigate();
  // Global States
  const darkMode = useSelector((state) => state.theme.darkMode);
  const lang = useSelector((state) => state.theme.language);
  // States
  const [champs, setChamps] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Refs
  const name = useRef();
  const desc = useRef();
  const imgURL = useRef();
  // Functions
  const getAllChampions = async () => {
    try {
      setError("");
      const res = await axios.get(enviroment.API_URL + "/api/champs");
      setChamps(res.data.champs);
    } catch (error) {
      setError("No Data Found!");
    }
  };

  const openDeleteModal = (name) => {
    if (lang !== "AR")
      swal
        .fire({
          icon: "warning",
          title: "Are you sure?",
          text: "champion will be deleted permanently",
          showCancelButton: true,
        })
        .then((res) => {
          if (res.isConfirmed) deleteChamp(name);
        });
    else
      swal
        .fire({
          icon: "warning",
          title: "هل انت متأكد ؟",
          text: "سوف تقوم بمسح البطل نهائيا",
          showCancelButton: true,
        })
        .then((res) => {
          if (res.isConfirmed) deleteChamp(name);
        });
  };

  const openAddModal = () => {
    setOpen(true);
  };

  const addChamp = async () => {
    setIsLoading(true);
    try {
      await axios.post(enviroment.API_URL + "/api/champs/addChamp", {
        name: name.current.value,
        description: desc.current.value,
        img: imgURL.current.value,
      });
      getAllChampions();
      setIsLoading(false);
      toast.success("Champion added successfully!");
      setOpen(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
      setOpen(false);
    }
  };

  const deleteChamp = async (name) => {
    try {
      await axios.post(enviroment.API_URL + "/api/champs/deleteChamp", {
        name,
      });
      getAllChampions();
    } catch (err) {
      toast.error(err.message);
    }
  };
  // Effects
  useEffect(() => {
    getAllChampions();
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
              {lang === "AR" ? "الابطال المعروضين" : "Displayed Champions"}
            </h2>
          </div>
          <div className="grid xs:space-y-4 lg:space-y-0 xs:grid-cols-1 lg:grid-cols-2">
            {error && (
              <div className="p-5 bg-red-700 text-white rounded-lg">
                {error}
              </div>
            )}
            {champs?.map((champ, index) => (
              <ScrollAnimation
                delay={index * 100}
                animateIn="animate__animated animate__fadeInUp"
                scrollableParentSelector="#root"
                className={`xs:w-[200px] sm:w-[300px] h-fit ${
                  darkMode ? "bg-transparent" : "bg-white shadow-xl"
                } mx-auto border rounded-lg overflow-hidden space-y-5`}
                key={champ._id}
              >
                <img
                  className="w-full h-[200px] object-cover"
                  src={champ.img}
                  alt={champ.name}
                />
                <div className="text-center">
                  <h4
                    className={`${
                      darkMode ? "text-white" : "text-black"
                    } text-2xl font-bold`}
                  >
                    {champ.name}
                  </h4>
                  <p
                    className={`${darkMode ? "text-white" : "text-black"} my-4`}
                  >
                    {champ.description.slice(0, 90) + "..."}
                  </p>
                </div>
                <div className="flex justify-around p-3">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/edit/${champ.name}`, {
                        state: { type: "champ" },
                      })
                    }
                    className="btnfos btnfos-4 bg-blue-600 text-white rounded-full border-2 w-[45%] border-blue-700 p-2"
                  >
                    <span>{lang === "AR" ? "تعديل" : "Edit"}</span>
                  </button>
                  <button
                    onClick={() => openDeleteModal(champ.name)}
                    className="btnfos btnfos-4 bg-blue-600 text-white rounded-full border-2 w-[45%] border-blue-700 p-2"
                  >
                    <span>{lang === "AR" ? "حذف" : "Delete"}</span>
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
              <button
                onClick={addChamp}
                className="bg-black text-white p-2 rounded-md"
              >
                Add Champ
              </button>
            </Box>
          </Fade>
        </Modal>
      </div>
      {/* Add New Champ Btn */}
      <button
        onClick={openAddModal}
        style={{ position: "fixed" }}
        className={`fixed bg-blue-600 btnfos btnfos-4 text-white bottom-5 ${
          lang === "AR" ? "left-5" : "right-5"
        } p-5 border rounded-md z-30`}
      >
        <span>{lang === "AR" ? "أضافه بطل جديد" : "Add New Champion"}</span>
      </button>
    </>
  );
};

export default Champs;
