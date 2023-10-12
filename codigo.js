
const sendButton = document.getElementById("snd-nota")

sendButton.addEventListener("click", ()=>{
    let prevRes, mensaje
    try{
        prevRes = parseInt(document.getElementById("nota").value)
        if (isNaN(prevRes)) {
            throw "Gracioso"
        }
        mensaje = definirMensaje(prevRes)
        resultado = verificarAprobacion(8,5,prevRes)
    }catch(error){
        resultado = "Sos gracioso?"
        mensaje = "No me hakees locooooooo"
    }
    abrirModal(resultado,mensaje)
})

const definirMensaje = (pr)=>{
    let resultado
    switch (pr) {
        case 1: resultado = "Tonto"
        break;
        case 2: resultado = "Tonto 2"
        break;
        case 3: resultado = "Tonto 3"
        break;
        case 4: resultado = "Tonto 4"
        break;
        case 5: resultado = "Tonto 5 "
        break;
        case 6: resultado = "Tonto 6"
        break;
        case 7: resultado = "Tonto 7"
        break;
        case 8: resultado = "Tonto 8 "
        break;
        case 9: resultado = "Tonto 9"
        break;
        case 10: resultado = "Tonto 10"
        break;
        default: resultado = null
    
    }
    return resultado
}

const verificarAprobacion = ( nota1, nota2, prevRes)=>{
    nota1 = 8
    nota1 = 5
    promedio = (nota1 + nota2 + prevRes) / 3
    if(promedio >= 7){
        return "aprobado"
    }return "desaprobado"

}
const abrirModal = (res, msg)=>{
    document.querySelector(".resultado").innerHTML = "holaaaaaaaaa"
    document.querySelector(".mensaje").innerHTML = msg
    let modal = document.querySelector(".modal-background")
    
}
