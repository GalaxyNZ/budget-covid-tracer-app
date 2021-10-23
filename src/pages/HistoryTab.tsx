import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import firebase from "../firebase";
import "./HistoryTab.css";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Coronavirus Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardTitle>Latest Situation per </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-sm>
                  Confirmed Cases: <strong>12</strong>
                </IonCol>
                <IonCol size="12" size-sm></IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" size-sm>
                  Death: <strong>12</strong>
                </IonCol>
                <IonCol size="12" size-sm></IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" size-sm>
                  Recovered: <strong>12</strong>
                </IonCol>
                <IonCol size="12" size-sm></IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
