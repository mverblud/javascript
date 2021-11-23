$(`#btnContacto`).on("click", function () {validarContacto();});

const validarContacto = () => {

    let nombre   = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email    = document.getElementById("email").value;
    let consulta = document.getElementById("consulta").value;

    /* Elimino cartel si ya existe.  */    
    $(`#divAlert`).remove();

    if(nombre !== "" && apellido !== ""){
        if(email !== ""){
            if(consulta !== ""){
                $(`#divValidacion`).append(`
                <div id='divAlert' class="alert alert-success mt-3" role="alert">
                    Consulta enviada exitosamente.
                </div>`);
                nombre   = '';
                apellido = '';
                email    = '';
                consulta = '';
            }
            else{
                mensajeError('Debe ingresar una consulta');
                $("#consulta").focus();
            }
        }
        else{
            mensajeError('Debe ingresar email');
            $("#email").focus();
        }
    }
    else{
        mensajeError('Debe ingresar nombre y apellido');
        $("#nombre").focus();
    }
}

const mensajeError = (mensaje) => {
    $(`#divValidacion`).append(`
    <div id='divAlert' class="alert alert-danger mt-3" role="alert">${mensaje}</div>`);
}


