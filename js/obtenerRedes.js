const URLredes = "json/redes.json"

jQuery(() => {

    /*  Función agregar redes sociales dinámicamente y crearlos en el contenedor */
    const insertarRedes = () => {
        $.get(URLredes, (respuesta, estado) => {
            console.log(respuesta);
            console.log(estado);
            if (estado === "success") {
                for (const red of respuesta) {
                    $('#redSocial').append(`
                    <li id="${red.id}">
                        <a href="${red.link}" target="_Blank">
                        <i class="${red.icon}"></i>
                    </a>`);
                }
            }
        })
    }   

    insertarRedes();

});