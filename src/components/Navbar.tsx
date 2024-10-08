import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { GiMuscleUp } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import useUtility from "../hooks/useUtility/useUtility";
import { t } from "i18next";

const Navbar = () => {
  // States
  const [open, setOpen] = useState(true);
  const [navColor, setNavColor] = useState(false);
  const [hideNavBar, setHideNavBar] = useState(false);
  const { scrollToTop } = useUtility();
  // Functions
  function handleNavColor() {
    setNavColor(true);
    window.onscroll = () => {
      if (window.scrollY >= 100) {
        setNavColor(true);
      } else {
        setNavColor(false);
      }
    };
  }
  const location = useLocation();
  // Effects
  useEffect(() => {
    handleNavColor();
  }, []);
  useEffect(() => {
    // Update currentPath to trigger a rerender when the route changes
    const route = location.pathname;
    setHideNavBar(route === "/signin" || route === "/signup");
    scrollToTop();
  }, [location]);
  return (
    !hideNavBar && (
      <>
        <motion.button
          initial={{ x: -800 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 2, type: "spring", stiffness: 100 }}
          onClick={() => setOpen((prev) => !prev)}
          className="fixed left-0 top-[25%] p-5 z-50 bg-white border border-black"
        >
          <AnimatePresence>
            {open ? <IoMdClose size={30} /> : <GiMuscleUp size={30} />}
          </AnimatePresence>
        </motion.button>
        <nav
          className={`${
            open
              ? "opacity-[1] pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } ${
            navColor ? "backdrop-blur-2xl" : "backdrop-blur-none"
          } fixed z-40 xs:left-2 md:left-10 xs:top-20 xl:top-1/2 -translate-y-1/2 text-white text-center duration-300 xs:p-5 md:p-12 rounded-xl`}
        >
          <motion.ul
            className=" xs:gap-8 xl:gap-0 xl:space-y-12 xs:text-sm md:text-xl xl:text-2xl flex xs:flex-row xl:flex-col items-center"
            initial={{ y: -800 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: 2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: {
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              transition={{ duration: 0.5 }}
              className="relative before:duration-300 before:absolute before:h-[2px] before:bg-white before:left-1/2 before:translate-x-[-50%] before:-bottom-1 before:w-0  hover:before:w-[25%]"
            >
              <Link
                onClick={() => {
                  setOpen((prev) => !prev);
                  scrollToTop();
                }}
                to="/"
              >
                {t("Navbar.Home")}
              </Link>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.1,
                transition: {
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              transition={{ duration: 0.5 }}
              className="relative before:duration-300 before:absolute before:h-[2px] before:bg-white before:left-1/2 before:translate-x-[-50%] before:-bottom-1 before:w-0  hover:before:w-[25%]"
            >
              <Link
                onClick={() => {
                  setOpen(false);
                  scrollToTop();
                }}
                to="/champions"
              >
                {t("Navbar.Champions")}
              </Link>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.1,
                transition: {
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              transition={{ duration: 0.5 }}
              className="relative before:duration-300 before:absolute before:h-[2px] before:bg-white before:left-1/2 before:translate-x-[-50%] before:-bottom-1 before:w-0  hover:before:w-[25%]"
            >
              <Link
                onClick={() => {
                  setOpen((prev) => !prev);
                  scrollToTop();
                }}
                to="/workout"
              >
                {t("Navbar.Track A Workout")}
              </Link>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.1,
                transition: {
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              transition={{ duration: 0.5 }}
              className="relative before:duration-300 before:absolute before:h-[2px] before:bg-white before:left-1/2 before:translate-x-[-50%] before:-bottom-1 before:w-0  hover:before:w-[25%]"
            >
              <Link
                onClick={() => {
                  setOpen((prev) => !prev);
                  scrollToTop();
                }}
                to="/volume"
              >
                {t("Navbar.Evalute Volume")}
              </Link>
            </motion.li>
          </motion.ul>
        </nav>
      </>
    )
  );
};

export default Navbar;
