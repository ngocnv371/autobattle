import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { selectParties } from "./barrackSlice";
import PartyCard from "./PartyCard";

const BarrackPage: React.FC = () => {
  const parties = useAppSelector(selectParties);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Parties</IonTitle>
          <IonButtons slot="end">
            <IonButton>Add</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Parties</IonTitle>
          </IonToolbar>
        </IonHeader>
        {parties.map((p) => (
          <PartyCard key={p.id} {...p}></PartyCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default BarrackPage;
