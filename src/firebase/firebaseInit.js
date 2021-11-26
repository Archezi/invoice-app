import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBERTWh-xSZC0ynKtjR9LZYFecWEBVR_5I',
  authDomain: 'invoice-app-f8170.firebaseapp.com',
  projectId: 'invoice-app-f8170',
  storageBucket: 'invoice-app-f8170.appspot.com',
  messagingSenderId: '76465416987',
  appId: '1:76465416987:web:de2520b66ac809983301be'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
