
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { createInfo } from "./firestore.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBJac97GohvXHisfFSuDb90UU7SgwkVQB8",
    authDomain: "uploadimage-f8309.firebaseapp.com",
    projectId: "uploadimage-f8309",
    storageBucket: "uploadimage-f8309.appspot.com",
    messagingSenderId: "327642393170",
    appId: "1:327642393170:web:6a5e3c91f3540464f14d8b"
  };
// initializeApp(firebaseConfig);
  // Initialize Firebase
  const apps = initializeApp(firebaseConfig,"primary");

  const storage=getStorage(apps);
var imagenes=[];

document.getElementById("myform").addEventListener("submit",async (e)=>{
  let mybutton=document.getElementById("btnSubmit");
  let status=document.getElementById("label-status");
  mybutton.disabled=true;
status.innerHTML="Subiendo...."
    e.preventDefault();
    let data=Object.fromEntries(new FormData(e.target))
   let img=[];
let tipo=data.tipo;
 img.push(data.img);
console.log(img)
console.log(data)
try {

    for(let i =0; i<img.length; i++){ 
          console.log(img)
        const imgRef=ref(storage,`${tipo}/`+img[i].name)
        await uploadBytes(imgRef,img[i]); 
        let urlImage=await getDownloadURL(imgRef);
        let viewimage=document.getElementById("viewimage");
        viewimage.src=urlImage
        let uploaddata={
            descripcion:data.descripcion,
            nombre:data.nombre,
            precio:data.precio,

            url:urlImage
        }

      createInfo(uploaddata,tipo)
        mybutton.disabled=false
    }
 
    aviso("Aviso","el registro fue creado","success"); 
    document.getElementById("myform").reset()
   status.innerHTML="Completado..."
   document.getElementById("preview-image").src = "";
} catch (error) {
 // aviso("Aviso","el registro no fue creado "+error,"error");
    console.log(error)
}

  } );

  document.getElementById("img").addEventListener("change",e=>{
    console.log(e.target.files[0])
    let image=e.target.files[0]
    if(e.target.files.length > 0){
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("preview-image");
      preview.src = src;
      preview.style.display = "block";
    }
  })

  document.getElementById("btnAviso").addEventListener("click",()=>{
    aviso("Aviso","el registro fue creado","warning");
  })


  function aviso(Title, message, type){
    let mydiv=document.createElement("div");
    mydiv.className=`myalert ${type}`
    let msg=document.createElement("label");

    let title=document.createElement("label");
    title.className="title-alert"
    title.innerHTML=Title;
    msg.innerHTML=message

    mydiv.appendChild(title)
    mydiv.appendChild(msg)
    document.body.insertAdjacentElement("afterbegin",mydiv)
    console.log(document.body)
    setTimeout(()=>{
  document.body.removeChild(mydiv)
  console.log("removido")
    }, "3000")
  
  }

  window.addEventListener("DOMContentLoaded",(e)=>{
    setTimeout(()=>{
      console.log("cargando...")
      aviso("Espere","Cargando","success")
    },3000)
   
  })