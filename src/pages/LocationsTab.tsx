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
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./LocationsTab.css";
import { Geolocation, Position } from "@capacitor/geolocation";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import "../../node_modules/leaflet/dist/leaflet.css";

const Tab2: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toTimeString()
  );

  var [coordinates, setCoords] = useState<Position | null>(null);
  var [latitude, setLat] = useState(0);
  var [longitude, setLong] = useState(0);

  // use geolocation to get user's device coordinates
  const getCurrentPosition = async () => {
    const x = await Geolocation.getCurrentPosition();

    setCoords(x);

    setLat(x.coords.latitude);
    setLong(x.coords.longitude);
  };

  getCurrentPosition();

  if (coordinates == null) {
    return <IonPage>Loading...</IonPage>;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Location</IonTitle>
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
              <IonLabel>Place Name</IonLabel>
              <IonInput type="text" placeholder="" onIonChange={() => {}} />
            </IonItem>

            <IonItem>
              <IonLabel>Date</IonLabel>
              <IonDatetime
                displayFormat="DD MMM YYYY"
                min="2020"
                max={new Date().getFullYear().toString()}
                onIonChange={() => {}}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Time</IonLabel>
              <IonDatetime
                min="2020"
                max={new Date().getFullYear().toString()}
                displayFormat="hh:mm a"
                onIonChange={() => {}}
              />
            </IonItem>

            <IonItem>
              <IonLabel>{longitude}</IonLabel>
              <IonLabel>{latitude}</IonLabel>
              <IonButton onClick={getCurrentPosition}>Refresh</IonButton>
            </IonItem>

            <IonItem>
              <div id="mapid">
                <MapContainer
                  dragging={true}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: "100%" }}
                  center={[latitude, longitude]}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[latitude, longitude]}
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
              <IonButton>Add record</IonButton>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab2;
