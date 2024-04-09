import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import LogoutBtn from "./components/LogoutBtn";
import React from "react";
import Footer from "./components/Footer";
import { WaveSpinner } from "react-spinners-kit";
import AdminRoutes from "./guards/AdminRoutes";
import UserRoutes from "./guards/UserRoutes";
import LoggedInRoutes from "./guards/LoggedInRoutes";
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

const Home = lazy(() => import("./pages/Home"));
const Champions = lazy(() => import("./pages/Champions"));
const Volume = lazy(() => import("./pages/Volume"));
const Workouts = lazy(() => import("./pages/Workouts"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Champs = lazy(() => import("./pages/dashboard/Champs"));
const Exercs = lazy(() => import("./pages/dashboard/Exercs"));
const Users = lazy(() => import("./pages/dashboard/Users"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const Account = lazy(() => import("./pages/dashboard/Account"));
const Contact = lazy(() => import("./pages/Contact"));
const Edit = lazy(() => import("./pages/dashboard/Edit"));
const UserAccount = lazy(() => import("./pages/UserAccount"));
const Page404 = lazy(() => import("./pages/404Page"));

Chart.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
function App() {
  const location = useLocation();
  return (
    <>
      <LogoutBtn />
      <Navbar />
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          {/* LoggedIn Guard */}
          <Route element={<LoggedInRoutes />}>
            <Route
              path="/signin"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <SignIn />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <SignUp />
                </Suspense>
              }
            />
          </Route>
          {/* User Guard */}
          <Route element={<UserRoutes />}>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/champions"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Champions />
                </Suspense>
              }
            />
            <Route
              path="/volume"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Volume />
                </Suspense>
              }
            />
            <Route
              path="/workout"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Workouts />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <UserAccount />
                </Suspense>
              }
            />
          </Route>
          {/* Admin Guard */}
          <Route element={<AdminRoutes />}>
            <Route
              path="/dashboard"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/champions"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Champs />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/exercises"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Exercs />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Users />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Settings />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/account"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Account />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/edit/:name"
              element={
                <Suspense
                  fallback={
                    <div className="grid place-items-center h-screen bg-black">
                      <WaveSpinner size={60} />
                    </div>
                  }
                >
                  <Edit />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <WaveSpinner size={60} />
                  </div>
                }
              >
                <Page404 />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
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
    </>
  );
}

export default App;
