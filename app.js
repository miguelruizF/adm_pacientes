const d = document;
const inputMascota = d.querySelector("#mascota"); 
const inputPropietario = d.querySelector("#propietario"); 
const inputTelefono = d.querySelector("#telefono"); 
const inputFecha = d.querySelector("#fecha"); 
const inputHora = d.querySelector("#hora"); 
const inputSintomas = d.querySelector("#message"); 

const formulario = d.querySelector("#nueva-cita");
const contCitas = d.querySelector("#citas");

eventListener();
//Funcion general
function eventListener(){
    inputMascota.addEventListener("input", datosCitas);
    inputPropietario.addEventListener("input", datosCitas);
    inputTelefono.addEventListener("input", datosCitas);
    inputFecha.addEventListener("input", datosCitas);
    inputHora.addEventListener("input", datosCitas);
    inputSintomas.addEventListener("input", datosCitas);
    formulario.addEventListener("submit", nuevaCita);
}

//Clases
class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        // console.log(this.citas)
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        const divMensaje = d.createElement("div");
        divMensaje.classList.add("w-9/12","text-center", "border-t-4", "rounded-b", "py-3", "px-20","shadow-md", "mb-4", "text-lg", "font-bold");

        if(tipo === "error"){
            divMensaje.classList.add("bg-red-100", "border-red-700" )
        }else{
            divMensaje.classList.add("bg-teal-100", "border-teal-500")
        }

        divMensaje.textContent = mensaje;

        //Agregar al DOM
        d.querySelector("#contenido").insertBefore(divMensaje, d.querySelector("#section-formulario"));

        //Quitar alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){
        this.limpiarHTML();
        // console.log(citas);
        citas.forEach(cita => {
            const {mascota, propietario,telefono,fecha,hora,sintomas, id} = cita;

            //Crear HTML
            const divCita = d.createElement("div");
            divCita.classList.add("p-3");
            divCita.setAttribute.id = id;

            //Scripting de los elementos
            const mascotaParrafo = d.createElement("h2");
            mascotaParrafo.classList.add("font-bold");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = d.createElement("p");
            propietarioParrafo.innerHTML = `
            <span class="text-bold">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = d.createElement("p");
            telefonoParrafo.innerHTML = `
            <span class="text-bold">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = d.createElement("p");
            fechaParrafo.innerHTML = `
            <span class="text-bold">Fecha: </span> ${fecha}
            `;

            const horaParrafo = d.createElement("p");
            horaParrafo.innerHTML = `
            <span class="text-bold">Hora: </span> ${hora}
            `;

            const sintomasParrafo = d.createElement("p");
            sintomasParrafo.innerHTML = `
            <span class="text-bold">Sintomas: </span> ${sintomas}
            `;

            //Agregar elementos al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            //Agregar al HTML
            contCitas.appendChild(divCita);
        });
    }

    limpiarHTML(){
        while(contCitas.firstChild){
            contCitas.removeChild(contCitas.firstChild)
        }
    }
}

const ui = new UI();
const admCitas = new Citas();

//Objeto - informacion del formulario
const infoObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}

//Funciones 
function datosCitas(e){
    infoObj[e.target.name] = e.target.value;
    // console.log(infoObj);
}

function nuevaCita(e){
    e.preventDefault();
    const {mascota, propietario,telefono,fecha,hora,sintomas} = infoObj;

    //validar
    if(mascota === "" || propietario === "" || telefono === "" || fecha ==="" || hora === "" || sintomas === ""){
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
        // console.log("Todos los datos son obligatorios");
        return;
    }

    //Generar Id
    infoObj.id = Date.now();

    //Crear nueva cita
    admCitas.agregarCita({...infoObj});

    //Reiniciar objeto
    reiniciarObjeto();
    // console.log(admCitas)
    ui.imprimirAlerta("Cita agregada correctamente");
    formulario.reset();

    //Imprimir citas en UI
    ui.imprimirCitas(admCitas   );
}

function reiniciarObjeto(){
    infoObj.mascota = "",
    infoObj.propietario = "",
    infoObj.telefono = "",
    infoObj.fecha = "",
    infoObj.hora = "",
    infoObj.sintomas = ""
}