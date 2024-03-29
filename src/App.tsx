import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  ellipseOutline,
  map,
  locateOutline,
  mapOutline,
  homeOutline,
} from "ionicons/icons";
import Home from "./pages/HomeTab";
import Locations from "./pages/LocationsTab";
import History from "./pages/HistoryTab";
import Registration from "./pages/RegistrationScreen";
import Login from "./pages/LoginScreen";
import AddRecord from "./pages/AddRecord";
import Details from "./pages/Details";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/locations">
            <Locations />
          </Route>
          <Route exact path="/addrecord">
            <AddRecord />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" id="tabBar">
          <IonTabButton tab="locations" href="/locations">
            <IonIcon icon={locateOutline} />
            <IonLabel>Locations</IonLabel>
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="history" href="/history">
            <IonIcon icon={mapOutline} />
            <IonLabel>History</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
