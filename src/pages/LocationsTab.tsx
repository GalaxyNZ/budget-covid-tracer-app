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
          <IonTitle>Add Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle> Location </IonCardTitle>
              <IonCardSubtitle> Time </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
          {/* Map through devices */}
          {entities.map((data: any, index: number) => (
            <IonCard
              key={index}
              onClick={(e) => {
                e.preventDefault();
                history.push({
                  pathname: "/details",
                  state: index,
                });
              }}
            >
              <IonCardHeader>
                <IonCardTitle> {data.placename} </IonCardTitle>
                <IonCardSubtitle> {data.time} </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </IonContent>
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
