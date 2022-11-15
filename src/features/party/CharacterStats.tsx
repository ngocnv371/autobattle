import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { selectStatsByLevel } from "../monsters/monstersSlice";

const Stat: React.FC<{ name: string; value: any }> = (props) => {
  return (
    <IonItem>
      <IonLabel>{props.name}</IonLabel>
      <IonLabel slot="end">{props.value}</IonLabel>
    </IonItem>
  );
};

const CharacterStats: React.FC<{ class: string; level: number }> = (props) => {
  const data = useAppSelector(selectStatsByLevel(props.class, props.level));
  if (!data) {
    return null;
  }
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Stats</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <Stat name="INT" value={data.int} />
        <Stat name="STR" value={data.str} />
        <Stat name="DEX" value={data.dex} />
        <Stat name="Life" value={data.maxLife} />
        <Stat name="Mana" value={data.maxMana} />
        <Stat name="Recovery" value={data.recovery} />
        <Stat name="Base Damage" value={data.baseDamage} />
      </IonList>
    </IonCard>
  );
};

export default CharacterStats;
