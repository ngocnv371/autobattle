import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
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
          <IonItem key={m.id}>{m.name}</IonItem>
        ))}
      </IonList>
      {props.children}
    </IonCard>
  );
};

export default PartyCard;
