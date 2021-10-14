// Array de Productos
const productos = [
    {
        id: 1,
        codigo: '34301G-COR',
        nombre: 'AMORTIGUADOR CHEVROLET CORSA 94/... DELANTERO',
        imagen: 'imagenes/productos destacados/34301G.jpg',
        precio: '3550'
    },
    {
        id: 2,
        codigo: '22181-COR',
        nombre: 'AMORTIGUADOR PEUGEOT 404 NAFTA/DIESEL .../82 DELANTERO',
        imagen: 'imagenes/productos destacados/22181.jpg',
        precio: '2100'
    },
    {
        id: 3,
        codigo: '34302G-COR',
        nombre: 'AMORTIGUADOR CHEVROLET CORSA 94/... DELANTERO',
        imagen: 'imagenes/productos destacados/34301G.jpg',
        precio: '4500'
    },
    {
        id: 4,
        codigo: '22182-COR',
        nombre: 'AMORTIGUADOR PEUGEOT 404 NAFTA/DIESEL .../82 DELANTERO',
        imagen: 'imagenes/productos destacados/22181.jpg',
        precio: '1750'
    }
];

const productoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
const contenedorProductos  = document.getElementById("divProductos");

/*  Función para crear productos dinámicamente y crearlos en el contenedor */
const insertarProductos = () => {
    for (const producto of productos) {
        let cardProducto = document.createElement("div");
        cardProducto.className = "col mb-5";
        cardProducto.id = producto.id;
        cardProducto.innerHTML = `
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
        </div>`;
        cardProducto.onclick = () => insertarProductosACanasta(producto);
        contenedorProductos.appendChild(cardProducto);
    }
}

insertarProductos();

if (productoLocalStorage !== null) {
    for (const producto of productoLocalStorage) {
        insertarProductosACanasta(producto);
    }
}