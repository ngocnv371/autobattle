import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { Character } from "../battle/models";
import { Party, selectParties } from "./barrackSlice";
import PartyCard from "./PartyCard";

const BarrackPage: React.FC = () => {
  const router = useIonRouter();
  const parties = useAppSelector(selectParties);

  function handleSelectMember(p: Party, m: Character) {
    router.push(`/barrack/${p.id}/${m.id}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Parties</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/barrack/tavern">Tavern</IonButton>
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
          <PartyCard
            key={p.id}
            {...p}
            onSelectMember={(m) => handleSelectMember(p, m)}
          ></PartyCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default BarrackPage;
