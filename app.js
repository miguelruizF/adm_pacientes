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
}

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
    console.log(infoObj);
}