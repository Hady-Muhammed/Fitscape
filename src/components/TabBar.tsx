import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
} from "@ionic/react";
import { t } from "i18next";
import { personCircle, calendar, barbell, flash, home } from "ionicons/icons";
import React from "react";
import { Route, useLocation } from "react-router-dom";
import AdminRoutes from "../guards/AdminRoutes";
import LoggedInRoutes from "../guards/LoggedInRoutes";
import UserRoutes from "../guards/UserRoutes";
import _404Page from "../pages/404Page";
import Champions from "../pages/Champions";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Account from "../pages/dashboard/Account";
import Champs from "../pages/dashboard/Champs";
import Edit from "../pages/dashboard/Edit";
import Exercs from "../pages/dashboard/Exercs";
import Settings from "../pages/dashboard/Settings";
import Users from "../pages/dashboard/Users";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserAccount from "../pages/UserAccount";
import Volume from "../pages/Volume";
import Workouts from "../pages/Workouts";

const TabBar = () => {
  const location = useLocation();
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* LoggedIn Guard */}
        <LoggedInRoutes Component={SignIn} path={"/signin"}></LoggedInRoutes>
        <LoggedInRoutes Component={SignUp} path={"/signup"}></LoggedInRoutes>
        {/* User Guard */}
        <UserRoutes Component={Home} exact path={"/"}></UserRoutes>
        <UserRoutes Component={Champions} path="/champions"></UserRoutes>
        <UserRoutes Component={Volume} path="/volume"></UserRoutes>
        <UserRoutes Component={Workouts} path="/workout"></UserRoutes>
        <UserRoutes Component={Contact} path="/contact"></UserRoutes>
        <UserRoutes Component={UserAccount} path="/account"></UserRoutes>
        {/* Admin Guard */}

        <AdminRoutes Component={Dashboard} path="/dashboard"></AdminRoutes>
        <AdminRoutes
          Component={Champs}
          path="/dashboard/champions"
        ></AdminRoutes>
        <AdminRoutes
          Component={Exercs}
          path="/dashboard/exercises"
        ></AdminRoutes>
        <AdminRoutes Component={Users} path="/dashboard/users"></AdminRoutes>
        <AdminRoutes
          Component={Settings}
          path="/dashboard/settings"
        ></AdminRoutes>
        <AdminRoutes
          Component={Account}
          path="/dashboard/account"
        ></AdminRoutes>
        <AdminRoutes Component={Edit} path="/dashboard/edit/:id"></AdminRoutes>
        <Route component={_404Page}></Route>
      </IonRouterOutlet>
      <IonTabBar
        style={
          !isPlatform("hybrid") ||
          location.pathname === "/signin" ||
          location.pathname === "/signup"
            ? { display: "none" }
            : {}
        }
        dir="rtl"
        slot="bottom"
        className="tab-bar"
      >
        <IonTabButton tab="tab1" href="/account">
          <IonIcon aria-hidden="true" icon={personCircle} />
          <IonLabel>{t("TabBar.Profile")}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/workout">
          <IonIcon aria-hidden="true" icon={calendar} />
          <IonLabel>{t("TabBar.Workouts")}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/champions">
          <IonIcon aria-hidden="true" icon={barbell} />
          <IonLabel>{t("TabBar.Champions")}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/volume">
          <IonIcon aria-hidden="true" icon={flash} />
          <IonLabel>{t("TabBar.Volume")}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>{t("TabBar.Home")}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabBar;
