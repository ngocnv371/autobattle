import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ReactElement } from "react";
import { useAppSelector } from "../../app/hooks";
import { Party, selectParties } from "./barrackSlice";

const PartyListPage: React.FC<{
  renderParties: (parties: Party[]) => ReactElement[];
}> = (props) => {
  const parties = useAppSelector(selectParties);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Parties</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Parties</IonTitle>
          </IonToolbar>
        </IonHeader>
        {props.renderParties(parties)}
      </IonContent>
    </IonPage>
  );
};

export default PartyListPage;
