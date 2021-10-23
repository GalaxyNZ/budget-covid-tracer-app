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
import "./LocationsTab.css";
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

  const thing: string = "" + history.location.state;

  useEffect(() => {
    const unsub = locationsDB.where("__name__", "==", thing).onSnapshot(
      (querySnapshot) => {
        var newEntities = new Array();
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          entities.push(entity);
          newEntities.push(entity);
        });
        console.log(entities);
        console.log(newEntities);
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

  if (entities.length == 0) {
    return <IonLabel>Loading...</IonLabel>;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Locations</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonList>
            <IonItem>
              <IonLabel style={{ fontWeight: "bold" }}>Place Name</IonLabel>
              <IonLabel> {entities[0].placename} </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel style={{ fontWeight: "bold" }}>Date</IonLabel>
              <IonLabel> {new Date(entities[0].time).toString()} </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel style={{ fontWeight: "bold" }}>Location</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel> {entities[0].latitude} </IonLabel>
              <IonLabel>{entities[0].longitude} </IonLabel>
            </IonItem>

            <IonItem>
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
                  <Marker
                    position={[entities[0].latitude, entities[0].longitude]}
                    icon={
                      new Icon({
                        iconUrl: markerIconPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })
                    }
                  ></Marker>
                </MapContainer>
              </div>
            </IonItem>

            <IonItem>
              <IonButton onClick={history.goBack}>Go back</IonButton>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab2;
