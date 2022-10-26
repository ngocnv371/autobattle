import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { Party, selectParties } from "./barrackSlice";
import PartyCard from "./PartyCard";

const Barrack: React.FC<RouteComponentProps<{ dungeon: string }>> = ({
  match
}) => {
  const parties = useAppSelector(selectParties);
  const router = useIonRouter();
  function onSelectParty(p: Party) {
    router.push(`/atlas/${match.params.dungeon}/${p.id}`);
  }
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
        {parties.map((d) => (
          <PartyCard key={d.id} {...d}>
            <IonButton fill="clear" onClick={() => onSelectParty(d)}>
              Select
            </IonButton>
          </PartyCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Barrack;
