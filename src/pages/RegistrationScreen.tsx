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
  IonItem,
  IonList,
} from "@ionic/react";
import "./RegistrationScreen.css";
import LoginScreen from "./LoginScreen";
import firebase from "../firebase";
import UserContext from "../userContext";
import { useHistory } from "react-router";

export default function RegistrationScreen() {
  const userContext = useContext(UserContext);
  let history = useHistory();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            userContext.id = uid;
            userContext.email = email;
            userContext.name = fullName;
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
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonInput
              autofocus
              placeholder="Full Name"
              onIonChange={(text: any) => setFullName(text.target.value)}
            />
          </IonItem>
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
            <IonInput
              type="password"
              placeholder="Confirm Password"
              onIonChange={(text: any) => setConfirmPassword(text.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonButton onClick={onRegisterPress}>Create account</IonButton>
          </IonItem>
          <IonItem>
            Already got an account? <IonButton href="/login">Log in</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
