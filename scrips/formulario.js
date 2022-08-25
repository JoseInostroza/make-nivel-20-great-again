//esqueleto de ayudanete de turnos para masters
//ingreso de datos por formulario
//guardado de info boton agregar
//por comodidad tomamos el formulario
let formulario = document.getElementById('formulario');
//por comodidad tomamos todos los inputs
let inputs = document.querySelectorAll('#formulario input');
//aqui tomamos el boto que tiene una funcion dentro de la pagina generalmente un submit
let agregar = document.getElementById('agregar');
//variable ausiliares que nos ayudara a guardar los nombres de cada objeto 
var nombre = ''
var velocidad = ''
var estado = ''
var tipo = '' 
//objeto que nos ayudaran a realizar la confirmacion de campos
const validador = {
    nombre:false,
    velocidad: false,
    tipo: false
};
//usaremos la clase participante para facilitar la creacion de objetos 
class participante{
    constructor(nombre,velocidad,estado,tipo){
        this.nombre=nombre
        this.velocidad=velocidad
        this.estado=estado
        this.tipo=tipo
    }
    //una mousquerramienta que nos servira mas tarde, para generar la actualizacion de estados mas agil
    cambio_stado(){
        this.estado='muerto'
    }
};
//array para guardar a los partisipantes y luego ordenarlos 
let turnos = []
//funcion para validar campos y asegurar que los campos inportantes no esten vacios
const validar= (input,campo)=>{
    if(input === ''){
        document.getElementById(`formulario__alerta_${campo}`).classList.remove('inactiva')
        document.getElementById(`formulario__alerta_${campo}`).classList.add('activa')
        validador[campo] = false
    }
    else{
        document.getElementById(`formulario__alerta_${campo}`).classList.remove('activa')
        document.getElementById(`formulario__alerta_${campo}`).classList.add('inactiva')
        validador[campo] = true
    }
}

agregar.addEventListener('click',(e)=>{
    e.preventDefault()
    //tengo que probar si funciona sin prevent default si funciona se saca, si no tengo que programar el borrado
    //de las opciones 
    
    //se rescata la data para trabajar con ella 
    inputs.forEach((dato)=>{
        //esto se puede hacer con un if simple evalua esa idea porque 
        //solo uno de los datos tiene un comportamiento diferente
        //con la data identificada se armara un objeto para el posterior uso en el programa de turnos 
        switch(dato.name){
            case "nombre":
                nombre = dato.value
                validar(nombre,'nombre')                
                dato.value = ''                
            break
            case "velocidad":
                velocidad = dato.value
                validar(velocidad,'velocidad')
                dato.value = ''
            break
            case "estado":
                estado = dato.value
                dato.value = ''
            break
            case "tipo":
                tipo = dato.value
                validar(tipo,'tipo')
            break
        }
    });
    if(validador.nombre && validador.velocidad && validador.tipo){
        turnos.push(new participante(nombre,velocidad,estado,tipo))
        let confirmacion = document.getElementById('confirmacion')
        confirmacion.innerHTML= `Se agrego correctamente a ${nombre}`
        confirmacion.classList.remove('inactiva')
        confirmacion.classList.add('activa')
        setTimeout(()=>{
            confirmacion.classList.remove('activa')
            confirmacion.classList.add('inactiva')
        },2000)
    }

    console.log(turnos)
    console.log(validador)
});
