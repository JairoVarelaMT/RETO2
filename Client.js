$(document).ready(function(){
    listarClient();
    $("#btnClient").click(function(){
        $("#computers").hide();
        $("#client").show();
        $("#btnGuardarClient").hide();
        
    })
})
function agregarClient(){
    var data={
        id:$("#idClient").val(),
        name:$("#nameClient").val(),
        email:$("#emailClient").val(),
        age:$("#ageClient").val()
    }
    let datosPeticion=JSON.stringify(data);
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        data:datosPeticion,
        type:'POST',
        contentType:"application/JSON",
        success:function(respuesta){
            console.log("Insertado");
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
    var dataMessage={
        id:$("#idClient").val(),
        messagetext:$("#messageClient").val()
    }
    let peticion = JSON.stringify(dataMessage);
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        data:peticion,
        type:'POST',
        contentType:"application/JSON",
        success:function(respuesta){
            console.log("Insertado");
            listarClient();
            limpiarCamposClient();
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarClient(){
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:'GET',
        dataType:'json',

        success:function(respuesta){
            console.log(respuesta);
            limpiarCamposClient();
            listarRespuestaClient(respuesta.items);
        },

        error:function(xhr,status){
            console.log(status);
        }
    });
   
}
function listarRespuestaClient(items){
    //tabla MESSAGE
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:'GET',
        dataType:'json',
        success:function(getMessage){
           console.log(getMessage)
            var tabla=`<table border="1" class="table table-light table-hover">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Message</th>
              <th colspan="2">Acciones</th>
            </tr>`;
        for (var i=0; i<items.length;i++) {
        tabla+=`<tr>
                  <td>${items[i].id}</td>
                  <td>${items[i].name}</td>
                  <td>${items[i].email}</td>
                  <td>${items[i].age}</td>
                  <td>${getMessage.items[i].messagetext}</td>
                              
                  <td><button onclick="editarRegistroClient(${items[i].id})" class="btn btn-info btn-sm">Editar</td>
                  <td><button onclick="borrarClient(${items[i].id})"class="btn btn-danger btn-sm">Borrar</td>       
              </tr>
        `;
        }
        tabla+=`</table>`;
        $("#listadoClient").html(tabla);
        },

        error:function(xhr,status){
            console.log(status);
        }
    });

}
function borrarClient(numId) {
    var data={
        id:numId
    }
    let datosPeticion=JSON.stringify(data);
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        data:datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
    //tabla MESSAGE
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        data:datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            limpiarCamposClient();
            listarClient();
        },
        error:function(xhr,status){
            console.log(status);
        }
    });    
}
function editarRegistroClient(numId) {
    $("#btnGuardarClient").show();
    $("#btnAgregarClient").hide();
    $("#idClient").prop('disabled',true);
    $("#nameClient").focus();
    var datos={
        id:numId
    }
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/"+numId,
        type:'GET',
        dataType:'json',
        success:function(respuesta){
            var items=respuesta.items;
            console.log(items);
            $("#idClient").val(items[0].id),
            $("#nameClient").val(items[0].name),
            $("#emailClient").val(items[0].email),
            $("#ageClient").val(items[0].age) 
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
    //TABLA MESSAGE
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/"+numId,
        type:'GET',
        dataType:'json',
        success:function(respuesta){
            var items=respuesta.items;
            console.log(items);
            $("#messageClient").val(items[0].messagetext);
         
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function actualizarClient(){
    var data={
        id:$("#idClient").val(),
        name:$("#nameClient").val(),
        email:$("#emailClient").val(),
        age:$("#ageClient").val()
    }
    let datosPeticion=JSON.stringify(data);

    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/JSON",

        success:function(respuesta){
        },

        error:function(xhr,status){
            console.log(status);
            alert(status);
        }
    });
    var dataMessage={
        id:$("#idClient").val(),
        messagetext:$("#messageClient").val()
    }
    datosPeticion=JSON.stringify(dataMessage);
    //TABLA MESSAGE
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Actualizado");
            limpiarCamposClient();
            listarClient();
            $("#btnGuardarClient").hide();
            $("#btnAgregarClient").show();      
            $("#idClient").prop('disabled',false);
        },

        error:function(xhr,status){
            console.log(status);
            alert(status);
        }
    });
}

