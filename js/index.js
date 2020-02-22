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
    //return re.test(email);
    if (re.test(email)==false) {
        alert("E-mail NO VALIDO!"); 
        $("#email").val("");
        //$("input[type=email]")

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

//Datos en Arreglo JSON
function arrayJSON(nombre,apellido,edad,genero,carrera,semestre,email,url){
    var data = {
        nombre : nombre,
        apellido : apellido,
        edad: edad,
        genero: genero,
        carrera: carrera,
        semestre: semestre,
        email: email,
        url:url
    };
    return data;
}

function createTable(id,nombre,apellido,edad,genero,carrera,semestre,email,url){
    return '<tr>'+
    '<td id="tablaID">'+id+'</td>'+
    '<td>'+nombre+'</td>'+
    '<td>'+apellido+'</td>'+
    '<td>'+edad+'</td>'+
    '<td>'+genero+'</td>'+
    '<td>'+carrera+'</td>'+
    '<td id="sem">'+semestre+'</td>'+
    '<td>'+email+'</td>'+
    '<td> <a href="'+url+'">'+url+'<a/></td>'+
    '</tr>';
}

function innerHTML(valor,result){
    return document.getElementById(valor).innerHTML+=result;

}

//Recoge los datos y los inserta en la Base de Datos
function insertData(){
    var id = getId("idEstudiante");
    var nombre = getId("nombreEstudiante");
    var apellido = getId("apellidoEstudiante");
    var edad = parseInt(getId("edadEstudiante"));
    var genero = $('input[name=genero]:checked').val();
    var carrera = getOptions("carrera");
    var semestre = parseInt(getOptions("sem"));
    var email = getId("email");
    var url = getId("url");

    var urlVerified = emptyUrl(url);

    if(id.length==0||nombre.length==0||apellido.length==0|| 
        edad.length==0){
        alert("EMPTY FIELDS");
    }else{
        if(validateEmail(email)){
            var arrayData = arrayJSON(nombre,apellido,edad,genero,carrera,semestre,email,urlVerified);
            const insertar = firebase.database().ref('participantes/'+id);
            insertar.update(arrayData);

            if (confirm('Los datos son correctos?')){
                alert("Se Añadieron Correctamente");
                $('#formulario').trigger("reset");
            }
        }
    }
}

function getData(){
    var task = firebase.database().ref("participantes/");
    task.on("child_added",function(data){
        var taskValue = data.val();
        
        var idAdd = data.key;
        var nombreAdd = taskValue.nombre;
        var apellidoAdd = taskValue.apellido;
        var edadAdd = taskValue.edad;
        var generoAdd = taskValue.genero;
        var carreraAdd = taskValue.carrera;
        var semAdd = taskValue.semestre;
        var mailAdd = taskValue.email;
        var urlAdd = taskValue.url;

        var tabla = createTable(idAdd,nombreAdd,apellidoAdd,edadAdd,generoAdd,carreraAdd,semAdd,mailAdd,urlAdd);
        innerHTML('tablaFirebase',tabla);
    })
}

//Al teclear Enter se acciona el botón
addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnEnviar").click();
    }
});



