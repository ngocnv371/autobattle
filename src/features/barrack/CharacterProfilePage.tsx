import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { levelUp, selectMember } from "./barrackSlice";
import { remove, selectInStock } from "../inventory/inventorySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Character } from "../../app/models";
import { RouteComponentProps } from "react-router";
import { useMemo } from "react";
import { monsterFactory } from "../../data";

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
  const requirements = useMemo(() => {
    const mc = monsterFactory(character.class, character.level);
    const req = mc.getLevelUpRequirements(character);
    return req;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.class, character.level]);
  const inStock = useAppSelector(selectInStock(requirements));

  function handleLevelUp() {
    dispatch(levelUp(character.id));
    dispatch(remove(requirements));
  }
  return (
    <IonCard>
      <IonCardHeader>Class Progression</IonCardHeader>
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

const CharacterProfilePage: React.FC<
  RouteComponentProps<{ partyId: string; memberId: string }>
> = ({ match }) => {
  const char = useAppSelector(selectMember(match.params.memberId));

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
            <IonTitle size="large">{char.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <Stat name="Class" value={char.class} />
          <Stat name="Level" value={char.level} />
        </IonList>
        <LevelUp character={char} />
      </IonContent>
    </IonPage>
  );
};

export default CharacterProfilePage;
