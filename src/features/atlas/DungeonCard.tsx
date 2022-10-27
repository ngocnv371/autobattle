import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { Dungeon } from "./atlasSlice";

const DungeonCard: React.FC<React.PropsWithChildren<Dungeon>> = (props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.name}</IonCardTitle>
      </IonCardHeader>
      {props.description && (
        <IonCardContent>{props.description}</IonCardContent>
      )}
      <IonList>
        {props.monsters.map((m) => (
          <IonItem key={m.id}>
            <IonLabel>{m.name}</IonLabel>
            <IonLabel slot="end">LV{m.level}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      {props.children}
    </IonCard>
  );
};

export default DungeonCard;
