import React from "react";
import { lazy } from "react";
const Hero = lazy(() => import("../components/Hero"));
const Exercises = lazy(() => import("../components/Exercises"));

const Home = () => {
  return (
    <div className="App main-color">
      <Hero />
      <Exercises />
    </div>
  );
};

export default Home;
