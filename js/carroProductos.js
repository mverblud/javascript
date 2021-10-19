const canastaLocalStorage = [];
/* Con esta función puedo eliminar productos de la canasta */
const eliminarProducto = (producto) => {
    
    $(`#productoCanasta-${producto.id}`).remove();
    const index = canastaLocalStorage.findIndex(productoLocal => parseInt(producto.id) === parseInt(productoLocal.id));    
    canastaLocalStorage.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
    sumarCanasta();
}

const insertarProductosACanasta = (producto) => {

    $('#listadoCarrito').append(`
    <li class="list-group-item d-flex justify-content-between lh-sm" id="productoCanasta-${producto.id}">
        <div>
            <h6 class="my-0">${producto.nombre}</h6>
            <small class="text-muted">${producto.codigo}</small>
        </div>
        <span class="text-muted">$${producto.precio}</span>
    </li>`)

    /* Inserto un elemento botón al elemento recientemente creado que contenga la función para poder eliminar el prodcuto de la canasta */
    $(`#productoCanasta-${producto.id}`).append(`
        <button class="btn btn-warning mt-auto" id="btn-${producto.id}">Eliminar</button>
    `);

    $(`#btn-${producto.id}`).on("click", function () {
        eliminarProducto(producto);
    });

    canastaLocalStorage.push(producto);
    localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
    actualizarCarritoIcon();
    sumarCarrito();
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

const sumarCarrito = () => {
    let totalCanasta = 0;
    for (const producto of canastaLocalStorage) {
        console.log(producto.precio.replaceAll(",", ""));
        totalCanasta = totalCanasta + convertirPrecioANumero(producto.precio);
    }
    console.log(totalCanasta);
    
    $("#totalPagar").html(`$${numeroAComas(totalCanasta)}`);
    localStorage.setItem("totalAPagar", totalCanasta);
}

/* Con esta función puedo agregar productos del contenedor a la canasta */
const convertirPrecioANumero = (precio) => parseInt(precio.replaceAll(",", ""));

const numeroAComas = (total) => {
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}