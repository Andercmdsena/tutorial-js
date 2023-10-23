const resultado = document.querySelector(".resultado")
const carga = document.querySelector(".cargar")


for (let i = 0; i <= 100; i++) {
    setTimeout(() => {
        resultado.textContent = `${i}%` 
        carga.style.width = `${i}px`
        if(i === 100){
            carga.style.background = "green"
            carga.style.transition = "0.5s"
            resultado.style.transition = "0.5s"
            resultado.textContent = "Cargar completa"
        }
    }, 50 * i);
    
}


