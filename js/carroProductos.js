const canastaLocalStorage = [];
/* Con esta función puedo eliminar productos de la canasta */
const eliminarProducto = (producto) => {

    $(`#productoCanasta-${producto.id}`).remove();
    const index = canastaLocalStorage.findIndex(productoLocal => parseInt(producto.id) === parseInt(productoLocal.id));
    canastaLocalStorage.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
    actualizarCarritoIcon();
    sumarCarrito();
}

const convertirPrecioANumero = (precio) => parseInt(precio.replaceAll(",", ""));

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numeroAComas = (total) => {
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const sumarCarrito = () => {
    let totalCanasta = 0;
    for (const producto of canastaLocalStorage) {
        totalCanasta = totalCanasta + (producto.precio * producto.cantidad);
    }

    $("#totalPagar").html(`$${numeroAComas(totalCanasta)}`);
    localStorage.setItem("totalAPagar", totalCanasta);
}

const actualizarCarritoIcon = () => {

    let totalCarrito = 0;
    for (const producto of canastaLocalStorage) {
        totalCarrito = totalCarrito + 1;
    }

    $("#iconCarrito").html(`${totalCarrito}`);
    $("#badgeCarrito").html(`${totalCarrito}`);

    localStorage.setItem("totalCarrito", totalCarrito);
}

/* Con esta función puedo agregar productos del contenedor a la canasta */
const insertarProductosACanasta = (producto) => {
    if ($(`#productoCanasta-${producto.id}`).length === 0) {
        $('#listadoCarrito').append(`
            <li class="list-group-item d-flex justify-content-between lh-sm" id="productoCanasta-${producto.id}">
                <div>
                    <h6 class="my-0">${producto.nombre}</h6>
                    <b> Cantidad: <span id="producto-cantidad-${producto.id}">${producto.cantidad}</span></b>
                </div>
                <span class="text-muted">$${producto.precio}</span>
            </li>
        `)

        /* Inserto un elemento botón al elemento recientemente creado que contenga la función para poder eliminar el prodcuto de la canasta */
        $(`#productoCanasta-${producto.id}`).append(`
            <button class="btn btn-warning mt-auto" id="btn-${producto.id}">Eliminar</button>
        `);

        $(`#btn-${producto.id}`).on("click", function () {
            eliminarProducto(producto);
        });

        canastaLocalStorage.push(producto);

    } else {
        const nuevaCantidad = parseInt($(`#producto-cantidad-${producto.id}`).html()) + 1;
        const i = canastaLocalStorage.findIndex(p => parseInt(p.id) === parseInt(producto.id))
        canastaLocalStorage[i] = { ...canastaLocalStorage[i], cantidad: nuevaCantidad };
        $(`#producto-cantidad-${producto.id}`).html(nuevaCantidad)
    }
    localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
    actualizarCarritoIcon();
    sumarCarrito();
}