
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import {
    getFirestore,
    collection,
    doc,
setDoc,
addDoc,
getDoc,
onSnapshot,
getDocs,
limit,
where,
orderBy,
updateDoc
  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfigs = {
  apiKey: "AIzaSyDkWHAaRIHgFgnokvSpgyLFIvTfsTUFQno",
  authDomain: "racoonprint-9f247.firebaseapp.com",
  projectId: "racoonprint-9f247",
  storageBucket: "racoonprint-9f247.appspot.com",
  messagingSenderId: "94387403363",
  appId: "1:94387403363:web:dcb0b4be8903b59199d656"
};
  // Initialize Firebase
 const secondary=initializeApp(firebaseConfigs,"secondary");
  const firestore=getFirestore(secondary);
  const docBordado=doc(firestore,"Bordado/primero")
  const manualidadCollection=collection(firestore,"Manualidad")

  export async function createInfo(data, tipo){
    console.log(tipo)
    

const insert=   await addDoc(collection(firestore,`${tipo}`),data)

        console.log(insert.id);



    /*
    const insert= await setDoc(docBordado,data);
console.log("insertado "+insert.id);
    await updateDoc(insert,{
        id:insert.id
    })*/
  }


  async function getInfoOneDocument(){
    const mySnapchot=await getDoc(docBordado);
    if(mySnapchot.exists()){
      const data= mySnapchot.data();
      console.log(`mis datos son ${JSON.stringify(data)}`)
    }
  }
 
  //escuchar cambios en tiempo real
  // let dailySpecialUnsuscribe
  function changeRealTime(){
    
    //dailySpecialUnsiscribe = 
    onSnapshot(docBordado,(docSnapshot)=>{
      const data=docSnapshot.data();
      console.log(`mis datos son ${JSON.stringify(data)}`)
    })
  };
  /*
  function cancelMyListenerAtTheAppropriateTien(){
    dailySpecialUnsuscribe();
  }*/
  //changeRealTime();

  async function  getAllDocument(){
    //para un solo registro
    //const  data=query(collection(firestore,"Manualidad"),where("nombre","==","nose"),limit(10));
    const querySnapshot=await getDocs(manualidadCollection);
    const alldocs= querySnapshot.forEach((element)=>{
      console.log(`Document ${element.id} contiene ${JSON.stringify(element.data())}`);
    })
  }
  //getAllDocument();