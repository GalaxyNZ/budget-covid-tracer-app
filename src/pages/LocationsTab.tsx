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
import { Geolocation } from "@capacitor/geolocation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const Tab2: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toTimeString()
  );

  var [latitude, setLat] = useState(0);
  var [longitude, setLong] = useState(0);

  // use geolocation to get user's device coordinates
  const getCurrentPosition = async () => {
    const x = await Geolocation.getCurrentPosition();

    setLat(x.coords.latitude);
    setLong(x.coords.longitude);
  };

  getCurrentPosition();

  return (
    <IonPage>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      />
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
              displayFormat="D MMM YYYY"
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
          </IonItem>

          <IonItem>
            <div id="mapid">
              <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={true}
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
};

export default Tab2;
