import * as firebase from 'firebase/app'
import 'firebase/firestore'

import * as geofirex from 'geofirex'
import { get } from 'geofirex'
//import {data} from './data'

const firebaseConfig = {
    apiKey: "AIzaSyBkHCsHa6aFjjPRfJTyHz45RVx6V1RooCo",
    authDomain: "covid-open-source.firebaseapp.com",
    databaseURL: "https://covid-open-source.firebaseio.com",
    projectId: "covid-open-source",
    storageBucket: "covid-open-source.appspot.com",
    messagingSenderId: "697006273250",
    appId: "1:697006273250:web:e3dcac0b791298c9f4a4bb",
    measurementId: "G-J604408TH5"
  };

firebase.initializeApp(firebaseConfig)
const geo = geofirex.init(firebase)

export async function api(lat,lng){

    const cities = firebase.firestore().collection('districts')

    const center = geo.point(lat,lng)
    const radius = 100;
    const field = 'position';

    const query = geo.query(cities).within(center, radius, field);

    const result = await get(query)
    console.log(result)
    return result;
    
}

export async function state(state){
  const cities = firebase.firestore().collection('districts').where('state',"==",state)
  const result = await cities.get().then(snapshot=>{
    var items = []
    snapshot.forEach(doc =>items.push(doc.data()))
    return items.sort(compare)
  })
  console.log(result)
  return result
}

/*export async function write(){
  data.forEach(element => {
    const cities = firebase.firestore().collection('districts')
    const position = geo.point(element.lat,element.lng)
    cities.doc(element.name).set({name : element.name, state : element.state, unknown: element.unkonwn, count : element.count, position}).then(snap=>{
      console.log(element.name, " Success")
    }).catch(error=> console.log(error))
  });
}
*/

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.count;
  const bandB = b.count;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison * -1;
}
export default api;
