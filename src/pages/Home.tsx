import React from "react";
import Exercises from "../components/Exercises";
import Hero from "../components/Hero";
import { IonContent, IonPage } from "@ionic/react";
import Footer from "../components/Footer";
// const Hero = lazy(() => import("../components/Hero"));
// const Exercises = lazy(() => import("../components/Exercises"));

const Home = () => {
  return (
    <IonPage className="App main-color">
      <IonContent>
        <Hero />
        <Exercises />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
