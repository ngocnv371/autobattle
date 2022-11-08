import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { Character, Party } from "../../app/models";

const PartyCard: React.FC<
  React.PropsWithChildren<Party & { onSelectMember?: (m: Character) => void }>
> = (props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.name}</IonCardTitle>
      </IonCardHeader>
      <IonList>
        {props.members.map((m) => (
          <IonItem
            key={m.id}
            onClick={() => props.onSelectMember && props.onSelectMember(m)}
          >
            <IonLabel>{m.name}</IonLabel>
            <IonLabel slot="end">{m.class} LV{m.level}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      {props.children}
    </IonCard>
  );
};

export default PartyCard;
