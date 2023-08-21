let DB;

const d = document;
const inputMascota = d.querySelector("#mascota"); 
const inputPropietario = d.querySelector("#propietario"); 
const inputTelefono = d.querySelector("#telefono"); 
const inputFecha = d.querySelector("#fecha"); 
const inputHora = d.querySelector("#hora"); 
const inputSintomas = d.querySelector("#message"); 
const titleCitas = d.querySelector("#citasTitle");

const formulario = d.querySelector("#nueva-cita");
const contCitas = d.querySelector("#citas");

let editando;

window.onload = () => {
    eventListener();

    crearDB();
}

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

    eliminarCita(id){
        this.citas = this.citas.filter(cita =>cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
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
            divCita.classList.add("p-3", "border-t", "border-r", "border-b", "border-l", "border-gray-400", "rounded-b", "mb-2");
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

            //Eliminar cita
            const btnEliminar = d.createElement("button");
            btnEliminar.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "p-2", "rounded");
            btnEliminar.innerHTML = "Eliminar";
            btnEliminar.onclick = () => eliminarCita(id);

            //Boton editar cita
            const btnEditar =  d.createElement("button");
            btnEditar.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "p-2", "rounded", "ml-2");
            btnEditar.textContent = "Editar cita";
            btnEditar.onclick = () => cargarEdicion(cita);

            //Agregar elementos al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

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

    //Editar cita
    if(editando){
        ui.imprimirAlerta("Editado correctamente");

        //Edicion de datos
        admCitas.editarCita({...infoObj});

        formulario.querySelector("button[type='submit']").textContent = "Crear cita";

        editando = false;

        //Pasar objeto a edicion
    }else{
        // titleCitas.textContent = "Listado de citas";

        //Generar Id
        infoObj.id = Date.now();

        //Crear nueva cita
        admCitas.agregarCita({...infoObj});

        ui.imprimirAlerta("Cita agregada correctamente");
        
    }

    //Reiniciar objeto
    reiniciarObjeto();
    // console.log(admCitas)
    
    formulario.reset();

    //Imprimir citas en UI
    ui.imprimirCitas(admCitas);
}

function reiniciarObjeto(){
    infoObj.mascota = "",
    infoObj.propietario = "",
    infoObj.telefono = "",
    infoObj.fecha = "",
    infoObj.hora = "",
    infoObj.sintomas = ""
}

function eliminarCita(id){
    //Eliminar cita
    admCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta("La cita se elimino correctamente");

    //Refrescar cita
    ui.imprimirCitas(admCitas);
}

//Funcion para editar datos
function cargarEdicion(cita){
    const {mascota, propietario,telefono,fecha,hora,sintomas, id} = cita;

    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora;
    inputSintomas.value = sintomas;

    formulario.querySelector("button[type='submit']").textContent = "Guardar cambios";

    editando = true;

    infoObj.mascota = mascota;
    infoObj.propietario = propietario;
    infoObj.telefono = telefono;
    infoObj.fecha = fecha;
    infoObj.hora = hora;
    infoObj.sintomas = sintomas;
    infoObj.id = id;
}

//IndexDB
function crearDB(){
    //Version 1.0
    const c_DB = window.indexedDB.open("citas", 1);
    
    //Error
    c_DB.onerror = function(){
        console.log("hubo un error");
    }
    
    //Success
    c_DB.onsuccess = function(){
        console.log("Se creo correctamente");

        DB = c_DB.result;
    }

    //Esquema
    c_DB.onupgradeneeded = function(e){
        const db = e.target.result;
        const objectStore = db.createObjectStore("citas",  {
            keyPath: "id",
            autoIncrement: true
        });

        //Definir columnas
        objectStore.createIndex("mascota", "mascota", {unique:false});
        objectStore.createIndex("propietario", "propietario", {unique:false});
        objectStore.createIndex("telefono", "telefono", {unique:false});
        objectStore.createIndex("fecha", "fecha", {unique:false});
        objectStore.createIndex("hora", "hora", {unique:false});
        objectStore.createIndex("sintomas", "sintomas", {unique:false});
        objectStore.createIndex("id", "id", {unique:true});
    }
}