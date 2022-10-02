//esqueleto de ayudanete de turnos para masters
//ingreso de datos por formulario
//guardado de info boton agregar
//por comodidad tomamos la parte de registro
const primeraParte = document.getElementById("primeraparte");
//por comodidad tomamos la parte de batalla
const segundaParte = document.getElementById("segundaparte");
//por comodidad tomamos todos los inputs de registro
const inputs = document.querySelectorAll("#formulario input");
//aqui tomamos el boto que tiene una funcion dentro de la pagina generalmente un submit
const agregar = document.getElementById("agregar");
//tomamos la notificacion de ingreso correcto o incorrecto para trabajarla mas adelante
const cierre = document.getElementById("cierre");
//variable ausiliares que nos ayudara a guardar los nombres de cada objeto
let vida
let velocidad
let estado
let tipo
//objeto que nos ayudaran a realizar la confirmacion de campos
let validador = {
    nombre: false,
    vida: false,
    velocidad: false,
    tipo: false,
};
//30-09 cargar iconos desde un metodo de clase, podria facilitar la actualizacion para que funcione junto a la vida
const player = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 2c3.213 0 5.982 1.908 7.254 4.648a7.8 7.8 0 0 1-.895-.498c-.409-.258-.873-.551-1.46-.772-.669-.255-1.4-.378-2.234-.378s-1.565.123-2.234.377c-.587.223-1.051.516-1.472.781-.378.237-.703.443-1.103.594C9.41 8.921 8.926 9 8.33 9c-.595 0-1.079-.079-1.524-.248-.4-.151-.728-.358-1.106-.598-.161-.101-.34-.208-.52-.313C6.587 5.542 9.113 4 12 4zm0 16c-4.411 0-8-3.589-8-8 0-.81.123-1.59.348-2.327.094.058.185.11.283.173.411.26.876.554 1.466.776.669.255 1.399.378 2.233.378.833 0 1.564-.123 2.235-.377.587-.223 1.051-.516 1.472-.781.378-.237.703-.443 1.103-.595.445-.168.929-.247 1.525-.247s1.08.079 1.525.248c.399.15.725.356 1.114.602.409.258.873.551 1.46.773.363.138.748.229 1.153.291.049.357.083.717.083 1.086 0 4.411-3.589 8-8 8z"></path><circle cx="8.5" cy="13.5" r="1.5"></circle><circle cx="15.5" cy="13.5" r="1.5"></circle></svg>'
const nonplayer = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"></path><ellipse cx="8.5" cy="12" rx="1.5" ry="2"></ellipse><ellipse cx="15.5" cy="12" rx="1.5" ry="2"></ellipse><path d="M8 16h8v2H8z"></path></svg>'
//constantes que nos ayudaran a integrar una inferfaz visual de los participantes actuales
const listaNpc = document.getElementById("npc");
const listaPlayers = document.getElementById("player");

//usaremos la clase participante para facilitar la creacion de objetos
//30-09-22 daremos mas relevancia a los metodos de la clase por calidad de vida del codigo y posiblemente lo migraremos a otro doc para luego importarlo por lineamientos de "micro servicios"
let cont_participantes = 0
class Participante {
    constructor(nombre, vida, velocidad, img, tipo) {
        this.nombre = nombre;
        this.vida = vida;
        this.vidaMax = vida
        this.velocidad = velocidad;
        this.estado = 'vivo';
        this.tipo = tipo;
        this.img = img
    }
    //unas mousquerramientas que nos serviran mas tarde, para generar la actualizacion de estados mas agil

