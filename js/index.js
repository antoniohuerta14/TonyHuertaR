//Inicializacion de Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAolZ3RTeKa9ypeD9iouQy9sB1DzrYMy0A",
  authDomain: "subir-y-ver.firebaseapp.com",
  databaseURL: "https://subir-y-ver.firebaseio.com",
  projectId: "subir-y-ver",
  storageBucket: "subir-y-ver.appspot.com",
  messagingSenderId: "154329800121",
  appId: "1:154329800121:web:f8da9cf0e0b09205216a68"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Funciones get()
function getId(id){
    return document.getElementById(id).value;
}

function getOptions(op){
    var opcion = document.getElementById(op);
    var seleccion = opcion.options[opcion.selectedIndex].value;
    return (seleccion);
}

function validateEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)==false) {
        alert("E-mail NO VALIDO!"); 
        $("#email").val("");
        return false;
    }else{
        return true;
    }
}

function emptyUrl(url){
    if(url.length==0){
         return url.value = "https://firebasestorage.googleapis.com/v0/b/subir-y-ver.appspot.com/o/default%20avatar.png?alt=media&token=a4ea5a85-6376-4f7a-a52a-5ec6d35f9ea5";
    }else{
        return url;
    }
}

addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnEnviar").click();
    }
});



