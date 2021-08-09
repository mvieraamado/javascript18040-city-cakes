// Variables (almacenan información obtenida del formulario)
let nombre = "";
let apellido = "";
let direccion = "";
let provincia = "";
let telefono ="";
let email ="";

const formulario = document.querySelector("#formulario");
let formularioDatosUsuario = $("#datosUsuario");
let resumenCompra = $("#resumenCompra");

// Formulario (Solicitar datos al usuario)
formulario.addEventListener("submit", function(e){
  e.preventDefault()
  formulario.classList.add("was-validated");
  nombre= document.getElementById("nombre").value;
  apellido= document.getElementById("apellido").value;
  direccion= document.getElementById("direccion").value;
  provincia= document.getElementById("provincia").value;
  telefono= document.getElementById("telefono").value;
  email= document.getElementById("email").value;
  if(formulario.checkValidity()==false){
    return false
  } else{
    resumen ();
    mostrarResumen ();
  };
});

// Quita el formulario y muestra el resumen
function mostrarResumen (){
  formularioDatosUsuario.fadeOut (1000, function (){
    resumenCompra.slideDown(2000);
  });
};

// Regresa al formulario
function volverFormulario (){
  resumenCompra.fadeOut (1000, function (){
  formularioDatosUsuario.slideDown(2000);
  });
};

//Muestra un resumen de la compra a realizar
function resumen(){
  const resumen = `
    <div class="container contenedorResumen">
      <h4>Verifique sus datos</h4>
      <hr>
      <p>Nombre: ${nombre}</p>
      <p>Apellido: ${apellido}</p>
      <p>Dirección: ${direccion}</p>
      <p>Provincia: ${provincia}</p>
      <p>Teléfono: ${telefono}</p>
      <p>Total de la compra: $${total} </p>
      <div class="row">
        <div class="col-12 d-flex justify-content-around">
          <button type="button" class="btn buttonColor" onclick="volverFormulario()"> Volver </button>
          <button type="button" id="buttonConfirmar" class="btn buttonColor" data-toggle="modal" data-target="#myModal">Confirmar compra</button>
        </div>
      </div>
    </div>`;
  resumenCompra.html(resumen);
};

$(document).ready(function() {
  // Vuelve al carrito
  function volverCarrito (){
      formularioDatosUsuario.fadeOut (1000, function (){
      $('#nuestrosProductos').slideDown(2000);
      });
  };
  
  // Click (Regresa al carrito)
  $('#buttonVolver1').click( ()=>{volverCarrito()});
 
  // Click (vacía el carrito)
  $("#botonVaciar").on('click',vaciarCarrito);

  // Click para iniciar la compra
  $('#iniciarCompra').click( ()=>{
      if(carrito.length==0){
      $('.cityCarrito').append(`
      <div class="alert alert-secondary alert-dismissible fade show mt-4" role="alert">
        Su carrito esta vacio!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`);
      $('.alert-secondary').fadeOut(8000);
      }else{
        $('#nuestrosProductos').fadeOut(1000);
        formularioDatosUsuario.slideDown(2000);
      }
  });
  $('.alert-secondary').fadeOut(1000);
  //Función compra realizada
  //Muestra un modal (indicando que se ha realizado la compra)
  function compraRealizada(){
  $('body').append(`
    <!-- Modal -->
    <div id="myModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">City Cakes</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h4 class="mb-4">¡SU COMPRA SE HA REALIZADO CON ÉXITO!</h4>
          <p>A la brevedad nos comunicaremos para coordinar el envio. ¡Muchas gracias por confiar en nosotros! 
        </div>
        <div class="modal-footer">
          <button type="button" class="btn buttonColor" data-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>`
  );
  vaciarCarrito();
  };

  // Click (muestra modal)
  $('#buttonConfirmar').click(
    compraRealizada();
  );
});