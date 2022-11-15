import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import MissionCard from "./MissionCard";
import { selectMissions } from "./missionsSlice";

function MissionsPage() {
  const missions = useAppSelector(selectMissions).sort((a, b) => b.level - a.level);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Missions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Missions</IonTitle>
          </IonToolbar>
        </IonHeader>
        {missions.map((d) => (
          <MissionCard key={d.id} {...d}>
            <IonButton fill="clear" routerLink={`/missions/${d.id}`}>
              Enter
            </IonButton>
          </MissionCard>
        ))}
      </IonContent>
    </IonPage>
  );
}

export default MissionsPage;
