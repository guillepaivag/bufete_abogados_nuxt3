import { appDefault } from "./firebaseAppDefault";
import { getStorage } from "firebase/storage";

export const storage = getStorage(appDefault, "gs://cl-fotos_presentaciones-dev");