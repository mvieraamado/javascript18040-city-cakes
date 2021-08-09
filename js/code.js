let carrito = []; //Array
let total = 0;

const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#botonVaciar');

//Reproduce todos los productos a partir del array PRODUCTOS.
function reproducirProductos() {
    PRODUCTOS.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4', 'miCard');
        // Body
        const nodoCardBody = document.createElement('div');
        nodoCardBody.classList.add('card-body');
        // Título
        const nodoTitulo = document.createElement('h5');
        nodoTitulo.classList.add('card-title');
        nodoTitulo.textContent = info.producto;
        // Imagen
        const nodoImagen = document.createElement('img');
        nodoImagen.classList.add('img-fluid');
        nodoImagen.setAttribute('src', info.imagen);
        // Precio
        const nodoPrecio = document.createElement('p');
        nodoPrecio.classList.add('card-text');
        nodoPrecio.textContent = '$' + info.precio;
        // Botón 
        const nodoBoton = document.createElement('button');
        nodoBoton.classList.add('btnBoton', 'btn');
        nodoBoton.textContent = 'Agregar';
        nodoBoton.setAttribute('marcador', info.id);
        nodoBoton.addEventListener('click',agregarProductoAlCarrito)
        // Insertamos
        nodoCardBody.appendChild(nodoImagen);
        nodoCardBody.appendChild(nodoTitulo);
        nodoCardBody.appendChild(nodoPrecio);
        nodoCardBody.appendChild(nodoBoton);
        miNodo.appendChild(nodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

//--------------------CARRITO-----------------//
// Agrega un producto al carrito de la compra
function agregarProductoAlCarrito(evento) {
    // Agregamos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'));
    // Calculo el total
    calcularTotal();
    // Actualizamos el carrito 
    proyectarCarrito();
    guardarCarritoEnLocalStorage();
}

//Muestra todos los productos guardados en el carrito
function proyectarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent= '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el ítem que necesitamos del array PRODUCTOS
        const miItem = PRODUCTOS.filter((datosProductos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return datosProductos.id === parseInt(item);
        });
        //Aqui se cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del ítem del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-left', 'ml-1', 'p-2');
        miNodo.textContent = `${numeroUnidadesItem}  ${miItem[0].producto} $${miItem[0].precio}`;
        // Botón borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'botonDelete', 'mr-1');
        miBoton.textContent = 'x';
        miBoton.style.marginLeft = '25px';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

// Elimina un elemento del carrito
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el botón pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    })
    // volvemos a reproducir
    proyectarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
    guardarCarritoEnLocalStorage();
}
//Calcula el precio total teniendo en cuenta los productos repetidos
function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // De cada elemento obtenemos su precio
        const miItem = PRODUCTOS.filter((datosProductos) => {
            return datosProductos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    // Reproducimos el precio en el HTML
    DOMtotal.textContent = total.toFixed(2);
}

//Vacía el carrito y vuelve a mostrarlo
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Reproducimos los cambios
    proyectarCarrito();
    calcularTotal();
    localStorage.clear();
}

// Guarda los productos en el localStorage
function guardarCarritoEnLocalStorage(){
    localStorage.setItem('Productos agregados al carrito', JSON.stringify(carrito))
}

// Carga al localStorage
function cargarCarritoDeLocalStorage(){
    if (localStorage.getItem('Productos agregados al carrito') != null){
        // Carga la información
        carrito = JSON.parse(localStorage.getItem('Productos agregados al carrito'))
    };
};

cargarCarritoDeLocalStorage();

// Inicio
reproducirProductos();




