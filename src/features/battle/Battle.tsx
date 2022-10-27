import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDungeons } from "../atlas/atlasSlice";
import { selectParties } from "../barrack/barrackSlice";
import { add, Item } from "../inventory/inventorySlice";
import {
  selectIsOver,
  selectLoot,
  selectMonsters,
  selectPlayers,
  selectStatus,
  start,
  update,
} from "./battleSlice";
import Combatant from "./Combatant";

const Loot: React.FC<{ items: Item[] }> = (props) => {
  return (
    <IonList>
      <IonListHeader>Loot</IonListHeader>
      {props.items.map((l) => (
        <IonItem key={l.name}>
          <IonLabel>{l.name}</IonLabel>
          <IonLabel slot="end">{l.quantity}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

const Battle: React.FC<
  RouteComponentProps<{ dungeon: string; party: string }>
> = ({ match }) => {
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const dungeons = useAppSelector(selectDungeons);
  const parties = useAppSelector(selectParties);
  const players = useAppSelector(selectPlayers);
  const monsters = useAppSelector(selectMonsters);
  const isOver = useAppSelector(selectIsOver);
  const loot = useAppSelector(selectLoot);

  useEffect(() => {
    const dungeon = dungeons.find((d) => d.id === match.params.dungeon);
    const party = parties.find((d) => d.id === match.params.party);
    dispatch(start([...(dungeon?.monsters || []), ...(party?.members || [])]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    let lastUpdate = new Date();
    const handle = setInterval(() => {
      if (status !== "running") {
        return;
      }
      const now = new Date();
      const delta = now.getTime() - lastUpdate.getTime();
      dispatch(update(delta));
      lastUpdate = now;
    }, 250);
    return () => clearInterval(handle);
  }, [dispatch, status]);

  function handleDone() {
    dispatch(add(loot));
    router.goBack();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Battle</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={!isOver} onClick={() => handleDone()}>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Battle</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {monsters.map((m) => (
              <IonCol key={m.id} size="3">
                <Combatant combatant={m} />
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            {players.map((m) => (
              <IonCol key={m.id} size="3">
                <Combatant combatant={m} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {status === "playerWin" && <Loot items={loot} />}
        {status === "playerLoose" && (
          <IonCard>
            <IonCardContent>
              <IonLabel color="danger">You loose</IonLabel>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Battle;
