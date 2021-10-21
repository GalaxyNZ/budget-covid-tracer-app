import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./BluetoothTab.css";
import { BleClient, numberToUUID } from "@capacitor-community/bluetooth-le";

export async function scan(): Promise<void> {
  console.log("Scanning");
  try {
    await BleClient.initialize();

    await BleClient.requestLEScan({}, (result) => {
      console.log("received new scan result", result);
    });

    setTimeout(async () => {
      await BleClient.stopLEScan();
      console.log("stopped scanning");
    }, 5000);
  } catch (error) {
    console.error(error);
  }
}

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel> Bluetooth</IonLabel>
            <IonButton onClick={() => scan()}> Scan </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
