jQuery(() => {
    const redes = [
        {
            id: 1,
            nombre: 'Whatsapp',
            link: 'https://api.whatsapp.com/send?phone=543517687201&text=Hola%2C%20quiero%20hacer%20una%20consulta',
            icon: 'fab fa-whatsapp'
        },
        {
            id: 2,
            nombre: 'Facebook',
            link: 'https://web.facebook.com/ovsuspension/',
            icon: 'fab fa-facebook-square'
        },
        {
            id: 3,
            nombre: 'Instagram',
            link: 'https://www.instagram.com/ovsuspension',
            icon: 'fab fa-instagram'
        },
        {
            id: 4,
            nombre: 'Google Maps',
            link: 'https://g.page/ovsuspension?gm',
            icon: 'fas fa-map-marker-alt'
        }
    ];

    /*  Función agregar redes sociales dinámicamente y crearlos en el contenedor */
    const insertarRedes = () => {
        for (const red of redes) {
            $('#redSocial').append(`
            <li id="${red.id}">
                <a href="${red.link}" target="_Blank">
                <i class="${red.icon}"></i>
            </a>`);
        }
    }

    insertarRedes();

});