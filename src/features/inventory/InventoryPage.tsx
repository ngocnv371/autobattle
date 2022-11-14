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
  useIonModal,
} from "@ionic/react";
import { add, remove, selectItems } from "./inventorySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { OverlayEventDetail } from "@ionic/core/components";
import { Item } from "../../app/models";
import { useState } from "react";
import QuickSellModal from "./QuickSellModal";
import { DEFAULT_CURRENCY } from "../shop/shopSlice";

const InventoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const [item, setItem] = useState<Item | null>(null);
  const [present, dismiss] = useIonModal(QuickSellModal, {
    onDismiss: (quantity: number | null, price: number, role: string) =>
      dismiss({quantity, price}, role),
    item: item!,
  });
  function openQuickSellModal(item: Item) {
    setItem(item);
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          const { price, quantity } = ev.detail.data
          dispatch(add([{ name: DEFAULT_CURRENCY, quantity: price * quantity }]));
          dispatch(
            remove([
              { name: item.name, quantity },
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
          <IonTitle>Inventory</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/inventory/shop">Shop</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inventory</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {items.length === 0 && (
            <IonItem color={"warning"}>
              <IonLabel>Empty</IonLabel>
            </IonItem>
          )}
          {items.map((d) => (
            <IonItem key={d.name} onClick={() => openQuickSellModal(d)}>
              <IonLabel>{d.name}</IonLabel>
              <IonLabel slot="end">{d.quantity}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InventoryPage;
