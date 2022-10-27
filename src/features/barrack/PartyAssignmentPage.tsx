import { IonButton, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { Party } from "./barrackSlice";
import PartyCard from "./PartyCard";
import PartyListPage from "./PartyListPage";

const PartyAssignmentPage: React.FC<
  RouteComponentProps<{ dungeon: string }>
> = ({ match }) => {
  const router = useIonRouter();
  function onSelectParty(p: Party) {
    router.push(`/atlas/${match.params.dungeon}/${p.id}`);
  }
  return (
    <PartyListPage
      renderParties={(parties) =>
        parties.map((p) => (
          <PartyCard key={p.id} {...p}>
            <IonButton fill="clear" onClick={() => onSelectParty(p)}>Assign</IonButton>
          </PartyCard>
        ))
      }
    />
  );
};

export default PartyAssignmentPage;
