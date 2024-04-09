import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SiFitbit } from "react-icons/si";
import { CgTwitter } from "react-icons/cg";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import useUser from "../hooks/useUser";
import useUtility from "../hooks/useUtility";

const Footer = () => {
  // States
  const [disabled, setDisabled] = useState(false);
  const [heartColor, setHeartColor] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const location = useLocation();
  // Functions
  const { checkLiked, likeTheApp } = useUser();
  const { scrollToTop } = useUtility();
  useEffect(() => {
    // Removing Footer from unauthorized routes
    if (
      location.pathname !== "/" &&
      location.pathname !== "/champions" &&
      location.pathname !== "/workout" &&
      location.pathname !== "/volume" &&
      location.pathname !== "/contact" &&
      location.pathname !== "/account"
    ) {
      setShow(false);
      return;
    } else {
      setShow(true);
      checkLiked().then((isLiked) => {
        if (isLiked) {
          setHeartColor("red");
          setDisabled(true);
        } else {
          setHeartColor("#AAB8C2");
        }
        setVisible(true);
      });
    }
  }, [location]);

  // Effects

  return (
    <>
      {" "}
      {show && (
        <footer className="p-20 main-color text-white text-center mt-20 flex flex-col justify-around">
          <hr className="w-[80%] my-12 mx-auto" />
          <div className="flex xs:flex-col-reverse items-center sm:flex-row justify-around">
            <div className="flex flex-col xs:mt-12 sm:mt-0">
              <ScrollAnimation animateIn="animate__slideInLeft">
                <h3 className="text-3xl font-mont">Enjoying the app?</h3>
              </ScrollAnimation>
              <div className="mt-4">
                {/* Start Like */}
                {visible && (
                  <button>
                    <div className="w-full flex items-center">
                      <input
                        disabled={disabled}
                        type="checkbox"
                        id="checkbox"
                        onClick={() => {
                          likeTheApp();
                          setDisabled(true);
                        }}
                      />
                      <label
                        className={`cursor-pointer flex items-center duration-300 ${
                          disabled ? "" : "hover:scale-[1.1]"
                        }`}
                        htmlFor="checkbox"
                      >
                        Like
                        <svg
                          id="heart-svg"
                          viewBox="467 392 58 57"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            id="Group"
                            fill="none"
                            fillRule="evenodd"
                            transform="translate(467 392)"
                          >
                            <path
                              d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                              id="heart"
                              fill={heartColor}
                            />
                            <circle
                              id="main-circ"
                              fill="#E2264D"
                              opacity="0"
                              cx="29.5"
                              cy="29.5"
                              r="1.5"
                            />

                            <g id="grp7" opacity="0" transform="translate(7 6)">
                              <circle
                                id="oval1"
                                fill="#9CD8C3"
                                cx="2"
                                cy="6"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#8CE8C3"
                                cx="5"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp6"
                              opacity="0"
                              transform="translate(0 28)"
                            >
                              <circle
                                id="oval1"
                                fill="#CC8EF5"
                                cx="2"
                                cy="7"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#91D2FA"
                                cx="3"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp3"
                              opacity="0"
                              transform="translate(52 28)"
                            >
                              <circle
                                id="oval2"
                                fill="#9CD8C3"
                                cx="2"
                                cy="7"
                                r="2"
                              />
                              <circle
                                id="oval1"
                                fill="#8CE8C3"
                                cx="4"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp2"
                              opacity="0"
                              transform="translate(44 6)"
                            >
                              <circle
                                id="oval2"
                                fill="#CC8EF5"
                                cx="5"
                                cy="6"
                                r="2"
                              />
                              <circle
                                id="oval1"
                                fill="#CC8EF5"
                                cx="2"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp5"
                              opacity="0"
                              transform="translate(14 50)"
                            >
                              <circle
                                id="oval1"
                                fill="#91D2FA"
                                cx="6"
                                cy="5"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#91D2FA"
                                cx="2"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp4"
                              opacity="0"
                              transform="translate(35 50)"
                            >
                              <circle
                                id="oval1"
                                fill="#F48EA7"
                                cx="6"
                                cy="5"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#F48EA7"
                                cx="2"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g id="grp1" opacity="0" transform="translate(24)">
                              <circle
                                id="oval1"
                                fill="#9FC7FA"
                                cx="2.5"
                                cy="3"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#9FC7FA"
                                cx="7.5"
                                cy="2"
                                r="2"
                              />
                            </g>
                          </g>
                        </svg>
                      </label>
                    </div>
                  </button>
                )}
                {/* End Like */}

                <ul className="flex justify-evenly mt-4">
                  <ScrollAnimation animateIn="animate__jackInTheBox">
                    <li className="cursor-pointer">
                      <CgTwitter />
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation
                    delay={300}
                    animateIn="animate__jackInTheBox"
                  >
                    <li className="cursor-pointer">
                      <RiFacebookCircleLine />
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation
                    delay={400}
                    animateIn="animate__jackInTheBox"
                  >
                    <li className="cursor-pointer">
                      <FaLinkedinIn />
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation
                    delay={500}
                    animateIn="animate__jackInTheBox"
                  >
                    <li className="cursor-pointer">
                      <FiInstagram />
                    </li>
                  </ScrollAnimation>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                to={"/"}
                className="flex items-center justify-center space-x-2 font-mont font-thin mx-auto"
              >
                <SiFitbit size={20} /> <span className="block">fitscape</span>
              </Link>
              <ScrollAnimation animateIn="animate__jackInTheBox">
                <Link
                  onClick={scrollToTop}
                  className="font-bold text-3xl button-89 block"
                  to={"/contact"}
                >
                  CONTACT US!
                </Link>
              </ScrollAnimation>
            </div>
          </div>
          <ScrollAnimation className="p-5" animateIn="animate__fadeIn">
            <Link
              to={"/account"}
              className="flex items-center justify-center space-x-2 font-mont font-thin mx-auto"
            >
              -<span className="block ml-1">My Account</span>
            </Link>
          </ScrollAnimation>
          <hr className="w-[50%] my-12 mx-auto" />
          <ScrollAnimation
            delay={300}
            offset={-500}
            animateIn="animate__fadeIn"
          >
            <p className="font-mont mt-5">
              Copyrights @{new Date().getFullYear()} | All rights reserved
            </p>
          </ScrollAnimation>
        </footer>
      )}
    </>
  );
};

export default Footer;
