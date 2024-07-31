import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import i18n from "../i18n";
import { t } from "i18next";

const LanguagePicker = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeLanguage = (lang: any) => {
    i18n.changeLanguage(lang.detail.value);
    if (lang.detail.value === "ar") {
      localStorage.setItem("lang", "ar");
      document.body.dir = "rtl";
      document.body.classList.add("font-ar");
    } else {
      localStorage.setItem("lang", "en");
      document.body.dir = "ltr";
      document.body.classList.remove("font-ar");
    }
  };
  return (
    <IonList>
      <IonItem>
        <IonSelect
          aria-label="Fruit"
          interface="action-sheet"
          placeholder={t("general.Select Language")}
          value={i18n.language}
          onIonChange={changeLanguage}
        >
          <IonSelectOption value="en">{t("Language.English")}</IonSelectOption>
          <IonSelectOption value="ar">{t("Language.Arabic")}</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default LanguagePicker;
