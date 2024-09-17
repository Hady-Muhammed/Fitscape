import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiFitbit } from "react-icons/si";
import { CgTwitter } from "react-icons/cg";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import "animate.css/animate.min.css";
import useUtility from "../hooks/useUtility/useUtility";
import ScrollReveal from "../animations/ScrollReveal";
import { t } from "i18next";
import useUser from "../hooks/useUser/useUser";

const Footer = () => {
  // States
  const [disabled, setDisabled] = useState(false);
  const [heartColor, setHeartColor] = useState("");
  const [visible, setVisible] = useState(false);
  // Functions
  const { checkLiked, likeTheApp } = useUser();
  const { scrollToTop } = useUtility();
  useEffect(() => {
    if (!localStorage.getItem("liked")) {
      checkLiked().then((isLiked) => {
        if (isLiked) {
          setHeartColor("red");
          setDisabled(true);
          localStorage.setItem("liked", "true");
        } else {
          setHeartColor("#AAB8C2");
        }
        setVisible(true);
      });
    } else {
      setHeartColor("red");
      setDisabled(true);
      setVisible(true);
    }
  }, []);

  // Effects

  return (
    <>
      <footer className="p-20 main-color text-white text-center flex flex-col justify-around">
        <hr className="w-[80%] my-12 mx-auto" />
        <div className="flex xs:flex-col-reverse items-center sm:flex-row justify-around">
          <div className="flex flex-col xs:mt-12 sm:mt-0">
            <ScrollReveal animationName="slideInLeft">
              <h3 className="text-3xl">{t("Footer.Enjoying the app?")}</h3>
            </ScrollReveal>
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
                      {t("Footer.Like")}
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

                          <g id="grp6" opacity="0" transform="translate(0 28)">
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

                          <g id="grp3" opacity="0" transform="translate(52 28)">
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

                          <g id="grp2" opacity="0" transform="translate(44 6)">
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

                          <g id="grp5" opacity="0" transform="translate(14 50)">
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

                          <g id="grp4" opacity="0" transform="translate(35 50)">
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
                <ScrollReveal animationName="jackInTheBox">
                  <li className="cursor-pointer">
                    <CgTwitter />
                  </li>
                </ScrollReveal>
                <ScrollReveal animationName="jackInTheBox">
                  <li className="cursor-pointer">
                    <RiFacebookCircleLine />
                  </li>
                </ScrollReveal>
                <ScrollReveal animationName="jackInTheBox">
                  <li className="cursor-pointer">
                    <FaLinkedinIn />
                  </li>
                </ScrollReveal>
                <ScrollReveal animationName="jackInTheBox">
                  <li className="cursor-pointer">
                    <FiInstagram />
                  </li>
                </ScrollReveal>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <Link
              to={"/"}
              className="flex items-center justify-center space-x-2 font-thin mx-auto"
            >
              <SiFitbit size={20} /> <span className="block">fitscape</span>
            </Link>
            <ScrollReveal animationName="jackInTheBox">
              <Link
                onClick={scrollToTop}
                className="font-bold text-3xl button-89 block"
                to={"/contact"}
              >
                {t("Footer.CONTACT US!")}
              </Link>
            </ScrollReveal>
          </div>
        </div>
        <ScrollReveal animationName="fadeIn">
          <Link
            to={"/account"}
            className="flex items-center justify-center space-x-2 font-thin mx-auto p-5"
          >
            -<span className="block ml-1">{t("Footer.My Account")}</span>
          </Link>
        </ScrollReveal>
        <hr className="w-[50%] my-12 mx-auto" />
        <ScrollReveal animationName="fadeIn">
          <p className="mt-5">
            {t("Footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </ScrollReveal>
      </footer>
    </>
  );
};

export default Footer;
