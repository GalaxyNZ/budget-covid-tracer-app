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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  useIonViewWillEnter,
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
  const [entities, setEntities] = useState(new Array());

  const locationsDB = firebase.firestore().collection("locations");

  useIonViewWillEnter(() => {
    let tabs = document.getElementById("tabBar");
    tabs!.style.display = "flex";

    if (userContext.id == "") {
      history.replace("/");
    }
  });

  useEffect(() => {
    const unsub = locationsDB
      .where("authorID", "==", userContext.id)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          var newEntities = new Array();
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
          console.log(entities);
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
          <IonTitle>Locations </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonContent>
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
          {/* Map through devices */}
          {entities.map((data: any, index: number) => (
            <IonCard
              key={index}
              onClick={(e) => {
                e.preventDefault();
                history.push({
                  pathname: "/details",
                  state: data.id,
                });
              }}
            >
              <IonCardHeader>
                <IonCardTitle> {data.placename} </IonCardTitle>
                <IonCardSubtitle> {data.time} </IonCardSubtitle>
                <IonCardSubtitle> {data.id} </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
