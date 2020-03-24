/*var uid = null;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    }else{
        uid = null;
        window.location.replace('login.html');
    }
  });

  function logOut(){
      firebase.auth().signOut();
  }*/

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
         return url.value = "https://firebasestorage.googleapis.com/v0/b/emprendete-842ea.appspot.com/o/unnamed.jpg?alt=media&token=95ba6f13-90ca-4a45-8358-6de4c0c846a3";
    }else{
        return url;
    }
}

function emptyImg(img){
    if(img==undefined){
         //return img.value = 'unnamed.jpg';
         //return storage.ref('Imagenes/unnamed.jpg');
         return 'unnamed.jpg'
    }else{
        return img.name;
    }
}

function addImg(imagen,nombre,folder){
    let storageRef = storage.ref('Imagenes/'+folder+'/'+nombre);
    console.log(nombre);
    if(nombre!='unnamed.jpg'){
        let uploadTask = storageRef.put(imagen);
        uploadTask.on('state_changed',function(snapshot){})
    }
}

addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnEnviar").click();
    }
});



