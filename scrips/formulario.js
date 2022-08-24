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
                if (dato.value === ''){                
                    
                }
                else{
                    nombre = dato.value
                    dato.value = ''
                }
            break
            case "velocidad":
                velocidad = dato.value
                dato.value = ''
            break
            case "estado":
                estado = dato.value
                dato.value = ''
            break
            case "tipo":
                tipo = dato.value
                dato.value = ''
            break
        }
    });
    turnos.push(new participante(nombre,velocidad,estado,tipo))
});

export default turnos