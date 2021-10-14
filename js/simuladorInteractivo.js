/* Cargar producto , calcular Precio de venta , precio iva, precio final y descuentos por promocion. */
let iva = 1.21;

class Producto {
    constructor(codigo, nombre, rubro, precio, ganancia, descuento=0) {
        this.codigo      = codigo.toUpperCase();
        this.nombre      = nombre.toUpperCase();
        this.rubro       = rubro.toUpperCase();
        this.precio      = parseFloat(precio);
        this.ganancia    = parseFloat(ganancia);
        this.descuento   = parseFloat(descuento);
        this.precioIva   = parseFloat(this.precioIva);
        this.precioFinal = parseFloat(this.precioFinal);

    }
    sumarIva() {
        this.precioIva = this.precio * iva;
    }
    
    sumarGanancia() {
        this.precioFinal = ((this.precioIva * this.ganancia) / 100) + this.precioIva;
    }
    aplicarDescuento() {
        this.precioFinal = this.precioFinal - ((this.precioIva * this.descuento) / 100)
    } 
}

const pidoDatos = () => {

    const productos = [];
    let   cantidad  = 5;
    let   filtro;

    // Cargo array de producto(2)
    do{
        let codigo         = prompt('codigo');
        let nombre         = prompt('nombre');
        let rubro          = prompt('rubro');
        let precio         = parseFloat(prompt('Precio Unitario'));
        let ganancia       = parseFloat(prompt('Ganancia %'));
        let descuento      = parseFloat(prompt('Descuento %'));  
        
        productos.push(new Producto(codigo,nombre,rubro,precio,ganancia,descuento));

    }while(productos.length != cantidad)

    // aplico sumarIva y sumarGanancia , aplicar descuento segun tenga
    for (const producto of productos){
        producto.sumarIva();
        producto.sumarGanancia();
        if (producto.descuento > 0) {
            producto.aplicarDescuento();       
        }
    }

//  criterio para ordenar
    do{
        filtro = prompt('Ingrese filtro para ordenar : [nombre], [precio]');
    }while(filtro !== 'nombre' && filtro !== 'precio')

    productos.sort((a, b) => {
        if (a[filtro] > b[filtro]) {
            return 1;
        }
        if (a[filtro] < b[filtro]) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

//  ARRAY ordenado
    console.log(`array ordenado por filtro: ${filtro}`);
    console.log(productos);

//  Imprimo producto con descuento
    console.log("productos con descuento:");
    console.log(productos.filter((p) => p.descuento > 0));

    console.log("productos con mayores: $1000");
    console.log(productos.filter((p) => p.precio >= 1000));

    console.log("primero 2 productos");
    const primerosProductos = productos.slice(0,2);
    console.log(primerosProductos);

}
pidoDatos()