import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "@ionic/react/css/core.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

Chart.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);
import { IonApp, isPlatform, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import LogoutBtn from "./components/LogoutBtn";
import Navbar from "./components/Navbar";
import { ScrollProvider } from "./context/ScrollProvider";
import "./i18n"; // Ensure this import is present to initialize i18n
import { useTranslation } from "react-i18next";
import TabBar from "./components/TabBar";

const useBodyFont = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    // Remove any existing language font classes
    document.body.classList.remove("font-ar");
    // Add the appropriate font class based on the language
    if (language === "ar") {
      document.body.dir = "rtl";
      document.body.classList.add("font-ar");
    }
  }, [language]);
};

setupIonicReact();

// eslint-disable-next-line @typescript-eslint/naming-convention
function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useBodyFont();
  return (
    <ScrollProvider>
      <IonApp>
        <IonReactRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LogoutBtn />
            {!isPlatform("hybrid") && <Navbar />}
            {/* <AnimatePresence> */}

            <TabBar />
            {/* </AnimatePresence> */}
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </LocalizationProvider>
        </IonReactRouter>
      </IonApp>
    </ScrollProvider>
  );
}

// const DashboardRouterOutlet: React.FC = () => (
//   <IonRouterOutlet>
//     <Route path="/dashboard" exact={true}>
//       <DashboardMainPage />
//     </Route>
//     <Route path="/dashboard/stats" exact={true}>
//       <DashboardStatsPage />
//     </Route>
//   </IonRouterOutlet>
// );

export default App;
