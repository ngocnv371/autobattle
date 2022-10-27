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
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Item, selectItems, sell } from "./inventorySlice";

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
          {items.map((d) => (
            <IonItem
              key={d.name}
              onClick={() => setSelectedItem(d)}
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
