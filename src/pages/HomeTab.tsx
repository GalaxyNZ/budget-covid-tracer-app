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
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLabel,
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import {
  addCircleSharp,
  add,
  wifi,
  cloud,
  list,
  personOutline,
  mailOutline,
  logOutOutline,
  analyticsOutline,
} from "ionicons/icons";
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
        <IonCard>
          <img src="https://www.artnews.com/wp-content/uploads/2021/03/AdobeStock_263911828.jpeg" />
          <IonCardHeader>
            <IonCardTitle>Location Tracker</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            All your location data is added yourself, not automatically. Your
            data is a tap away with our helpful map that shows you everywhere
            you have logged, and a list for more detailed viewing
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Added Features</IonCardTitle>
          </IonCardHeader>
          <IonItem className="ion-activated">
            <IonIcon icon={cloud} slot="start" />
            <IonItem>All data is saved in the cloud</IonItem>
          </IonItem>
          <IonItem className="ion-activated">
            <IonIcon icon={list} slot="start" />
            <IonItem>Data is laid out chronoligically</IonItem>
          </IonItem>
          <IonItem className="ion-activated">
            <IonIcon icon={analyticsOutline} slot="start" />
            <IonItem>Only user added data is collected</IonItem>
          </IonItem>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Account Management</IonCardTitle>
          </IonCardHeader>
          <IonItem className="ion-activated">
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel> {userContext.name} </IonLabel>
          </IonItem>
          <IonItem className="ion-activated">
            <IonIcon icon={mailOutline} slot="start" />
            <IonLabel> {userContext.email} </IonLabel>
          </IonItem>
          <IonItem href="/" className="ion-activated">
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel>Log Out</IonLabel>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
