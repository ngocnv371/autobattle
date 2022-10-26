import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonImg,
  IonProgressBar,
} from "@ionic/react";

import * as models from "./models";

interface Props {
  combatant: models.Combatant;
}

function Combatant(props: Props) {
  const rested =
    props.combatant.life > 0
      ? props.combatant.recovery - props.combatant.rested
      : 0;
  return (
    <IonCard className="ion-no-margin" disabled={props.combatant.life <= 0}>
      <IonProgressBar
        value={props.combatant.life / props.combatant.maxLife}
      ></IonProgressBar>
      <IonImg src="https://picsum.photos/200/200" />
      <IonCardHeader className="ion-no-padding">
        <IonCardSubtitle>
          {props.combatant.name}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonProgressBar
        color="success"
        value={rested / props.combatant.recovery}
      ></IonProgressBar>
    </IonCard>
  );
}
export default Combatant;
