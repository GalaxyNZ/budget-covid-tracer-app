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
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import "./HistoryTab.css";
import { Geolocation, Position } from "@capacitor/geolocation";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import firebase from "../firebase";
import UserContext from "../userContext";
import { useHistory } from "react-router";

import "../../node_modules/leaflet/dist/leaflet.css";
import "../../node_modules/leaflet/dist/leaflet.js";

const Tab2: React.FC = () => {
  const userContext = useContext(UserContext);
  let history = useHistory();

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

  useIonViewWillEnter(() => {
    let tabs = document.getElementById("tabBar");
    tabs!.style.display = "flex";
  });

  if (entities.length == 0) {
    return <IonLabel>Loading...</IonLabel>;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Location History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div id="mapid">
            <MapContainer
              dragging={true}
              zoom={15}
              scrollWheelZoom={true}
              style={{ height: "100%" }}
              center={[entities[0].latitude, entities[0].longitude]}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {entities.map((data: any, index: number) => (
                <Marker
                  position={[data.latitude, data.longitude]}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng,
                      iconSize: [18, 30],
                      iconAnchor: [9, 30],
                    })
                  }
                ></Marker>
              ))}
            </MapContainer>
          </div>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab2;
