function arrayJSON(nombre,apellido,email,tw,fb,yt,bio,img,url){
    var data = {
        nombre : nombre,
        apellido : apellido,
        email: email,
        twitter: tw,
        facebook: fb,
        youtube: yt,
        bio: bio,
        img:img,
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
    '<td><a href="'+url+'" target="blank">'+url+'<a/></td>'+
    '</tr>';
}

function setDatosPersonales(baseDatos){
    var id = $('#idDatosPers').val();
    var nombre = $("#nombreDatosPers").val();
    var apellido = $("#apellidoDatosPers").val();
    var email = $("#email").val().toLowerCase();
    var twitter = $("#twitter").val().toLowerCase();
    var fb = $("#facebook").val().toLowerCase();
    var yt = $("#youtube").val().toLowerCase();
    var bio = ($("#bio").val());
    var imagen = document.getElementById('imagen').files[0];
    var imgVerified = emptyImg(imagen);

    if(id.length==0||nombre.length==0||apellido.length==0|| 
        bio.length==0){
        alert("EMPTY FIELDS");
    }else{
        if(validateEmail(email)){
            if (confirm('Los datos son correctos?')){
                var storageRef = storage.ref('Imagenes/'+baseDatos+'/'+imgVerified);
                if(imgVerified!='unnamed.jpg'){
                    let uploadTask = storageRef.put(imagen);
                    uploadTask.on('state_changed',function(snapshot){
                        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                        console.log('Upload is '+parseInt(progress)+'% done');
                    },function(error){
                        console.log(error.message);
                    },function(){
                        storageRef.getDownloadURL().then(function(url){
                            var arrayData = arrayJSON(nombre,apellido,email,twitter,fb,yt,bio,imgVerified,url);
                            const insertar = firebase.database().ref(baseDatos+'/'+id);
                            insertar.update(arrayData); 
                        });
                    })
                }else{
                    storageRef = storage.ref('Imagenes/'+imgVerified);
                    storageRef.getDownloadURL().then(function(url){
                        var arrayData = arrayJSON(nombre,apellido,email,twitter,fb,yt,bio,imgVerified,url);
                        const insertar = firebase.database().ref(baseDatos+'/'+id);
                        insertar.update(arrayData); 
                    });
                }
                alert("Se Añadieron Correctamente");
                $('#formulario').trigger("reset");
            }
        }
    }
}

function getDatosPersonales(nombreBD){
    var task = firebase.database().ref(nombreBD.toLowerCase()+'/');
    task.on("child_added",function(snapshot){
        var taskValue = snapshot.val();
        
        let idAdd = snapshot.key;
        let nombreAdd = taskValue.nombre;
        let apellidoAdd = taskValue.apellido;
        let emailAdd = taskValue.email;
        let twitterAdd = taskValue.twitter;
        let fbAdd = taskValue.facebook;
        let ytAdd = taskValue.youtube;
        let imgAdd = taskValue.img;
        /*var bioAdd = taskValue.bio;
        let urlAdd = taskValue.url;*/
        var storageRef;
        if(imgAdd!='unnamed.jpg'){
            storageRef = storage.ref('Imagenes/'+nombreBD.toLowerCase()+'/'+imgAdd);
        }else{
            storageRef = storage.ref('Imagenes/'+imgAdd);
        }
        storageRef.getDownloadURL().then(function(url){
            var tabla = createTableDatos(idAdd,nombreAdd,apellidoAdd,emailAdd,twitterAdd,fbAdd,ytAdd,url);
            innerHTML('tabla'+nombreBD+'',tabla);
        });
    })
}