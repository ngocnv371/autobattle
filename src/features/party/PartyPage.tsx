import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { selectMembers } from "./partySlice";

const PartyPage: React.FC = () => {
  const members = useAppSelector(selectMembers);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Party</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/party/tavern">Tavern</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Party</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {members.map((m) => (
            <IonItem key={m.id} routerLink={`/party/members/${m.id}`}>
              <IonLabel>{m.name}</IonLabel>
              <IonLabel slot="end">
                {m.class} LV{m.level}
              </IonLabel>
            </IonItem>
          ))}
          {!members.length && (
            <IonItem>
              <IonLabel color="warning">
                You have no member yet, go hire some
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PartyPage;
