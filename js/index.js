//Inicializacion de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCChTlB7gD-N9RgY2helvb0g3zj1nWrIFc",
    authDomain: "emprendete-842ea.firebaseapp.com",
    databaseURL: "https://emprendete-842ea.firebaseio.com",
    projectId: "emprendete-842ea",
    storageBucket: "emprendete-842ea.appspot.com",
    messagingSenderId: "781556060139",
    appId: "1:781556060139:web:1e40fe86238bdb4e8053ae",
    measurementId: "G-3VDV6LJHCM"
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



