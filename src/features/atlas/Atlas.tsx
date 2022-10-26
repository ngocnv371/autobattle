import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { Dungeon, selectDungeons } from "./atlasSlice";
import DungeonCard from "./DungeonCard";

function Atlas() {
  const dungeons = useAppSelector(selectDungeons);
  const router = useIonRouter();
  function onSelectDungeon(d: Dungeon) {
    router.push(`/atlas/${d.id}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dungeons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dungeons</IonTitle>
          </IonToolbar>
        </IonHeader>
        {dungeons.map((d) => (
          <DungeonCard key={d.id} {...d}>
            <IonButton fill="clear" onClick={() => onSelectDungeon(d)}>
              Enter
            </IonButton>
          </DungeonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}

export default Atlas;
