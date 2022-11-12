import { Storage } from "@ionic/storage";

const storage = new Storage();

export async function createStorage() {
  return storage.create();
}

export default storage;
