import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Character, Party } from "../../app/models";
import HireModal from "../tavern/HireModal";
import { addParty, removeParty, selectParties } from "./barrackSlice";
import PartyCard from "./PartyCard";

const BarrackPage: React.FC = () => {
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();
  const parties = useAppSelector(selectParties);

  function handleSelectMember(p: Party, m: Character) {
    router.push(`/barrack/${p.id}/${m.id}`);
  }
  function handleDeleteParty(p: Party) {
    presentAlert({
      header: "Alert",
      message: `Do you really want to delete ${p.name}?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            dispatch(removeParty(p.id));
          },
        },
      ],
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Parties</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => dispatch(addParty())}>+ Party</IonButton>
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
          >
            <IonButton fill="clear" onClick={() => handleDeleteParty(p)}>
              Delete
            </IonButton>
            <HireModal party={p} />
          </PartyCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default BarrackPage;
