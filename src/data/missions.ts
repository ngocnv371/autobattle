import { MissionSchema } from "./schema";

function parseMissions() {
  try {
    const missions = require("./seed/missions.json") as MissionSchema[];
    return missions;
  } catch (e) {
    console.error("failed to parse missions", e);
    return [];
  }
}

const missions: MissionSchema[] = parseMissions();

export default missions;
