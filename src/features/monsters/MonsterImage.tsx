import { IonImg } from "@ionic/react";

const MonsterImage: React.FC<{ image: string }> = (props) => {
  return (
    <IonImg src={`${process.env.PUBLIC_URL}/assets/monsters/${props.image}`} />
  );
};

export default MonsterImage;
