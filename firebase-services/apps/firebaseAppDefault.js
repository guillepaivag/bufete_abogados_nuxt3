import { initializeApp } from 'firebase/app'
import { configAppDefault } from '~~/firebase-services/configs/configAppDefault'

export const appDefault = initializeApp(configAppDefault)