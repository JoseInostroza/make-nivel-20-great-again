const gastosData = document.querySelectorAll('#gastos input')
const fondosData = document.querySelectorAll('#fondos input')
const carro = document.querySelectorAll('#gastoTotal span')
const  gastoBoton= document.getElementById('agregarCobro')
const fondoBoton = document.getElementById('agregarFondo')
const calcular = document.getElementById('calcularDirecta')

let listaMonedas = ['Cobre','Plata','Oro','Platino']
let monto
let tipo
let valorCarrito={'Cobre':0,'Plata':0,'Oro':0,'Platino':0}

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
        if((objeto[lista[i]]>9 || objeto[lista[i]]<-9) && lista[i]!=='Platino'){
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
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value=''                           
                            break
                        case 'Plata':
                            actaulizarCarro(e.value,monto)
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value='' 
                            break
                        case 'Oro':
                            actaulizarCarro(e.value,monto)
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value='' 
                            break
                        case 'Platino':
                            actaulizarCarro(e.value,monto)
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value='' 
                            break
                    }
                }else{
                    console.log('not gucci');
                }
        }
    })
    
});

calcular.addEventListener('click',()=>{
    listaMonedas.forEach((i)=>{
        valorCarrito[i]=0
    })
})

fondoBoton.addEventListener('click', ()=>{
    fondosData.forEach((e)=>{
        switch(e.name){
            case 'monederoNumero':
                if(e.value !== ''){
                    monto = -parseInt(e.value) 
                    e.value=''
                    break
                }else {
                    console.log('aqui va una alerta');
                    break
                };
            case 'monederoMoneda':                
                if(listaMonedas.includes(e.value)){
                    switch(e.value){
                        case 'Cobre':
                            actaulizarCarro('Cobre',monto)
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value=''                          
                            break
                        case 'Plata':
                            actaulizarCarro('Cobre',(monto*10))
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value=''
                            break
                        case 'Oro':
                            actaulizarCarro('Cobre',(monto*100))
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value=''
                            break
                        case 'Platino':
                            actaulizarCarro('Cobre',(monto*1000))
                            CalcularVivisas(valorCarrito,listaMonedas)
                            e.value=''
                            break
                    }
                }else{
                    console.log('not gucci');
                }
}})
})