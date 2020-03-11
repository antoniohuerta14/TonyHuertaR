function arrayJSON(nombre,tema,descripcion,escuela,equipo,img){
    var data = {
        nombre : nombre,
        tema : tema,
        descripcion: descripcion,
        escuela: escuela,
        equipo: equipo,
        img: img
    };
    return data;
}

function createTableProyectos(id,nombre,tema,escuela,equipo,url){
    return '<tr>'+
    '<td id="tablaID">'+id+'</td>'+
    '<td>'+nombre+'</td>'+
    '<td>'+tema+'</td>'+
    '<td>'+escuela+'</td>'+
    '<td>'+equipo+'</td>'+
    '<td><a href="'+url+'">'+url+'<a/></td>'+
    '</tr>';
}

function setProyectos(){
    var id = $('#idProy').val();
    var nombre = $("#nombreProy").val();
    var tema = $("#temaProy").val();
    var descripcion = ($("#descripcion").val());
    var escuela = $("#escuela").val();
    var equipo = $("#equipo").val();
    var imagen = document.getElementById('imagen').files[0];
    var imgVerified = emptyImg(imagen);

    if(id.length==0||nombre.length==0||tema.length==0|| 
        escuela.length==0||equipo.length==0){
        alert("EMPTY FIELDS");
    }else{
        var arrayData = arrayJSON(nombre,tema,descripcion,escuela,equipo,imgVerified);
        if (confirm('Los datos son correctos?')){
            addImg(imagen,imgVerified,'proyectos');
            const insertar = firebase.database().ref('proyectos/'+id);
            insertar.update(arrayData);
            alert("Se Añadieron Correctamente");
            $('#formulario').trigger("reset");
        }
    }
}

function getProyectos(){
    var task = firebase.database().ref('proyectos/');
    task.on("child_added",function(snapshot){
        var taskValue = snapshot.val();
        
        var idAdd = snapshot.key;
        var nombreAdd = taskValue.nombre;
        var temaAdd = taskValue.tema;
        var escuelaAdd = taskValue.escuela;
        var equipoAdd = taskValue.equipo;
        /*var bioAdd = taskValue.bio;*/
        var imgAdd = taskValue.img;
        var storageRef;
        if(imgAdd!='unnamed.jpg'){
            storageRef = storage.ref('Imagenes/'+'proyectos/'+imgAdd);
        }else{
            storageRef = storage.ref('Imagenes/'+imgAdd);
        }
        
        storageRef.getDownloadURL().then(function(url){
            var tabla = createTableProyectos(idAdd,nombreAdd,temaAdd,escuelaAdd,equipoAdd,url);
            innerHTML('tablaProyectos',tabla);
        });
    })
}