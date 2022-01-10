import { KeyStorage } from "./KeyStorage";

const keyStorage = new KeyStorage();
keyStorage.set("newKey", "new Value");
keyStorage.get("newKey");
