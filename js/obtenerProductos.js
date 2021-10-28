const URL = "json/productos.json"
// jquery ready
jQuery(() => {
 // Recupero carrito en localstorage
    const productoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

    const insertarProductos = () => {
        $.get(URL, (respuesta, estado) => {
            console.log(respuesta);
            console.log(estado);
            if (estado === "success") {
                for (const producto of respuesta) {
                    $('#divProductos').append(`
                        <div class="col mb-5" id="${producto.id}">
                            <div class="card h-100 border-2 rounded-3 shadow-lg">
                                <img class="card-img-top" src="${producto.imagen}" alt="">
                                <div class="card-body p-4 border-top border-2">
                                    <div class="text-center">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.codigo}</p>
                                        <p class="card-text">$${producto.precio}</p>
                                    </div>
                                </div>
                                <!-- Product actions-->
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-lg btn-warning mt-auto" href="#">Agregar</a>
                                    </div>
                                </div>
                            </div>
                        </div>`)

                    $(`#${producto.id}`).on("click", function () {
                        insertarProductosACanasta(producto);
                    });
                }
            }
        });
    }

    insertarProductos();

    // Recupero carrito en localstorage
    if (productoLocalStorage !== null) {
        for (const producto of productoLocalStorage) {
            insertarProductosACanasta(producto);
        }
    }
});