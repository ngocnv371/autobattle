import { useEffect, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonRange,
} from "@ionic/react";
import { Item } from "../../app/models";
import { useAppSelector } from "../../app/hooks";
import { selectPrice } from "../shop/shopSlice";

const QuickSellModal = ({
  onDismiss,
  item,
}: {
  onDismiss: (
    quantity: null | number,
    price: number | null,
    role?: string
  ) => void;
  item: Item;
}) => {
  const [quantity, setQuantity] = useState(0);
  const [min, max] = [1, item.quantity];
  const price = useAppSelector(selectPrice(item.name));

  useEffect(() => {
    setQuantity(min);
  }, [min]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="medium"
              onClick={() => onDismiss(null, null, "cancel")}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Sell</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss(quantity, price, "confirm")}>
              Sell
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Item</IonLabel>
          <IonLabel slot="end">{item.name}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Price</IonLabel>
          <IonLabel slot="end">🌟{price}</IonLabel>
        </IonItem>
        <IonItem lines={"none"}>
          <IonLabel>Quantity</IonLabel>
          <IonRange
            min={min}
            max={max}
            value={quantity}
            onIonChange={({ detail }) => setQuantity(detail.value as number)}
          ></IonRange>
        </IonItem>
        <IonItem>
          <IonLabel slot="end">{quantity}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Total</IonLabel>
          <IonLabel slot="end">🌟{quantity * price}</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default QuickSellModal;
