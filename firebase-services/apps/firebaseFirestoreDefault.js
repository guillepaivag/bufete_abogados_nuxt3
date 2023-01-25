import { appDefault } from "./firebaseAppDefault";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(appDefault);