// Recupero carrito en localstorage
const productoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
const totalAPagar = JSON.parse(localStorage.getItem("totalAPagar"));

$("#total").html(`$${totalAPagar}`);

const insertarCarrito = () => {

    for (const producto of productoLocalStorage) {
        $('#listadoCarrito').append(`
        <li class="list-group-item d-flex justify-content-between lh-sm" id="productoCanasta-${producto.id}">
            <div>
                <h6 class="my-0">${producto.nombre}</h6>
                <b> Cantidad: <span id="producto-cantidad-${producto.id}">${producto.cantidad}</span></b>
            </div>
            <span class="text-muted">$${producto.precio}</span>
        </li>
        `)
    }
}

insertarCarrito();