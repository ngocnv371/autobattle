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
import { selectItems, sell } from "./inventorySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Item } from "../../app/models";
import { useState } from "react";

const InventoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  function handleSell() {
    if (!selectedItem) {
      return;
    }
    dispatch(sell(selectedItem));
    setSelectedItem(null);
  }
  function handleSelect(w: Item) {
    if (!selectedItem) {
      setSelectedItem(w);
    } else if (selectedItem.name !== w.name) {
      setSelectedItem(w);
    } else {
      setSelectedItem(null);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventory</IonTitle>
          <IonButtons slot="end">
            {selectedItem && (
              <IonButton
                disabled={selectedItem.name === "Gold"}
                onClick={() => handleSell()}
              >
                Sell
              </IonButton>
            )}
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
              <IonLabel>You don't have anything</IonLabel>
            </IonItem>
          )}
          {items.map((d) => (
            <IonItem
              key={d.name}
              onClick={() => handleSelect(d)}
              color={selectedItem?.name === d.name ? "primary" : ""}
            >
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
