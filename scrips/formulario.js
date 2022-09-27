//esqueleto de ayudanete de turnos para masters
//ingreso de datos por formulario
//guardado de info boton agregar
//por comodidad tomamos la parte de registro
const primeraParte = document.getElementById("primeraparte");
//por comodidad tomamos la aprte de batalla
const segundaParte = document.getElementById("segundaparte");
//por comodidad tomamos todos los inputs de registro
let inputs = document.querySelectorAll("#formulario input");
//aqui tomamos el boto que tiene una funcion dentro de la pagina generalmente un submit
const agregar = document.getElementById("agregar");
//tomamos la notificacion de ingreso correcto o incorrecto para trabajarla mas adelante
const cierre = document.getElementById("cierre");
//variable ausiliares que nos ayudara a guardar los nombres de cada objeto
var nombre = "";
var vida = "";
var velocidad = "";
var estado = "";
var tipo = "";
//objeto que nos ayudaran a realizar la confirmacion de campos
const validador = {
    nombre: false,
    velocidad: false,
    tipo: false,
};
//usaremos la clase participante para facilitar la creacion de objetos
class participante {
    constructor(nombre, vida, velocidad, estado, tipo) {
        this.nombre = nombre;
        this.vida = vida;
        this.velocidad = velocidad;
        this.estado = estado;
        this.tipo = tipo;
    }
    //unas mousquerramientas que nos serviran mas tarde, para generar la actualizacion de estados mas agil
    cambio_stado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
    muerto() {
        this.estado = "muerto";
    }
}
//constantes que nos ayudaran a integrar una inferfaz visual de los participantes actuales
const listaNpc = document.getElementById("npc");
const listaPlayers = document.getElementById("player");
const player = "<i class='bx bxs-face'></i>";
const nonplayer = "<i class='bx bx-bot'></i>";

//array para guardar a los partisipantes y luego ordenarlos
let turnos = [];
//funcion para validar campos y asegurar que los campos inportantes no esten vacios
const validar = (input, campo) => {
    if (input === "") {
        document.getElementById(`formulario-${campo}`).classList.add("activa");
        validador[campo] = false;
    } else {
        document.getElementById(`formulario-${campo}`).classList.remove("activa");
        validador[campo] = true;
    }
};
//constantes para la segunda parte
//variable ausiliar que nos ayuda a determinar el estado de la partida
var estadoPartida = "Registro";

const pasar = document.getElementById("pasar");
const chat = document.getElementById("chat");
const estadoParticipante = document.getElementById("chat");
let activo = document.getElementById("turno_activo");
var contador = 0;

//comuenzo de la ejecucion de programas
//parte uno Registro
agregar.addEventListener("click", () => {
    //tengo que probar si funciona sin prevent default si funciona se saca, si no tengo que programar el borrado
    //de las opciones
    //se rescata la data para trabajar con ella
    inputs.forEach((dato) => {
        //esto se puede hacer con un if simple evalua esa idea porque
        //solo uno de los datos tiene un comportamiento diferente
        //con la data identificada se armara un objeto para el posterior uso en el programa de turnos
        switch (dato.name) {
            case "nombre":
                nombre = dato.value;
                validar(nombre, "nombre");
                dato.value = "";
                break;
            case "vida":
                vida = dato.value;
                validar(vida, "vida");
                dato.value = "";
                break;
            case "velocidad":
                velocidad = dato.value;
                validar(velocidad, "velocidad");
                dato.value = "";
                break;
            case "estado":
                estado = dato.value;
                dato.value = "";
                break;
            case "tipo":
                tipo = dato.value;
                validar(tipo, "tipo");
                dato.value = "";
                break;
        }
        console.log(turnos);
    });

    //validador de opciones de ingreso
    if (validador.nombre && validador.velocidad && validador.tipo) {
        turnos.push(new participante(nombre, vida, velocidad, estado, tipo));
        confirmacion.innerHTML = `Se agrego correctamente a ${nombre}`;
        if (tipo === "npc") {
            listaNpc.innerHTML += nonplayer;
        } else {
            listaPlayers.innerHTML += player;
        }
        confirmacion.classList.add("correcto");
        setTimeout(() => {
            confirmacion.classList.remove("correcto");
        }, 4000);
    } else {
        confirmacion.innerHTML = "faltan campos mi rey";
        confirmacion.classList.add("activa");
    }
});

cierre.addEventListener("click", () => {
    turnos.sort((a, b) => {
        if (parseInt(a.velocidad) > parseInt(b.velocidad)) {
            return -1;
        } else if (parseInt(a.velocidad) < parseInt(b.velocidad)) {
            return 1;
        } else {
            return 0;
        }
    });
    primeraParte.classList.remove("activa");
    primeraParte.classList.add("inactiva");
    segundaParte.classList.remove("inactiva");
    segundaParte.classList.add("activa");
    //comienzo de la segunda parte
    estadoPartida = "ejecutando";
    activo.innerHTML = turnos[0].nombre;
});

pasar.addEventListener("click", () => {
    if (contador === turnos.length - 1) {
        contador = 0;
        activo.innerHTML = turnos[contador].nombre;
    } else {
        contador += 1;
        activo.innerHTML = turnos[contador].nombre;
    }
});
