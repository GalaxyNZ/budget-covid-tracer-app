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

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toString()
  );

  var [coordinates, setCoords] = useState<Position | null>(null);
  var [latitude, setLat] = useState(0);
  var [longitude, setLong] = useState(0);
  var [placename, setPlacename] = useState("");

  // use geolocation to get user's device coordinates
  const getCurrentPosition = async () => {
    const x = await Geolocation.getCurrentPosition();

    setCoords(x);

    setLat(x.coords.latitude);
    setLong(x.coords.longitude);
  };

  getCurrentPosition();

  const locationsDB = firebase.firestore().collection("locations");

  const onAddButtonPress = () => {
    console.log(latitude);
    console.log(longitude);
    console.log(placename);
    console.log(selectedDate);
    if (
      latitude &&
      longitude &&
      latitude != 0 &&
      longitude != 0 &&
      placename &&
      placename.length > 0
    ) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        authorID: userContext.id,
        latitude: latitude,
        longitude: longitude,
        placename: placename,
        createdAt: timestamp,
        time: selectedDate,
      };

      locationsDB
        .add(data)
        .then((_doc) => {
          history.goBack();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  useIonViewWillEnter(() => {
    let tabs = document.getElementById("tabBar");
    tabs!.style.display = "none";
  });

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
            <IonLabel style={{ fontWeight: "bold" }}>Place Name</IonLabel>
            <IonInput
              type="text"
              placeholder=""
              onIonChange={(text: any) => {
                setPlacename(text.target.value);
              }}
            />
          </IonItem>

          <IonItem>
            <IonLabel style={{ fontWeight: "bold" }}>Date</IonLabel>
            <IonDatetime
              displayFormat="DD MMM YY HH:mm"
              min="2020"
              max={new Date().getFullYear().toString()}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel style={{ fontWeight: "bold" }}>Location</IonLabel>
            <IonButton onClick={getCurrentPosition}>Refresh</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>{longitude}</IonLabel>
            <IonLabel>{latitude}</IonLabel>
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
            <IonButton onClick={onAddButtonPress}>Add record</IonButton>
            <IonButton
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
            >
              Go Back
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
