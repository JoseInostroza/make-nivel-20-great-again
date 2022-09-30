//esqueleto de ayudanete de turnos para masters
//ingreso de datos por formulario
//guardado de info boton agregar
//por comodidad tomamos la parte de registro
const primeraParte = document.getElementById("primeraparte");
//por comodidad tomamos la parte de batalla
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
    vida:false,
    velocidad: false,
    tipo: false,
};
//usaremos la clase participante para facilitar la creacion de objetos
class Participante {
    constructor(nombre, vida, velocidad, estado, tipo) {
        this.nombre = nombre;
        this.vida = vida;
        this.vidaMax = vida
        this.velocidad = velocidad;
        this.estado = 'vivo';
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
//30-09 cargar iconos desde un metodo de clase, podria facilitar la actualizacion para que funcione junto a la vida
const player = "<i class='bx bxs-face'></i>";
const nonplayer = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"></path><ellipse cx="8.5" cy="12" rx="1.5" ry="2"></ellipse><ellipse cx="15.5" cy="12" rx="1.5" ry="2"></ellipse><path d="M8 16h8v2H8z"></path></svg>';

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
                vida = parseInt(dato.value);
                validar(vida, "vida");
                dato.value = "";
                break;
            case "velocidad":
                velocidad = parseInt(dato.value);
                validar(velocidad, "velocidad");
                dato.value = "";
                break;
            //case "estado":
                //estado = dato.value;
                //dato.value = "";
                //break;
            case "tipo":
                tipo = dato.value;
                validar(tipo, "tipo");
                dato.value = "";
                break;
        }
    });

    //validador de opciones de ingreso
    if (validador.nombre && validador.velocidad && validador.tipo) {
        turnos.push(new Participante(nombre, vida, velocidad, estado, tipo));
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
        if (a.velocidad > b.velocidad) {
            return -1;
        } else if (a.velocidad < b.velocidad) {
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

//tomamos los datos necesarios para trabajar con las acciones en batalla (cantidad y target de curacion o daño)
let dataCuracion =document.querySelectorAll('#acciones__curacion input');
let dataDaño =document.querySelectorAll('#acciones__daño input');
//tomamos los botones que dispararan el registro de accion 
const botonCuracion =document.getElementById('boton_curacion');
const botonDaño=document.getElementById('boton_daño');

//se ingresan acciones ;D
botonCuracion.addEventListener('click',()=>{
    turnos.forEach((u)=>{
        if(dataCuracion[1].value===u.nombre){
            u.vida+=parseInt(dataCuracion[0].value)
            if(u.vida > u.vidaMax){
                u.vida=u.vidaMax
            }
            console.log(u.vida)
        }
    })
    
})


botonDaño.addEventListener('click',()=>{
    turnos.forEach((u)=>{
        if(dataDaño[1].value===u.nombre){
            u.vida-=parseInt(dataDaño[0].value)
            if(u.vida < 1 && u.tipo === "npc"){
                u.muerto()
                console.log(u.estado)
            }
            if(u.vida < 1 && u.vida > -10 && u.tipo === 'jugador'){
                u.cambio_stado('piso')
                console.log(u.estado)
            }   
            if(u.vida <= -10 && u.tipo === 'jugador'){
                u.muerto()
                console.log(u.estado)
            }  
            console.log(u.vida)
        }
    })
    
})

//
pasar.addEventListener("click", () => {
    if (contador === turnos.length - 1) {
        contador = 0;
        activo.innerHTML = turnos[contador].nombre;
        console.log(turnos)
    } else {
        contador += 1;
        activo.innerHTML = turnos[contador].nombre;
    }
});
