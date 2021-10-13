$(document).ready(function(){
    $("#computers").hide();
    $("#btnComputers").click(function(){
        $("#computers").show();
        $("#client").hide();
        
    })
    $("#btnGuardarComputer").hide();
    limpiarCamposComputer();
    listarComputer();
})
function agregarComputer(){
    var data={
        id:$("#id").val(),
        name:$("#name").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val()
    }

    let datosPeticion=JSON.stringify(data);

    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/computer/computer",
        data:datosPeticion,
        type:'POST',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Insertado");
            listarComputer();
            limpiarCamposComputer();
        },

        error:function(xhr,status){
            console.log(status);
        }
    });

}
function listarComputer(){
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/computer/computer",
        type:'GET',
        dataType:'json',

        success:function(respuesta){
            console.log(respuesta);
            limpiarCamposComputer();
            listarRespuestaComputer(respuesta.items);
        },

        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaComputer(items){
    var tabla=`<table border="1" class="table table-dark table-hover">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Category_id</th>
                <th colspan="2">Acciones</th>
              </tr>`;
    for (var i=0; i<items.length;i++) {
        tabla+=`<tr>
                    <td>${items[i].id}</td>
                    <td>${items[i].brand}</td>
                    <td>${items[i].model}</td>
                    <td>${items[i].name}</td>
                    <td>${items[i].category_id}</td> 
                    <td><button onclick="editarRegistroComputer(${items[i].id})" class="btn btn-info btn-sm">Editar</td>
                    <td><button onclick="borrarComputer(${items[i].id})"class="btn btn-danger btn-sm">Borrar</td>       
                </tr>
        `;
    }
    tabla+=`</table>`;
    $("#listadoComputer").html(tabla);
}
function borrarComputer(numId) {
    var data={
        id:numId
    }

    let datosPeticion=JSON.stringify(data);

    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/computer/computer",
        data:datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            limpiarCamposComputer();
            listarComputer();
        },

        error:function(xhr,status){
            console.log(status);
        }
    });
    
}
function editarRegistroComputer(numId) {
    $("#btnGuardarComputer").show();
    $("#btnAgregarComputer").hide();
    $("#id").prop('disabled',true);
    $("#brand").focus();
    var datos={
        id:numId
    }
    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/computer/computer/"+numId,
        type:'GET',
        dataType:'json',
        success:function(respuesta){
            var items=respuesta.items;
            console.log(items);
            $("#id").val(items[0].id),
            $("#brand").val(items[0].brand),
            $("#model").val(items[0].model),
            $("#category_id").val(items[0].category_id),
            $("#name").val(items[0].name)
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
 
}

function actualizarComputer(){
    var data={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    }

    let datosPeticion=JSON.stringify(data);

    $.ajax({
        url:"https://g95d7ee77550996-computers.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/computer/computer",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Actualizado");
            limpiarCamposComputer();
            listarComputer();
            $("#btnGuardarComputer").hide();
            $("#btnAgregarComputer").show();        
            $("#id").prop('disabled',false);
        },

        error:function(xhr,status){
            console.log(status);
            alert(status);
        }
    });
}

