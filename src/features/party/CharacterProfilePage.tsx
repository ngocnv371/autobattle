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
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { levelUp, removeMember, selectMemberById } from "./partySlice";
import { remove, selectInStock } from "../inventory/inventorySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Character } from "../../app/models";
import { RouteComponentProps } from "react-router";
import {
  selectLevelUpRequirements,
  selectMonsterByName,
} from "../monsters/monstersSlice";
import MonsterImage from "../monsters/MonsterImage";
import CharacterStats from "./CharacterStats";

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

const CharacterProfilePage: React.FC<
  RouteComponentProps<{ memberId: string }>
> = ({ match }) => {
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
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
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                presentAlert({
                  header: "Alert",
                  message: "Do you want to kick this member from the party?",
                  buttons: [
                    { text: "Cancel", role: "cancel" },
                    {
                      text: "OK",
                      role: "destructive",
                      handler: () => {
                        dispatch(removeMember(char.id));
                        router.goBack();
                      },
                    },
                  ],
                });
              }}
            >
              Kick
            </IonButton>
          </IonButtons>
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
        <CharacterStats {...char} />
        <LevelUp character={char} />
      </IonContent>
    </IonPage>
  );
};

export default CharacterProfilePage;
