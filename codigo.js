

const IDBRequest = indexedDB.open("usuarios", 1)



IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("nombre", {
        autoIncrement: true
    })
})
IDBRequest.addEventListener("success", ()=>{
    leerObjetos()
})

IDBRequest.addEventListener("error", ()=>{
    console.log("error")
})

document.getElementById('add').addEventListener("click", ()=>{
    let nombre = document.getElementById("nombre").value
        if(nombre.length > 0){
            addObjeto({nombre})
            leerObjetos()
        }
    })


const addObjeto = objeto =>{
    const db = IDBRequest.result
    const IDBtransaction = db.transaction("nombre", "readwrite")
    const objectStore = IDBtransaction.objectStore('nombre')
    objectStore.add(objeto)
    IDBtransaction.addEventListener("complete", ()=>{
        console.log("objeto creado exitosamente")
    })
}
const leerObjetos = () =>{
    const db = IDBRequest.result
    const IDBtransaction = db.transaction("nombre", "readonly")
    const objectStore = IDBtransaction.objectStore('nombre')
    const cursor = objectStore.openCursor()
    const fragment = document.createDocumentFragment()
    document.querySelector(".nombres").innerHTML = ""
    cursor.addEventListener("success",()=>{
        if(cursor.result){
            let elemento = nombresHTML(cursor.result.key, cursor.result.value)
            fragment.appendChild(elemento)
            cursor.result.continue()
        }else{document.querySelector(".nombres").appendChild(fragment)}
    })

    IDBtransaction.addEventListener("complete", ()=>{
        console.log("objeto creado exitosamente")
    })
}

const modificarObjeto = (key,objeto) =>{
    const db = IDBRequest.result
    const IDBtransaction = db.transaction("nombre", "readwrite")
    const objectStore = IDBtransaction.objectStore('nombre')
    objectStore.put(objeto, key)
    IDBtransaction.addEventListener("complete", ()=>{
        console.log("objeto modificado exitosamente")
    })
}
const eliminarObjeto = (key) =>{
    const IDBData = getIDBData()
    IDBData[0].delete(key)
    IDBData[1].addEventListener("complete", ()=>{
        console.log("objeto eliminado exitosamente")
    })
}

const getIDBData = ()=>{
    const db = IDBRequest.result
    const IDBtransaction = db.transaction("nombre", "readwrite")
    const objectStore = IDBtransaction.objectStore('nombre')
    return [objectStore, IDBtransaction]
}

const nombresHTML = (id,name) =>{
    const container = document.createElement("DIV")
    const h2 = document.createElement("h2")
    const options = document.createElement("DIV")
    const saveButton = document.createElement("button")
    const deleteButton = document.createElement("button")

    container.classList.add("nombre")
    options.classList.add("options")
    saveButton.classList.add("imposible")
    deleteButton.classList.add("delete")

    saveButton.textContent = "Guardar"
    deleteButton.textContent = "Eliminar"
    h2.textContent = name.nombre

    h2.setAttribute("contenteditable", "true")
    h2.setAttribute("spell", "check")

    options.appendChild(saveButton)
    options.appendChild(deleteButton)

    container.appendChild(h2)
    container.appendChild(options)

    h2.addEventListener("keyup", ()=>{
        saveButton.classList.replace("imposible", "posible")
    })

    saveButton.addEventListener("click", ()=>{
        if(saveButton.className == "posible"){
            modificarObjeto(id,{nombre: h2.textContent})
            saveButton.classList.replace("posible", "imposible")
        }
    })

    deleteButton.addEventListener("click", ()=>{
        eliminarObjeto(id)
        document.querySelector(".nombres").removeChild(container)
    })

    
    return container
}

