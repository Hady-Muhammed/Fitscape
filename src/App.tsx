import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
// import { lazy } from "react";
import Navbar from "./components/Navbar";
import LogoutBtn from "./components/LogoutBtn";
import React from "react";
// import Footer from "./components/Footer";
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

// const Home = lazy(() => import("./pages/Home"));
// const Champions = lazy(() => import("./pages/Champions"));
// const Volume = lazy(() => import("./pages/Volume"));
// const Workouts = lazy(() => import("./pages/Workouts"));
// const SignIn = lazy(() => import("./pages/SignIn"));
// const SignUp = lazy(() => import("./pages/SignUp"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Champs = lazy(() => import("./pages/dashboard/Champs"));
// const Exercs = lazy(() => import("./pages/dashboard/Exercs"));
// const Users = lazy(() => import("./pages/dashboard/Users"));
// const Settings = lazy(() => import("./pages/dashboard/Settings"));
// const Account = lazy(() => import("./pages/dashboard/Account"));
// const Contact = lazy(() => import("./pages/Contact"));
// const Edit = lazy(() => import("./pages/dashboard/Edit"));
// const UserAccount = lazy(() => import("./pages/UserAccount"));
// const Page404 = lazy(() => import("./pages/404Page"));

Chart.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import Champions from "./pages/Champions";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/dashboard/Account";
import Champs from "./pages/dashboard/Champs";
import Edit from "./pages/dashboard/Edit";
import Exercs from "./pages/dashboard/Exercs";
import Settings from "./pages/dashboard/Settings";
import Users from "./pages/dashboard/Users";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import _404Page from "./pages/404Page";
import UserAccount from "./pages/UserAccount";
import Volume from "./pages/Volume";
import Workouts from "./pages/Workouts";

setupIonicReact();

// eslint-disable-next-line @typescript-eslint/naming-convention
function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <LogoutBtn />
          <Navbar />
          <AnimatePresence>
            <IonRouterOutlet>
              {/* LoggedIn Guard */}
              {/* <Route element={<LoggedInRoutes />}> */}
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              {/* </Route> */}
              {/* User Guard */}
              {/* <Route element={<UserRoutes />}> */}
              <Route path="/">
                <Home />
              </Route>
              <Route path="/champions">
                <Champions />
              </Route>
              <Route path="/volume">
                <Volume />
              </Route>
              <Route path="/workout">
                <Workouts />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/account">
                <UserAccount />
              </Route>
              {/* </Route> */}
              {/* Admin Guard */}
              {/* <Route element={<AdminRoutes />}> */}
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/dashboard/champions">
                <Champs />
              </Route>
              <Route path="/dashboard/exercises">
                <Exercs />
              </Route>
              <Route path="/dashboard/users">
                <Users />
              </Route>
              <Route path="/dashboard/settings">
                <Settings />
              </Route>
              <Route path="/dashboard/account">
                <Account />
              </Route>
              <Route path="/dashboard/edit/:id">
                <Edit />
              </Route>
              {/* </Route> */}
              <Route>
                <_404Page />
              </Route>
            </IonRouterOutlet>
          </AnimatePresence>
          {/* <Footer /> */}
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
  );
}

export default App;
