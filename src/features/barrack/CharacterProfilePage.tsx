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
import { RouteComponentProps } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Character } from "../battle/models";
import { levelUp, selectMember } from "./barrackSlice";

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
  function handleLevelUp() {
    dispatch(levelUp(character.id));
  }
  return (
    <IonCard>
      <IonCardHeader>Class Progression</IonCardHeader>
      <IonList>
        <IonItem>
          <IonLabel>Branch</IonLabel>
          <IonLabel slot="end">1</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Dog's Ear</IonLabel>
          <IonLabel slot="end">3</IonLabel>
        </IonItem>
      </IonList>
      <IonButton fill="clear" onClick={() => handleLevelUp()}>
        Level Up
      </IonButton>
    </IonCard>
  );
};

const CharacterProfilePage: React.FC<
  RouteComponentProps<{ party: string; member: string }>
> = ({ match }) => {
  const char = useAppSelector(selectMember(match.params.member));

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
          <Stat name="Faction" value={char.faction} />
          <Stat name="Life" value={char.maxLife} />
          <Stat name="STR" value={char.str} />
          <Stat name="DEX" value={char.dex} />
          <Stat name="INT" value={char.int} />
        </IonList>
        <LevelUp character={char} />
      </IonContent>
    </IonPage>
  );
};

export default CharacterProfilePage;
