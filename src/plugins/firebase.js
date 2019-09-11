import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'

const firebaseConfig = require('../../config/firebase.config.json')
const messagingConfig = require('../../config/messaging.config.json')

let _messaging = null

if (firebase.apps.length) {
  firebase.app()
} else {
  firebase.initializeApp({ ...firebaseConfig })

  _messaging = firebase.messaging()
  _messaging.usePublicVapidKey(messagingConfig.vapid_key)
}

const auth = firebase.auth
const db = firebase.firestore()
const storage = firebase.storage()
const messaging = _messaging

export { auth, db, storage, messaging }
