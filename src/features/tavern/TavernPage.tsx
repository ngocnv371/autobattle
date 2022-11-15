import {
  IonBackButton,
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refresh, selectWanderers } from "./tavernSlice";

const TavernPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const wanderers = useAppSelector(selectWanderers);
  function handleRefresh() {
    dispatch(refresh());
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Tavern</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => handleRefresh()}>Refresh</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tavern</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {wanderers.map((d) => (
            <IonItem key={d.id} routerLink={`/party/tavern/${d.id}`}>
              <IonLabel>{d.name}</IonLabel>
              <IonLabel slot="end">
                {d.class} LV{d.level}
              </IonLabel>
            </IonItem>
          ))}
          {!wanderers.length && (
            <IonItem>
              <IonLabel color="warning">Tavern is empty, try Refresh</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TavernPage;
