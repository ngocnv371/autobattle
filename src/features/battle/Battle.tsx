import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
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
import {
  selectMonsters,
  selectPlayers,
  selectStatus,
  start,
  update,
} from "./battleSlice";
import Combatant from "./Combatant";

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
    router.goBack();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Battle</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={status !== "ended"}
              onClick={() => handleDone()}
            >
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
      </IonContent>
    </IonPage>
  );
};

export default Battle;
