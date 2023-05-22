var presupuesto = 0;
var arrValoresGastos = [];
var totalGastos = 0;
var saldo = 0;

function enviarPresupuesto() {
    let inputPresupuesto = document.getElementById('presupuesto').value;
    let mostrarPresupuesto = document.getElementById('td-presupuesto');
    mostrarPresupuesto.innerText = `$ ${inputPresupuesto}`
    presupuesto = inputPresupuesto
}
function enviarGastos() {
    let inputNombreGasto = document.getElementById('nombre-gasto').value;
    let inputValorGasto = document.getElementById('valor-gasto').value;
    var mostrarGastoYValor = document.getElementById('tbody-gastos'); //table body

    //creo elemento table row para agregar cada fila del gasto y su valor
    let crearTableRow = document.createElement('tr');
    crearTableRow.className="fila-producto"

    //creo elemento table data para agregar nombre del gasto ingresado
    let crearTableData1 = document.createElement('td');
    crearTableData1.innerText=`${inputNombreGasto}`
    
    //creo elemento table data para agregar valor del gasto ingresado
    let crearTableData2 = document.createElement('td');
    crearTableData2.innerText=`$ ${inputValorGasto}`

    //creo img papelero para eliminar la fila del gasto ingresado
    let crearTableData3 = document.createElement('td');
    let crearImgEliminar = document.createElement('img');
    crearTableData3.appendChild(crearImgEliminar);
    crearImgEliminar.setAttribute('src', 'Assets/Img/delete.png');

    //agrego contenido al cuerpo de la tabla
    mostrarGastoYValor.appendChild(crearTableRow);
    crearTableRow.appendChild(crearTableData1)
    crearTableRow.appendChild(crearTableData2)
    crearTableRow.appendChild(crearTableData3)
    
    //envío valor del gasto al array arrValoresGastos en variable global y muestro suma en tabla
    //resto gasto del total y lo muestro en tabla 
    if (inputValorGasto) {
        arrValoresGastos.push(Number(inputValorGasto))
        totalGastos = totalGastos + Number(inputValorGasto)
        var verSumaGastos = document.getElementById('td-gastos');
        verSumaGastos.innerText = `$ ${totalGastos}`;

        saldo = presupuesto - totalGastos
        var verSaldo = document.getElementById('td-saldo')
        verSaldo.innerText = `$ ${saldo}`
    }
    //For loop para crearle un id a la fila y a su papelero. 
    //Función que elimina producto usando id de fila y el objeto 'elemento' con el que identifico el papelero de cada fila
    //Modificación de gastos y saldo luego de eliminar un producto
    for(let i = 0; i < arrValoresGastos.length; i++) {
        let idFila = i;
        crearTableRow.id = idFila;
        crearImgEliminar.id= idFila;
        var botonEliminar = document.getElementById(`${idFila}`)
        botonEliminar.onclick = (elemento) => {
            filaBoton = document.getElementById(`${elemento.target.id}`)
            mostrarGastoYValor.removeChild(filaBoton)
            totalGastos -= arrValoresGastos[i]
            saldo += arrValoresGastos[i]
            if (saldo == presupuesto) {
                saldo = 0
            }
            verSumaGastos.innerText = `$ ${totalGastos}`;
            verSaldo.innerText = `$ ${saldo}`
        }
    }
}

asignarEventos = () => {
    let botonPresupuesto = document.getElementById('boton1');
    botonPresupuesto.addEventListener('click', enviarPresupuesto);
    let botonGastos = document.getElementById('boton2');
    botonGastos.addEventListener('click', enviarGastos)
}

window.onload = asignarEventos();