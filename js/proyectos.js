function arrayJSON(nombre,tema,descripcion,escuela,equipo){
    var data = {
        nombre : nombre,
        tema : tema,
        descripcion: descripcion,
        escuela: escuela,
        equipo: equipo
    };
    return data;
}

function createTableProyectos(id,nombre,tema,escuela,equipo){
    return '<tr>'+
    '<td id="tablaID">'+id+'</td>'+
    '<td>'+nombre+'</td>'+
    '<td>'+tema+'</td>'+
    '<td>'+escuela+'</td>'+
    '<td>'+equipo+'</td>'+
    '</tr>';
}

function setProyectos(){
    var id = $('#idProy').val();
    var nombre = $("#nombreProy").val();
    var tema = $("#temaProy").val();
    var descripcion = ($("#descripcion").val());
    var escuela = $("#escuela").val();
    var equipo = $("#equipo").val();

    if(id.length==0||nombre.length==0||tema.length==0|| 
        escuela.length==0||equipo.length==0){
        alert("EMPTY FIELDS");
    }else{
        var arrayData = arrayJSON(nombre,tema,descripcion,escuela,equipo);
        if (confirm('Los datos son correctos?')){
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
        var tabla = createTableProyectos(idAdd,nombreAdd,temaAdd,escuelaAdd,equipoAdd);
        innerHTML('tablaProyectos',tabla);
    });
}