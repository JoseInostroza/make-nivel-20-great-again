const gastosData = document.querySelectorAll('#gastos input')
const carro = document.querySelectorAll('#gastoTotal span')
const  gastoBoton= document.getElementById('agregarCobro')
const fondoBoton = document.getElementById('agregarFondo')
const calcular = document.getElementById('calcularDirecta')

let listaMonedas = ['Cobre','Plata','Oro','Platino']
let monto
let tipo
let valorCarrito={'Cobre':0,'Plata':0,'Oro':0,'Platino':0}
let valorFondo={'Cobre':0,'Plata':0,'Oro':0,'Platino':0}

function actaulizarCarro(moneda, valor){
    valor= parseInt(valor)
    valorCarrito[moneda]+= valor
    carro.forEach((element)=>{        
        if(element.id === moneda){           
            element.innerHTML = valorCarrito[moneda]
        }
    })
}

function CalcularVivisas(objeto,lista){
    for (i=0; i<lista.length; ++i){
        if(objeto[lista[i]]>9 && lista[i]!=='Platino'){
           up= objeto[lista[i]]/10;
           objeto[lista[i+1]] += Math.trunc(up);
           up=0;
           objeto[lista[i]] = objeto[lista[i]]%10
           actaulizarCarro(lista[i],0)
           actaulizarCarro(lista[i+1],0)
        }
        
    }
}


gastoBoton.addEventListener('click',()=>{
    gastosData.forEach((e)=>{
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
                            actaulizarCarro(e.value,monto) 
                            break
                        case 'Oro':
                            actaulizarCarro(e.value,monto) 
                            break
                        case 'Platino':
                            actaulizarCarro(e.value,monto) 
                            break
                    }
                }else{
                    console.log('not gucci');
                }
        }
    })
    
});

calcular.addEventListener('click',()=>{CalcularVivisas(valorCarrito,listaMonedas)})

fondoBoton.addEventListener('click', ()=>{

})