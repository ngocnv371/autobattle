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

const DungeonCard: React.FC<React.PropsWithChildren<MissionSchema>> = (props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.name}</IonCardTitle>
      </IonCardHeader>
      {props.description && (
        <IonCardContent>{props.description}</IonCardContent>
      )}
      <IonList>
        {props.enemies.map((m, idx) => (
          <IonItem key={idx}>
            <IonLabel>{m.name}</IonLabel>
            <IonLabel slot="end">{m.class} LV{m.level}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      {props.children}
    </IonCard>
  );
};

export default DungeonCard;