    Print_card() {
        //funcion para crear la carta de cada integrante
        return (`<div class="targeta" id="Targeta-${this.nombre}">
            <span id="imagen-${this.nombre}"> ${this.img} </span>
            <p class="targeta-nombre" id="tagergetaNombre">${this.nombre}</p>
            <p class="targeta-vida" id="contenedorVida">
                <span class="vida_actual" id="vida_actual-${this.nombre}">${this.vida}</span>/<span class="vida_total" id="vida_total">${this.vidaMax}</span>
            </p>
        </div>`)
    }
    Cambio_vida(cantidad, accion) {
        if (accion === 'curacion') {
            this.vida += parseInt(cantidad)
            if (this.vida > this.vidaMax) {
                this.vida = this.vidaMax
            }
            if(this.vida>0){
                this.estado = 'vivo'
            }
            document.getElementById(`vida_actual-${this.nombre}`).innerHTML = this.vida
        }
        if (accion === 'daño') {
            this.vida -= parseInt(cantidad)
            if (this.vida < 1 && this.tipo === "npc") {
                this.estado = 'muerto'
                document.getElementById(`imagen-${this.nombre}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(134, 8, 8, 1);transform: ;msFilter:;"><path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z"></path></svg>'
            }
            if (this.vida < 1 && this.vida > -10 && this.tipo === 'jugador') {
                this.estado = 'piso'
                }
            if (this.vida <= -10 && this.tipo === 'jugador') {
                this.estado = 'muerto'
            }
            document.getElementById(`vida_actual-${this.nombre}`).innerHTML = this.vida
        }
    }
    Cambio_estado(){
        if(this.tipo === 'jugador'){
            if( this.estado === 'vivo'){
                document.getElementById(`imagen-${this.nombre}`).innerHTML = player
            }else if(this.estado === 'piso'){
                document.getElementById(`imagen-${this.nombre}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(185, 168, 25, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M10.707 12.293 9.414 11l1.293-1.293-1.414-1.414L8 9.586 6.707 8.293 5.293 9.707 6.586 11l-1.293 1.293 1.414 1.414L8 12.414l1.293 1.293zm6.586-4L16 9.586l-1.293-1.293-1.414 1.414L14.586 11l-1.293 1.293 1.414 1.414L16 12.414l1.293 1.293 1.414-1.414L17.414 11l1.293-1.293zM10 16h4v2h-4z"></path></svg>'
            }else if(this.estado === 'muerto'){
                document.getElementById(`imagen-${this.nombre}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(177, 17, 17, 1);transform: ;msFilter:;"><path d="M12 2C5.505 2 2 6.637 2 11c0 2.129 1.009 3.979 3 5.508V21h3v-3h2v3h4v-3h2v3h3v-4.493c1.991-1.528 3-3.379 3-5.507 0-4.363-3.505-9-10-9zM8 13c-1.121 0-2-1.098-2-2.5S6.879 8 8 8s2 1.098 2 2.5S9.121 13 8 13zm8 0c-1.121 0-2-1.098-2-2.5S14.879 8 16 8s2 1.098 2 2.5-.879 2.5-2 2.5z"></path></svg>' 
            }
        }
    }
    
}


//array para guardar a los partisipantes y luego ordenarlos
let  turnos = [];
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
let estadoPartida = "Registro";

const pasar = document.getElementById("pasar");
const chat = document.getElementById("chat");
const estadoParticipante = document.getElementById("chat");
const activo = document.getElementById("turno_activo");
let contador = 0;

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
    if (validador.nombre && validador.velocidad && validador.tipo && validador.vida) {
        confirmacion.innerHTML = `Se agrego correctamente a ${nombre}`;
        if (tipo === "npc") {
            turnos.push(new Participante(nombre, vida, velocidad, nonplayer, tipo))
            cont_participantes += 1
        } else {
            turnos.push(new Participante(nombre, vida, velocidad, player, tipo))
            cont_participantes += 1
        }
        confirmacion.classList.add("correcto");
        setTimeout(() => {
            confirmacion.classList.remove("correcto");
        }, 4000);
    } else {
        confirmacion.innerHTML = "faltan campos mi rey";
        confirmacion.classList.add("activa");
    }
    if (turnos[cont_participantes - 1].tipo === 'npc') {
        listaNpc.innerHTML += turnos[cont_participantes - 1].Print_card();
    } else {
        listaPlayers.innerHTML += turnos[cont_participantes - 1].Print_card();
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
let dataCuracion = document.querySelectorAll('#acciones__curacion input');
let dataDaño = document.querySelectorAll('#acciones__daño input');
//tomamos los botones que dispararan el registro de accion 
const botonCuracion = document.getElementById('boton_curacion');
const botonDaño = document.getElementById('boton_daño');

//se ingresan acciones ;D
botonCuracion.addEventListener('click', () => {
    turnos.forEach((u) => {
        if (dataCuracion[1].value === u.nombre) {
            u.Cambio_vida(dataCuracion[0].value, 'curacion')
            u.Cambio_estado()
        }
    })

})


botonDaño.addEventListener('click', () => {
    //aqui ocupo un ciclo for en vez de forEach ya que necesito saber en que index me encuentro apra asi sacar el elemento del array en caso de muerte
    for (let i = 0; i < turnos.length; i++) {
        const u = turnos[i];
        if (dataDaño[1].value === u.nombre) {
            u.Cambio_vida(dataDaño[0].value, 'daño')
            u.Cambio_estado()
            if(u.estado === 'muerto'){
                turnos.splice(i,1)
            }
        }
        
    }
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
