const canastaLocalStorage = [];
const contenedorCarrito = document.getElementById("listadoCarrito");
const iconoCarrito = document.getElementById("iconCarrito");
const badgeCarrito = document.getElementById("badgeCarrito");
const total = document.getElementById("totalPagar");


/* Con esta función puedo eliminar productos de la canasta */
const eliminarProducto = (producto) => {
    
    for (const productoCanasta of contenedorCarrito.children) {
        
        if (parseInt(productoCanasta.id) === parseInt(producto.id)) {
            
            productoCanasta.parentElement.removeChild(productoCanasta);
            // El método indexOf me permite obtener el índice de algún item de un Array
            const index = canastaLocalStorage.indexOf(producto);

            /* El método splice permite eliminar un elemento de un Array, paso el indice y cuantos elementos quiero eliminar*/
            canastaLocalStorage.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
            actualizarCarritoIcon();
            sumarCarrito();
        }
    }
}

const insertarProductosACanasta = (producto) => {

    let contenedor = document.createElement("li");
    contenedor.className = "list-group-item d-flex justify-content-between lh-sm";
    contenedor.id = producto.id;
    contenedor.onclick = () => { console.log("Click de producto") };
    contenedor.innerHTML = `
    <div>
        <h6 class="my-0">${producto.nombre}</h6>
        <small class="text-muted">${producto.codigo}</small>
    </div>
    <span class="text-muted">$${producto.precio}</span>`

    /* Inserto un elemento botón al elemento recientemente creado que contenga la función para poder eliminar el prodcuto de la canasta */

    let boton = document.createElement("button");
    boton.className = "btn btn-warning mt-auto";
    boton.innerHTML = "Eliminar";
    boton.onclick = () => eliminarProducto(producto);
    contenedor.appendChild(boton);

    contenedorCarrito.appendChild(contenedor);

    canastaLocalStorage.push(producto);
    console.log(canastaLocalStorage);
    localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
    actualizarCarritoIcon();
    sumarCarrito();
}

const actualizarCarritoIcon = () => {
    
    let totalCarrito = 0;
    for (const producto of canastaLocalStorage) {
        totalCarrito = totalCarrito + 1;
    }
    
    console.log(totalCarrito);
    iconoCarrito.innerHTML = `${totalCarrito}`
    badgeCarrito.innerHTML = `${totalCarrito}`
    localStorage.setItem("totalCarrito", totalCarrito);
}

const sumarCarrito = () => {
    let totalCanasta = 0;
    for (const producto of canastaLocalStorage) {
        console.log(producto.precio.replaceAll(",", ""));
        totalCanasta = totalCanasta + convertirPrecioANumero(producto.precio);
    }
    console.log(totalCanasta);
    total.innerHTML = `$${numeroAComas(totalCanasta)}`
    localStorage.setItem("totalAPagar", totalCanasta);
}

/* Con esta función puedo agregar productos del contenedor a la canasta */
const convertirPrecioANumero = (precio) => parseInt(precio.replaceAll(",", ""));

const numeroAComas = (total) => {
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}