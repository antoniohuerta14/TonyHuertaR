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

function createTable(id,nombre,apellido,email,tw,fb,yt,url){
    return '<tr>'+
    '<td id="tablaID">'+id+'</td>'+
    '<td>'+nombre+'</td>'+
    '<td>'+apellido+'</td>'+
    '<td>'+email+'</td>'+
    '<td>'+tw+'</td>'+
    '<td>'+fb+'</td>'+
    '<td>'+yt+'</td>'+
    '<td> <a href="'+url+'">'+url+'<a/></td>'+
    '</tr>';
}

function setMentores(){
    var id = $('#idMentor').val();
    var nombre = $("#nombreMentor").val();
    var apellido = $("#apellidoMentor").val();
    var email = $("#email").val();
    var twitter = ($("#twitter").val());
    var fb = ($("#facebook").val());
    var yt = ($("#youtube").val());
    var bio = ($("#bio").val());
    var url = $("#url").val();

    var urlVerified = emptyUrl(url);

    if(id.length==0||nombre.length==0||apellido.length==0|| 
        bio.length==0){
        alert("EMPTY FIELDS");
    }else{
        if(validateEmail(email)){
            var arrayData = arrayJSON(nombre,apellido,email,twitter,fb,yt,bio,urlVerified);
            const insertar = firebase.database().ref('mentores/'+id);
            insertar.update(arrayData);

            if (confirm('Los datos son correctos?')){
                alert("Se Añadieron Correctamente");
                $('#formulario').trigger("reset");
            }
        }
    }
}

function getMentores(){
    var task = firebase.database().ref("mentores/");
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

        console.log((idAdd,nombreAdd,apellidoAdd,emailAdd,twitterAdd,fbAdd,ytAdd,urlAdd));

        var tabla = createTable(idAdd,nombreAdd,apellidoAdd,emailAdd,twitterAdd,fbAdd,ytAdd,urlAdd);
        innerHTML('tablaMentores',tabla);
    })
}