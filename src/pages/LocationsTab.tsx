import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonDatetime,
  IonInput,
  IonList,
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import "./LocationsTab.css";
import { Geolocation, Position } from "@capacitor/geolocation";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import firebase from "../firebase";

import "../../node_modules/leaflet/dist/leaflet.css";
import { useHistory } from "react-router";
import UserContext from "../userContext";

const Tab2: React.FC = () => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const [entities, setEntities] = useState();

  const locationsDB = firebase.firestore().collection("locations");

  useEffect(() => {
    const unsub = locationsDB
      .where("authorID", "==", userContext.id)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          var newEntities;
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );

    return () => {
      unsub();
    };
  }, []);

  // use geolocation to get user's device coordinates
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={() => {}} expand="block">
          Toggle Infinite Scroll
        </IonButton>

        <IonList></IonList>

        <IonInfiniteScroll threshold="100px" id="infinite-scroll">
          <IonInfiniteScrollContent
            loading-spinner="bubbles"
            loading-text="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
        <IonButton
          onClick={(e) => {
            e.preventDefault();
            history.push({
              pathname: "/addrecord",
            });
          }}
        >
          Add record
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
