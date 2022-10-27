import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonRouter,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { Party, selectParties } from "./barrackSlice";
import PartyCard from "./PartyCard";

const PartyAssignmentPage: React.FC<
  RouteComponentProps<{ dungeon: string }>
> = ({ match }) => {
  const router = useIonRouter();
  const parties = useAppSelector(selectParties);
  function onSelectParty(p: Party) {
    router.push(`/atlas/${match.params.dungeon}/${p.id}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Parties</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Parties</IonTitle>
          </IonToolbar>
        </IonHeader>
        {parties.map((p) => (
          <PartyCard key={p.id} {...p}>
            <IonButton fill="clear" onClick={() => onSelectParty(p)}>
              Assign
            </IonButton>
          </PartyCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default PartyAssignmentPage;
