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
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Character } from "../../app/models";
import { addMember, selectCanAddMember } from "../party/partySlice";
import { refresh, remove, selectWanderers } from "./tavernSlice";

const TavernPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const wanderers = useAppSelector(selectWanderers);
  const canHire = useAppSelector(selectCanAddMember);
  const [selectedItem, setSelectedItem] = useState<Character | null>(null);
  function handleHire() {
    if (!selectedItem) {
      return;
    }
    dispatch(remove(selectedItem.id));
    dispatch(addMember(selectedItem));
    setSelectedItem(null);
  }
  function handleSelect(w: Character) {
    if (!selectedItem) {
      setSelectedItem(w);
    } else if (selectedItem.id !== w.id) {
      setSelectedItem(w);
    } else {
      setSelectedItem(null);
    }
  }
  function handleRefresh() {
    dispatch(refresh());
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Tavern</IonTitle>
          <IonButtons slot="end">
            {selectedItem && canHire && (
              <IonButton onClick={() => handleHire()}>Hire</IonButton>
            )}
            <IonButton onClick={() => handleRefresh()}>Refresh</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tavern</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {wanderers.map((d) => (
            <IonItem
              key={d.id}
              onClick={() => handleSelect(d)}
              color={selectedItem?.id === d.id ? "primary" : ""}
            >
              <IonLabel>{d.name}</IonLabel>
              <IonLabel slot="end">
                {d.class} LV{d.level}
              </IonLabel>
            </IonItem>
          ))}
          {!wanderers.length && (
            <IonItem>
              <IonLabel color="warning">Tavern is empty, try Refresh</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TavernPage;
