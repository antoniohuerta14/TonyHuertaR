function arrayJSON(nombre,desc,fecha,hora){
    var data = {
        nombre : nombre,
        descripcion : desc,
        fecha: fecha,
        hora: hora,
    };
    return data;
}

function createTableConferencias(id,nombre,desc,fecha,hora){
    return '<tr>'+
    '<td id="tablaID">'+id+'</td>'+
    '<td>'+nombre+'</td>'+
    '<td>'+desc+'</td>'+
    '<td>'+fecha+'</td>'+
    '<td>'+hora+'</td>'+
    '</tr>';
}

function setConferencias(){
    let id = $('#idConf').val();
    let nombre = $("#nombreConf").val();
    let desc = $("#descripcion").val();
    let fecha = $("#fecha").val();
    let hr = $("#hora").val();
    let mns = $("#minutos").val();
    let ampm = $("#ampm").val();
    let hora = hr+':'+mns+' '+ampm

    if(id.length==0||nombre.length==0||fecha.length==0|| 
        hora.length<=1){
        alert("EMPTY FIELDS");
    }else{
        var arrayData = arrayJSON(nombre,desc,fecha,hora);
        const insertar = firebase.database().ref('conferencias/'+id);
        insertar.update(arrayData);

        if (confirm('Los datos son correctos?')){
            alert("Se Añadieron Correctamente");
            $('#formulario').trigger("reset");
        }
    }
}

function getConferencias(){
    var task = firebase.database().ref("conferencias/");
    task.on("child_added",function(data){
        var taskValue = data.val();
        
        let id = data.key;
        let nombre = taskValue.nombre;
        let desc = taskValue.descripcion;
        let fecha = taskValue.fecha;
        let hora = taskValue.hora;
        var tabla = createTableConferencias(id,nombre,desc,fecha,hora);
        innerHTML('tablaConferencias',tabla);
    })
}