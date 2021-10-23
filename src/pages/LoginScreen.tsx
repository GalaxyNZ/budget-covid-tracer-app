import React, { useContext, useState } from "react";
import {
  IonButton,
  IonInput,
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  useIonViewWillEnter,
  IonList,
  IonItem,
} from "@ionic/react";
import "./RegistrationScreen.css";
import firebase from "../firebase";
import UserContext from "../userContext";
import { useHistory } from "react-router";

export default function RegistrationScreen() {
  let history = useHistory();
  const userContext = useContext(UserContext);

  const [entities, setEntities] = useState(new Array());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response: any) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            userContext.id = uid;
            userContext.email = email;
            if (user) {
              userContext.name = user.fullName;
            }
            history.push({
              pathname: "/home",
            });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  useIonViewWillEnter(() => {
    let tabs = document.getElementById("tabBar");
    tabs!.style.display = "none";
    userContext.email = "";
    userContext.id = "";
    userContext.name = "";
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonInput
              placeholder="E-mail"
              onIonChange={(text: any) => setEmail(text.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="password"
              onIonChange={(text: any) => setPassword(text.target.value)}
              placeholder="Password"
            />
          </IonItem>
          <IonItem>
            <IonButton onClick={onLoginPress}>Login</IonButton>
          </IonItem>
          <IonItem>
            Don't have an account?{" "}
            <IonButton href="/registration">Create an account</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
