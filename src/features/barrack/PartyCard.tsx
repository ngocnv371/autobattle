import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { Party } from "./barrackSlice";

const PartyCard: React.FC<React.PropsWithChildren<Party>> = (props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.name}</IonCardTitle>
      </IonCardHeader>
      <IonList>
        {props.members.map((m) => (
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

export default PartyCard;
