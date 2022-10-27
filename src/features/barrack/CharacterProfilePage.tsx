import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { Character } from "../battle/models";
import { selectParties } from "./barrackSlice";

const Stat: React.FC<{ name: string; value: any }> = (props) => {
  return (
    <IonItem>
      <IonLabel>{props.name}</IonLabel>
      <IonLabel slot="end">{props.value}</IonLabel>
    </IonItem>
  );
};

const CharacterProfilePage: React.FC<
  RouteComponentProps<{ party: string; member: string }>
> = ({ match }) => {
  const parties = useAppSelector(selectParties);
  const [char, setChar] = useState<Character | null>(null);

  useEffect(() => {
    const p = parties.find((p) => p.id === match.params.party);
    if (!p) {
      return;
    }
    const me = p.members.find((m) => m.id === match.params.member);
    if (!me) {
      return;
    }
    setChar(me);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.member, match.params.party]);

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
          <Stat name="Faction" value={char.faction} />
          <Stat name="Life" value={char.maxLife} />
          <Stat name="STR" value={char.str} />
          <Stat name="DEX" value={char.dex} />
          <Stat name="INT" value={char.int} />
          <Stat name="Skill" value={char.skill} />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CharacterProfilePage;
