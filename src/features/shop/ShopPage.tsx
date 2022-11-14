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
  useIonModal,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import QuickBuyModal from "./QuickBuyModal";
import { DEFAULT_CURRENCY, restock, selectItems } from "./shopSlice";
import { OverlayEventDetail } from "@ionic/core/components";
import { ShopItemSchema } from "../../data/schema";
import { useState } from "react";
import { add, remove } from "../inventory/inventorySlice";

const ShopPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const [item, setItem] = useState<ShopItemSchema | null>(null);
  const [present, dismiss] = useIonModal(QuickBuyModal, {
    onDismiss: (quantity: number | null, role: string) =>
      dismiss(quantity, role),
    item: item!,
  });
  function openQuickBuyModal(item: ShopItemSchema) {
    setItem(item);
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          dispatch(add([{ name: item.name, quantity: ev.detail.data }]));
          dispatch(
            remove([
              { name: DEFAULT_CURRENCY, quantity: ev.detail.data * item.price },
            ])
          );
        }
      },
    });
  }
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
            <IonItem key={i.name} onClick={() => openQuickBuyModal(i)}>
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
