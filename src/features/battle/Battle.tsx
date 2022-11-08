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
import {
  selectCombatants,
  selectIsOver,
  selectLogs,
  selectLoot,
  selectStatus,
  start,
  update,
} from "./battleSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

import Combatant from "./Combatant";
import { Item } from "../../app/models";
import { RouteComponentProps } from "react-router";
import { add } from "../inventory/inventorySlice";
import { selectMembers } from "../barrack/barrackSlice";
import { selectMonsters } from "../atlas/atlasSlice";

const Loot: React.FC<{ items: Item[] }> = (props) => {
  const [show, setShow] = useState(true);
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Loot</IonLabel>
        <IonButton onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </IonButton>
      </IonListHeader>
      {show &&
        props.items.map((l) => (
          <IonItem key={l.name}>
            <IonLabel>{l.name}</IonLabel>
            <IonLabel slot="end">{l.quantity}</IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};

const Logs: React.FC = () => {
  const logs = useAppSelector(selectLogs);
  const [show, setShow] = useState(false);
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Battle Logs</IonLabel>
        <IonButton onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </IonButton>
      </IonListHeader>
      {show && logs.map((m, idx) => <IonItem key={idx}>{m}</IonItem>)}
    </IonList>
  );
};

const Battle: React.FC<
  RouteComponentProps<{ dungeonId: string; partyId: string }>
> = ({ match }) => {
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const originalMonsters = useAppSelector(selectMonsters(match.params.dungeonId));
  const originalMembers = useAppSelector(selectMembers(match.params.partyId));
  const players = useAppSelector(selectCombatants('player'));
  const monsters = useAppSelector(selectCombatants('monster'));
  const isOver = useAppSelector(selectIsOver);
  const loot = useAppSelector(selectLoot);

  useEffect(() => {
    dispatch(
      start({
        monsters: originalMonsters,
        players: originalMembers,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, originalMonsters, originalMembers]);

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
        {status === "playerWin" && (
          <IonCard>
            <IonCardContent>
              <IonLabel color="success">You Win</IonLabel>
            </IonCardContent>
          </IonCard>
        )}
        {status === "playerWin" && <Loot items={loot} />}
        {status === "playerLoose" && (
          <IonCard>
            <IonCardContent>
              <IonLabel color="danger">You loose</IonLabel>
            </IonCardContent>
          </IonCard>
        )}
        {isOver && <Logs />}
      </IonContent>
    </IonPage>
  );
};

export default Battle;
