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
  IonListHeader,
} from "@ionic/react";
import { ShopItemSchema } from "../../data/schema";
import { useAppSelector } from "../../app/hooks";
import { DEFAULT_CURRENCY, selectCanBuyQuantity } from "./shopSlice";
import { selectOneItem } from "../inventory/inventorySlice";

const QuickBuyModal = ({
  onDismiss,
  item,
}: {
  onDismiss: (data: null | number, role?: string) => void;
  item: ShopItemSchema;
}) => {
  const [quantity, setQuantity] = useState(0);
  const [min, max] = useAppSelector(selectCanBuyQuantity(item.name));
  const canBuy = min > 0;
  const currency = useAppSelector(selectOneItem(DEFAULT_CURRENCY));

  useEffect(() => {
    setQuantity(min);
  }, [min]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Buy</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => onDismiss(quantity, "confirm")}
              disabled={!canBuy}
            >
              Buy
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
          <IonLabel slot="end">🌟{item.price}</IonLabel>
        </IonItem>
        <IonItem lines={"none"}>
          <IonLabel>Quantity</IonLabel>
          <IonRange
            min={min}
            max={max}
            value={quantity}
            disabled={!canBuy}
            onIonChange={({ detail }) => setQuantity(detail.value as number)}
          ></IonRange>
        </IonItem>
        <IonItem>
          <IonLabel slot="end">{quantity}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Total</IonLabel>
          <IonLabel slot="end">🌟{quantity * item.price}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>You Have</IonLabel>
          <IonLabel slot="end">🌟{currency?.quantity || 0}</IonLabel>
        </IonItem>
        {!canBuy && (
          <IonItem color={"danger"}>
            <IonLabel>You don't have enough 🌟 to buy this</IonLabel>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default QuickBuyModal;
