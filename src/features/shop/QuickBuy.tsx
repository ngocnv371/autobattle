import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonRange,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ShopItemSchema } from "../../data/schema";
import {
  add,
  DEFAULT_CURRENCY,
  remove,
  selectOnItem,
} from "../inventory/inventorySlice";

const QuickBuy: React.FC<ShopItemSchema> = (props) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const currency = useAppSelector(selectOnItem(DEFAULT_CURRENCY));
  const max = (currency?.quantity || 0) / props.price;
  const min = max > 1 ? 1 : 0;
  const canBuy = min > 0;

  useEffect(() => {
    setQuantity(min);
  }, [props.name, min]);

  function handleBuy() {
    dispatch(add([{ name: props.name, quantity }]));
    dispatch(
      remove([{ name: DEFAULT_CURRENCY, quantity: quantity * props.price }])
    );
  }
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Quick Buy</IonCardTitle>
        <IonCardSubtitle>{props.name}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRange
          max={max}
          min={min}
          disabled={!canBuy}
          value={quantity}
          onIonChange={({ detail }) => setQuantity(detail.value as number)}
        ></IonRange>
      </IonCardContent>
      {!canBuy && (
        <IonItem color={"danger"}>
          <IonLabel>You don't have enough 🌟 to buy this</IonLabel>
        </IonItem>
      )}
      <IonItem>
        <IonLabel>x{quantity}</IonLabel>
        <IonLabel slot="end">🌟x{quantity * props.price}</IonLabel>
      </IonItem>
      <IonButton fill="clear" disabled={!canBuy} onClick={() => handleBuy()}>
        Buy
      </IonButton>
    </IonCard>
  );
};

export default QuickBuy;
