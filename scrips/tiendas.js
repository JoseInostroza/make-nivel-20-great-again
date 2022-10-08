const transaccionData = document.querySelectorAll('#gastos input')
const carro = document.querySelectorAll('#gastoTotal span')
const  gastoBoton= document.getElementById('agregarCobro')
const fondoBoton = document.getElementById('agregarFondo')
const calcular = document.getElementById('calcularDirecta')

let listaMonedas = ['Cobre','Plata','Oro','Platino']
let monto
let tipo
let valorCarrito={'Cobre':0,'Plata':0,'Oro':0,'Platino':0}
let valorFondo={cobre:0,plata:0,oro:0,pltaino:0}

function actaulizarCarro(moneda, valor){
    valor= parseInt(valor)
    valorCarrito[moneda]+= valor
    carro.forEach((element)=>{        
        if(element.id === moneda){
            console.log(element)            
            element.innerHTML = valorCarrito[moneda]
        }
    })
}

gastoBoton.addEventListener('click',()=>{
    transaccionData.forEach((e)=>{
        switch(e.name){
            case 'carritoNumero':
                if(e.value !== ''){
                    monto = e.value
                    e.value=''
                    break
                }else {
                    console.log('aqui va una alerta');
                    break
                };
            case 'carritoMoneda':                
                if(listaMonedas.includes(e.value)){
                    switch(e.value){
                        case 'Cobre':
                            actaulizarCarro(e.value,monto)                            
                            break
                        case 'Plata':
                            break
                        case 'Oro':
                            break
                        case 'Platino':
                            break
                    }
                }else{
                    console.log('not gucci');
                }
        }
    })
    
});
