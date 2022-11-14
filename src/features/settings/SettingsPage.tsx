import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { load, reset, save } from "../../app/store";

const SettingsPage: React.FC = () => {
  const [presentAlert] = useIonAlert();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem
            onClick={async () => {
              await save();
              presentAlert({
                header: "Saved!",
                buttons: ["OK"],
              });
            }}
          >
            <IonLabel>Save</IonLabel>
          </IonItem>
          <IonItem
            onClick={() =>
              presentAlert({
                header: "Alert",
                message:
                  "Discard all changes since the last save and revert the application to the last save",
                buttons: [
                  {
                    text: "Cancel",
                    role: "cancel",
                  },
                  { text: "OK", role: "destructive", handler: load },
                ],
              })
            }
          >
            <IonLabel>Load</IonLabel>
          </IonItem>
          <IonItem
            onClick={() =>
              presentAlert({
                header: "Alert",
                message:
                  "This will delete all data and revert the application to the factory setting",
                buttons: [
                  {
                    text: "Cancel",
                    role: "cancel",
                  },
                  { text: "OK", role: "destructive", handler: reset },
                ],
              })
            }
          >
            <IonLabel color="danger">Factory Reset</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
