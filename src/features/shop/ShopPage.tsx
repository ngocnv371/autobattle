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
import { restock, selectItems } from "./shopSlice";

const ShopPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Shop</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => dispatch(restock())}>Restock</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Shop</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {items.map((i) => (
            <IonItem key={i.name}>
              <IonLabel>{i.name}</IonLabel>
              <IonLabel slot="end">{i.price}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ShopPage;
