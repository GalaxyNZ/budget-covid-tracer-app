import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFab,
  IonFabButton,
  useIonViewWillEnter,
  IonItem,
  IonList,
  IonCard,
  IonCardHeader,
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import { addCircleSharp, add } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./HomeTab.css";
import UserContext from "../userContext";
import { useHistory } from "react-router";

const Tab1: React.FC = () => {
  const userContext = useContext(UserContext);
  let history = useHistory();

  useIonViewWillEnter(() => {
    let tabs = document.getElementById("tabBar");
    tabs!.style.display = "flex";

    if (userContext.id == "") {
      history.replace("/");
    }
  });

  const logOut = () => {
    userContext.id = "";
    history.replace("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonCard>
            <IonCardHeader>Blah</IonCardHeader>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
