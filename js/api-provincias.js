//Llamada (API de provincias)

$(document).ready(function(){
    $.get("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre", function(data){
        $.each(data.provincias, function(indice){
            let option = $("<option>" + data.provincias[indice].nombre + "</option>");
            $("#provincia").append(option);
        });
    });
});