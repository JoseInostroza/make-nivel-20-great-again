import turnos from formulario

let oredenar = turnos.sort((a,b)=>{
    return b.velocidad - a.velocidad
})

alert(oredenar)