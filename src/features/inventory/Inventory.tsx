import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
  } from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "./inventorySlice";

const Inventory: React.FC = () => {
    const items = useAppSelector(selectItems)
  return <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Inventory</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent fullscreen>
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonTitle size="large">Inventory</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonList>
    {items.map((d) => (
      <IonItem key={d.name}>
        <IonLabel>{d.name}</IonLabel>
        <IonLabel slot="end">{d.quantity}</IonLabel>
      </IonItem>
    ))}

    </IonList>
  </IonContent>
</IonPage>
};

export default Inventory;
