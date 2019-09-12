import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'

const firebaseConfig = require('../../config/firebase.config.json')

if (firebase.apps.length) {
  firebase.app()
} else {
  firebase.initializeApp({ ...firebaseConfig })
}

const auth = firebase.auth
const db = firebase.firestore()
const storage = firebase.storage()

export { auth, db, storage }
