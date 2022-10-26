import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
} from "@ionic/react";
import { Dungeon } from "./atlasSlice";

const DungeonCard: React.FC<React.PropsWithChildren<Dungeon>> = (props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.name}</IonCardTitle>
      </IonCardHeader>
      <IonList>
        {props.monsters.map((m) => (
          <IonItem key={m.id}>{m.name}</IonItem>
        ))}
      </IonList>
      {props.children}
    </IonCard>
  );
};

export default DungeonCard;
