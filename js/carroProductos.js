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

// TOGGLE BOTÓN CANASTA
$(".boton-canasta").on("click", function () {
    $("#contenedor-general-canasta").toggleClass("on");
});

/* Con esta función puedo agregar productos del contenedor a la canasta */
const insertarProductosACanasta = (producto) => {
    if ($(`#productoCanasta-${producto.id}`).length === 0) {
        if (!$("#contenedor-general-canasta").hasClass("on")) {
            $(".boton-canasta").trigger("click");
        }
        $('#listadoCarrito').append(`
            <li class="list-group-item d-flex justify-content-between lh-sm" id="productoCanasta-${producto.id}">
                <div class="row mx-1">
                    <div class="col-8">
                        <h6 class="my-0">${producto.nombre}</h6>
                    </div>
                    <div class="col-2">
                        <b>Cant:<span id="producto-cantidad-${producto.id}">${producto.cantidad}</span></b>
                    </div>
                    <div class="col-2">
                        <span class="text-muted">$${producto.precio}</span>
                    </div>
                </div>
            </li>
        `)

        /* Inserto un elemento botón al elemento recientemente creado que contenga la función para poder eliminar el prodcuto de la canasta */
        $(`#productoCanasta-${producto.id}`).append(`
            <button id="btn-${producto.id}" type="button" class="btn btn-outline-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                </svg>
            </button>
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