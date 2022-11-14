import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ShopItemSchema } from "../../data/schema";
import QuickBuy from "./QuickBuy";
import { restock, selectItems } from "./shopSlice";

const ShopPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const [item, setItem] = useState<ShopItemSchema | null>(null);
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
            <IonItem
              key={i.name}
              onClick={() => (i !== item ? setItem(i) : setItem(null))}
            >
              <IonLabel>{i.name}</IonLabel>
              <IonLabel slot="end">{i.price}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      {item && (
        <IonFooter>
          <QuickBuy {...item} />
        </IonFooter>
      )}
    </IonPage>
  );
};

export default ShopPage;
