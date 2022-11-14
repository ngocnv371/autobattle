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
import { fileTrayStacked, map, home } from "ionicons/icons";

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
import PartyAssignmentPage from "./features/barrack/PartyAssignmentPage";
import Battle from "./features/battle/Battle";
import InventoryPage from "./features/inventory/InventoryPage";
import BarrackPage from "./features/barrack/BarrackPage";
import CharacterProfilePage from "./features/barrack/CharacterProfilePage";
import TavernPage from "./features/tavern/TavernPage";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { loadMonsters } from "./features/monsters/monstersSlice";
import { loadMissions } from "./features/missions/missionsSlice";
import MissionsPage from "./features/missions/MissionsPage";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handle = setTimeout(() => {
      dispatch(loadMonsters());
      dispatch(loadMissions());
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
            <Route exact path="/inventory">
              <InventoryPage />
            </Route>
            <Route exact path="/barrack">
              <BarrackPage />
            </Route>
            <Route exact path="/barrack/tavern" component={TavernPage} />
            <Route
              exact
              path="/barrack/:partyId/:memberId"
              component={CharacterProfilePage}
            />
            <Route exact path="/missions">
              <MissionsPage />
            </Route>
            <Route
              exact
              path="/missions/:missionId"
              component={PartyAssignmentPage}
            />
            <Route exact path="/missions/:missionId/:partyId" component={Battle} />
            <Route exact path="/">
              <Redirect to="/missions" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="missions" href="/missions">
              <IonIcon icon={map} />
              <IonLabel>Missions</IonLabel>
            </IonTabButton>
            <IonTabButton tab="barrack" href="/barrack">
              <IonIcon icon={home} />
              <IonLabel>Barrack</IonLabel>
            </IonTabButton>
            <IonTabButton tab="inventory" href="/inventory">
              <IonIcon icon={fileTrayStacked} />
              <IonLabel>Inventory</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
