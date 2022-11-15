import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  fileTrayStacked,
  map,
  buildOutline,
  people,
} from "ionicons/icons";

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
import Battle from "./features/battle/Battle";
import InventoryPage from "./features/inventory/InventoryPage";
import CharacterProfilePage from "./features/party/CharacterProfilePage";
import TavernPage from "./features/tavern/TavernPage";
import { useEffect } from "react";
import MissionsPage from "./features/missions/MissionsPage";
import { load } from "./app/store";
import SettingsPage from "./features/settings/SettingsPage";
import ShopPage from "./features/shop/ShopPage";
import PartyPage from "./features/party/PartyPage";
import WandererProfilePage from "./features/tavern/WandererProfilePage";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const handle = setTimeout(() => {
      load();
    }, 500);
    return () => {
      clearTimeout(handle);
    };
  });

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/settings">
              <SettingsPage />
            </Route>
            <Route exact path="/inventory">
              <InventoryPage />
            </Route>
            <Route exact path="/inventory/shop">
              <ShopPage />
            </Route>
            <Route exact path="/party">
              <PartyPage />
            </Route>
            <Route exact path="/party/tavern" strict>
              <TavernPage />
            </Route>
            <Route
              exact
              path="/party/members/:memberId"
              component={CharacterProfilePage}
            />
            <Route
              exact
              path="/party/tavern/:wandererId"
              component={WandererProfilePage}
            />
            <Route exact path="/missions">
              <MissionsPage />
            </Route>
            <Route exact path="/missions/:missionId" component={Battle} />
            <Route exact path="/">
              <Redirect to="/missions" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="missions" href="/missions">
              <IonIcon icon={map} />
              <IonLabel>Missions</IonLabel>
            </IonTabButton>
            <IonTabButton tab="party" href="/party">
              <IonIcon icon={people} />
              <IonLabel>Party</IonLabel>
            </IonTabButton>
            <IonTabButton tab="inventory" href="/inventory">
              <IonIcon icon={fileTrayStacked} />
              <IonLabel>Inventory</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={buildOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
