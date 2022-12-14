import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Character, Party } from "../../app/models";
import { addMember } from "../barrack/barrackSlice";
import { refresh, remove, selectWanderers } from "./tavernSlice";

const HireModal: React.FC<{ party: Party }> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const wanderers = useAppSelector(selectWanderers);
  const [selectedItem, setSelectedItem] = useState<Character | null>(null);

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
  function handleClose() {
    if (!selectedItem) {
      return;
    }
    setIsOpen(false);
    dispatch(
      addMember({
        partyId: props.party.id,
        member: selectedItem,
      })
    );
    dispatch(remove(selectedItem.id));
    setSelectedItem(null);
  }
  return (
    <>
      <IonButton
        fill="clear"
        disabled={props.party.members.length >= 5}
        onClick={() => setIsOpen(true)}
      >
        + Hire
      </IonButton>
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleRefresh}>
                Refresh
              </IonButton>
            </IonButtons>
            <IonTitle>Wanderers</IonTitle>
            <IonButtons slot="end">
              <IonButton disabled={!selectedItem} onClick={handleClose}>
                Select
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="">
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
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default HireModal;
