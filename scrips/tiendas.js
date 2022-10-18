const gastosData = document.querySelectorAll('#gastos input')
const fondosData = document.querySelectorAll('#fondos input')
const carro = document.querySelectorAll('#gastoTotal span')
const  gastoBoton= document.getElementById('agregarCobro')
const fondoBoton = document.getElementById('agregarFondo')
const calcular = document.getElementById('calcularDirecta')

let listaMonedas = ['Cobre','Plata','Oro','Platino']
let cash=0
let bobeda=0
let tipo
let valorCarrito={'Cobre':0,'Plata':0,'Oro':0,'Platino':0}



function actaulizarCarro(moneda){
    carro.forEach((element)=>{        
        if(element.id === moneda){           
            element.innerHTML = valorCarrito[moneda]
        }
    })
}

function CalcularVivisas(){
    monto=bobeda
    //up= objeto[lista[i]]/10;
    //objeto[lista[i+1]] += Math.trunc(up);
    //up=0;
    //objeto[lista[i]] = objeto[lista[i]]%10
    //actaulizarCarro(lista[i])
    //actaulizarCarro(lista[i+1])
    if(monto%1000 !==0 || monto/1000 !== 0){
        platino = Math.trunc(monto/1000)
        valorCarrito['Platino']= platino
        actaulizarCarro('Platino')
        monto = monto%1000
        console.log(monto, bobeda, platino);
    } 
    if(monto%100 !==0 || monto/100 !== 0){
        oro = Math.trunc(monto/100)
        valorCarrito['Oro']= oro
        actaulizarCarro('Oro')
        monto = monto%100
    }
    if(monto%10 !==0 || monto/10 !== 0){
        plata = Math.trunc(monto/10)
        cobre = monto%10
        valorCarrito['Plata']= plata
        actaulizarCarro('Plata')
        valorCarrito['Cobre'] = cobre
        actaulizarCarro('Cobre')
    }
    
        
    
}


gastoBoton.addEventListener('click',()=>{
    gastosData.forEach((e)=>{
        switch(e.name){
            case 'carritoNumero':
                if(e.value !== ''){
                    cash = parseInt(e.value) 
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
                            bobeda+=cash
                            CalcularVivisas()
                            e.value=''                           
                            break
                        case 'Plata':
                            bobeda+=cash*10
                            CalcularVivisas()
                            e.value='' 
                            break
                        case 'Oro':
                            bobeda+=cash*100
                            CalcularVivisas()
                            e.value='' 
                            break
                        case 'Platino':
                            bobeda+=cash*1000
                            CalcularVivisas()
                            e.value='' 
                            break
                    }
                }else{
                    console.log('not gucci');
                }
                cash=0
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
                    cash = parseInt(e.value ) 
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
                            bobeda -= cash
                            CalcularVivisas()
                            e.value=''                          
                            break
                        case 'Plata':
                            bobeda -= cash*10
                            CalcularVivisas()
                            e.value=''
                            break
                        case 'Oro':
                            bobeda -= cash*100
                            CalcularVivisas()
                            e.value=''
                            break
                        case 'Platino':
                            bobeda -= cash*1000
                            CalcularVivisas()
                            e.value=''
                            break
                    }
                }else{
                    console.log('not gucci');
                }
                cash=0
}})
})