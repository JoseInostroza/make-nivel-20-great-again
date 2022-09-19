function ordenar(Aray){
    Aray.sort((a,b)=>{
        b.velocidad - a.velocidad
    })
    return Aray
}

export {ordenar}