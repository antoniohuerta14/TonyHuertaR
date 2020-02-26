function arrayJSON(nombre,apellido,email,tw,fb,yt,bio,url){
    var data = {
        nombre : nombre,
        apellido : apellido,
        email: email,
        twitter: tw,
        facebook: fb,
        youtube: yt,
        bio: bio,
        url:url
    };
    return data;
}

function createTableDatos(id,nombre,apellido,email,tw,fb,yt,url){
    return '<tr>'+
    '<td id="tablaID">'+id+'</td>'+
    '<td>'+nombre+'</td>'+
    '<td>'+apellido+'</td>'+
    '<td><a href="mailto:'+email+'">'+email+'<a/></td>'+
    '<td><a href="https://twitter.com/'+tw+'">@'+tw+'<a/></td>'+
    '<td><a href="https://facebook.com/'+fb+'">fb.com/'+fb+'<a/></td>'+
    '<td><a href="https://youtube.com/'+yt+'">yt.com/'+yt+'<a/></td>'+
    '<td><a href="'+url+'">'+url+'<a/></td>'+
    '</tr>';
}

function setDatosPersonales(baseDatos){
    var id = $('#idMentor').val();
    var nombre = $("#nombreMentor").val();
    var apellido = $("#apellidoMentor").val();
    var email = $("#email").val().toLowerCase();
    var twitter = $("#twitter").val().toLowerCase();
    var fb = $("#facebook").val().toLowerCase();
    var yt = $("#youtube").val().toLowerCase();
    var bio = ($("#bio").val());
    var url = $("#url").val();

    var urlVerified = emptyUrl(url);

    if(id.length==0||nombre.length==0||apellido.length==0|| 
        bio.length==0){
        alert("EMPTY FIELDS");
    }else{
        if(validateEmail(email)){
            var arrayData = arrayJSON(nombre,apellido,email,twitter,fb,yt,bio,urlVerified);
            const insertar = firebase.database().ref(baseDatos+'/'+id);
            insertar.update(arrayData);

            if (confirm('Los datos son correctos?')){
                alert("Se Añadieron Correctamente");
                $('#formulario').trigger("reset");
            }
        }
    }
}

function getDatosPersonales(nombreBD){
    var task = firebase.database().ref(nombreBD.toLowerCase()+'/');
    task.on("child_added",function(data){
        var taskValue = data.val();
        
        var idAdd = data.key;
        var nombreAdd = taskValue.nombre;
        var apellidoAdd = taskValue.apellido;
        var emailAdd = taskValue.email;
        var twitterAdd = taskValue.twitter;
        var fbAdd = taskValue.facebook;
        var ytAdd = taskValue.youtube;
        /*var bioAdd = taskValue.bio;*/
        var urlAdd = taskValue.url;

        var tabla = createTableDatos(idAdd,nombreAdd,apellidoAdd,emailAdd,twitterAdd,fbAdd,ytAdd,urlAdd);
        innerHTML('tabla'+nombreBD+'',tabla);
    })
}