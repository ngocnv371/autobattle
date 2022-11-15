import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { levelUp, selectMemberById } from "./partySlice";
import { remove, selectInStock } from "../inventory/inventorySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Character } from "../../app/models";
import { RouteComponentProps } from "react-router";
import {
  selectLevelUpRequirements,
  selectMonsterByName,
  selectStatsByLevel,
} from "../monsters/monstersSlice";
import MonsterImage from "../monsters/MonsterImage";

const Stat: React.FC<{ name: string; value: any }> = (props) => {
  return (
    <IonItem>
      <IonLabel>{props.name}</IonLabel>
      <IonLabel slot="end">{props.value}</IonLabel>
    </IonItem>
  );
};

const LevelUp: React.FC<{ character: Character }> = ({ character }) => {
  const dispatch = useAppDispatch();
  const requirements = useAppSelector(
    selectLevelUpRequirements(character.class, character.level),
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );

  const inStock = useAppSelector(selectInStock(requirements));

  function handleLevelUp() {
    dispatch(levelUp(character.id));
    dispatch(remove(requirements));
  }
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Class Progression</IonCardTitle>
      </IonCardHeader>
      <IonList>
        {requirements.map((r) => (
          <IonItem key={r.name}>
            <IonLabel>{r.name}</IonLabel>
            <IonLabel slot="end">{r.quantity}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonButton
        disabled={!inStock}
        fill="clear"
        onClick={() => handleLevelUp()}
      >
        Level Up
      </IonButton>
    </IonCard>
  );
};

const Stats: React.FC<Character> = (props) => {
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

const CharacterProfilePage: React.FC<
  RouteComponentProps<{ memberId: string }>
> = ({ match }) => {
  const char = useAppSelector(selectMemberById(match.params.memberId));
  const monster = useAppSelector(selectMonsterByName(char?.class || ""));

  if (!char) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Character</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Character</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          {monster?.image && <MonsterImage image={monster!.image} />}
          <IonCardHeader>
            <IonCardTitle>{char.name}</IonCardTitle>
            <IonCardSubtitle>
              LV{char.level} {char.class}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <Stats {...char} />
        <LevelUp character={char} />
      </IonContent>
    </IonPage>
  );
};

export default CharacterProfilePage;
