import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { MissionSchema } from "../../data/schema";

const MissionCard: React.FC<React.PropsWithChildren<MissionSchema>> = (
  props
) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{props.description}</IonCardContent>
      <IonList>
        {props.enemies.map((m, idx) => (
          <IonItem key={idx} routerLink={`/missions/monsters/${m.class}/${m.level}`}>
            <IonLabel>{m.name}</IonLabel>
            <IonLabel slot="end">
              {m.class} LV{m.level}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      {props.children}
    </IonCard>
  );
};

export default MissionCard;
