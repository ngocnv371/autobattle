import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { RouteComponentProps } from "react-router";
import { selectMonsterByName } from "../monsters/monstersSlice";
import MonsterImage from "../monsters/MonsterImage";
import CharacterStats from "../party/CharacterStats";

const MonsterProfilePage: React.FC<
  RouteComponentProps<{ class: string; level: string }>
> = ({ match }) => {
  const monster = useAppSelector(selectMonsterByName(match.params.class));

  if (!monster) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Monster</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Monster</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          {monster?.image && <MonsterImage image={monster!.image} />}
          <IonCardHeader>
            <IonCardSubtitle>
              LV{match.params.level} {match.params.class}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <CharacterStats
          class={match.params.class}
          level={Number(match.params.level)}
        />
      </IonContent>
    </IonPage>
  );
};

export default MonsterProfilePage;
