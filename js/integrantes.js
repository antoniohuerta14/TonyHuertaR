function arrayJSON(nombre,apellido,edad,genero,carrera,semestre,email,img,url){
    var data = {
        nombre : nombre,
        apellido : apellido,
        edad: edad,
        genero: genero,
        carrera: carrera,
        semestre: semestre,
        email: email,
        img:img,
        url:url
    };
    return data;
}

function createTableIntegrantes(id,nombre,apellido,edad,genero,carrera,semestre,email,url){
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

function setIntegrantes(){
    var id = $('#idEstudiante').val();
    var nombre = $("#nombreEstudiante").val();
    var apellido = $("#apellidoEstudiante").val();
    var edad = parseInt($("#edadEstudiante").val());
    var genero = $('input[name=genero]:checked').val();
    var carrera = $("#carrera" ).val();
    var semestre = parseInt($( "#sem" ).val());
    var email = $("#email").val().toLowerCase();
    var imagen = document.getElementById('imagen').files[0];
    var imgVerified = emptyImg(imagen);

    if(id.length==0||nombre.length==0||apellido.length==0|| 
        edad.length==0){
        alert("EMPTY FIELDS");
    }else{
        if(validateEmail(email)){
            if (confirm('Los datos son correctos?')){
                var storageRef = storage.ref('Imagenes/'+'participantes'+'/'+imgVerified);
                if(imgVerified!='unnamed.jpg'){
                    let uploadTask = storageRef.put(imagen);
                    uploadTask.on('state_changed',function(snapshot){
                        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                        console.log('Upload is '+parseInt(progress)+'% done');
                    },function(error){
                        console.log(error.message);
                    },function(){
                        storageRef.getDownloadURL().then(function(url){
                            var arrayData = arrayJSON(nombre,apellido,edad,genero,carrera,semestre,email,imgVerified,url);
                            const insertar = firebase.database().ref('participantes'+'/'+id);
                            insertar.update(arrayData); 
                        });
                    })
                }else{
                    storageRef = storage.ref('Imagenes/'+imgVerified);
                    storageRef.getDownloadURL().then(function(url){
                        var arrayData = arrayJSON(nombre,apellido,edad,genero,carrera,semestre,email,imgVerified,url);
                        const insertar = firebase.database().ref('participantes'+'/'+id);
                        insertar.update(arrayData); 
                    });
                }
                alert("Se Añadieron Correctamente");
                $('#formulario').trigger("reset");
            }
        }
    }
}

function getIntegrantes(){
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
        var imgAdd = taskValue.img;

        var storageRef;
        if(imgAdd!='unnamed.jpg'){
            storageRef = storage.ref('Imagenes/participantes/'+imgAdd);
        }else{
            storageRef = storage.ref('Imagenes/'+imgAdd);
        }
        storageRef.getDownloadURL().then(function(url){
            var tabla = createTableIntegrantes(idAdd,nombreAdd,apellidoAdd,edadAdd,generoAdd,carreraAdd,semAdd,mailAdd,url);
            innerHTML('tablaIntegrantes',tabla);
        });
    })
}