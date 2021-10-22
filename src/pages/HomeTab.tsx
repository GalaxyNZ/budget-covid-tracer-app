import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFab,
  IonFabButton,
  useIonViewWillEnter,
} from "@ionic/react";
import { addCircleSharp, add } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./HomeTab.css";

const Tab1: React.FC = () => {
  useIonViewWillEnter(() => {
    let tabs = document.getElementById("tabBar");
    tabs!.style.display = "flex";
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <button
          onClick={() => console.log("blah")}
          style={{
            backgroundColor: "yellow",
            borderRadius: 300,
            height: 300,
            width: 300,
          }}
        >
          <IonIcon icon={add} size="300" />
        </button>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
