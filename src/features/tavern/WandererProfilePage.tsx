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
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { RouteComponentProps } from "react-router";
import { selectMonsterByName } from "../monsters/monstersSlice";
import MonsterImage from "../monsters/MonsterImage";
import CharacterStats from "../party/CharacterStats";
import { remove, selectWandererById } from "./tavernSlice";
import { addMember, selectCanAddMember } from "../party/partySlice";

const WandererProfilePage: React.FC<
  RouteComponentProps<{ wandererId: string }>
> = ({ match }) => {
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const char = useAppSelector(selectWandererById(match.params.wandererId));
  const monster = useAppSelector(selectMonsterByName(char?.class || ""));
  const canHire = useAppSelector(selectCanAddMember);

  if (!char) {
    return null;
  }

  function handleHire() {
    dispatch(remove(match.params.wandererId));
    dispatch(addMember(char!));
    router.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Wanderer</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={!canHire} onClick={() => handleHire()}>
              Hire
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Wanderer</IonTitle>
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
        <CharacterStats {...char} />
      </IonContent>
    </IonPage>
  );
};

export default WandererProfilePage;
