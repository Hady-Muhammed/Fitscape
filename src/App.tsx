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
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import LoggedInRoutes from "./guards/LoggedInRoutes";
import UserRoutes from "./guards/UserRoutes";
import Champions from "./pages/Champions";
import Contact from "./pages/Contact";
import UserAccount from "./pages/UserAccount";
import Volume from "./pages/Volume";
import Workouts from "./pages/Workouts";
import AdminRoutes from "./guards/AdminRoutes";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/dashboard/Account";
import Champs from "./pages/dashboard/Champs";
import Edit from "./pages/dashboard/Edit";
import Exercs from "./pages/dashboard/Exercs";
import Settings from "./pages/dashboard/Settings";
import Users from "./pages/dashboard/Users";
import { Route } from "react-router-dom";
import _404Page from "./pages/404Page";
import LogoutBtn from "./components/LogoutBtn";
import Navbar from "./components/Navbar";
import { ScrollProvider } from "./context/ScrollProvider";
import "./i18n"; // Ensure this import is present to initialize i18n
import { useTranslation } from "react-i18next";
import { barbell, calendar, flash, home, personCircle } from "ionicons/icons";

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
  const { t } = useTranslation();
  useBodyFont();
  return (
    <ScrollProvider>
      <IonApp>
        <IonReactRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LogoutBtn />
            {!isPlatform("hybrid") && <Navbar />}
            <IonTabs>
              {/* <AnimatePresence> */}
              <IonRouterOutlet animated>
                {/* LoggedIn Guard */}
                <LoggedInRoutes
                  Component={SignIn}
                  path={"/signin"}
                ></LoggedInRoutes>
                <LoggedInRoutes
                  Component={SignUp}
                  path={"/signup"}
                ></LoggedInRoutes>
                {/* User Guard */}
                <UserRoutes Component={Home} exact path={"/"}></UserRoutes>
                <UserRoutes
                  Component={Champions}
                  path="/champions"
                ></UserRoutes>
                <UserRoutes Component={Volume} path="/volume"></UserRoutes>
                <UserRoutes Component={Workouts} path="/workout"></UserRoutes>
                <UserRoutes Component={Contact} path="/contact"></UserRoutes>
                <UserRoutes
                  Component={UserAccount}
                  path="/account"
                ></UserRoutes>
                {/* Admin Guard */}

                <AdminRoutes
                  Component={Dashboard}
                  path="/dashboard"
                ></AdminRoutes>
                <AdminRoutes
                  Component={Champs}
                  path="/dashboard/champions"
                ></AdminRoutes>
                <AdminRoutes
                  Component={Exercs}
                  path="/dashboard/exercises"
                ></AdminRoutes>
                <AdminRoutes
                  Component={Users}
                  path="/dashboard/users"
                ></AdminRoutes>
                <AdminRoutes
                  Component={Settings}
                  path="/dashboard/settings"
                ></AdminRoutes>
                <AdminRoutes
                  Component={Account}
                  path="/dashboard/account"
                ></AdminRoutes>
                <AdminRoutes
                  Component={Edit}
                  path="/dashboard/edit/:id"
                ></AdminRoutes>
                <Route component={_404Page}></Route>
              </IonRouterOutlet>
              <IonTabBar
                style={!isPlatform("hybrid") ? { display: "none" } : {}}
                dir="rtl"
                slot="bottom"
                className="tab-bar"
              >
                <IonTabButton tab="tab3" href="/account">
                  <IonIcon aria-hidden="true" icon={personCircle} />
                  <IonLabel>{t("TabBar.Profile")}</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/workout">
                  <IonIcon aria-hidden="true" icon={calendar} />
                  <IonLabel>{t("TabBar.Workouts")}</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab4" href="/champions">
                  <IonIcon aria-hidden="true" icon={barbell} />
                  <IonLabel>{t("TabBar.Champions")}</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab5" href="/volume">
                  <IonIcon aria-hidden="true" icon={flash} />
                  <IonLabel>{t("TabBar.Volume")}</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab1" href="/">
                  <IonIcon size={"100"} aria-hidden="true" icon={home} />
                  <IonLabel>{t("TabBar.Home")}</IonLabel>
                </IonTabButton>
              </IonTabBar>
              {/* </AnimatePresence> */}
            </IonTabs>
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
