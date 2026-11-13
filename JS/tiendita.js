var btnsave=document.getElementById("btnsave");
var btnEdit=document.getElementById("btnEdit");
var productos=[];
btnsave.onclick=()=>{
    txtNombre=document.getElementById("nombre");
    txtPrecio=document.getElementById("precio");
    if(txtNombre.value==""|| txtPrecio.value==""){
        alert("ERROR: CAMPOS VACIOS")
        return;
    }
    const producto={
        nombre:txtNombre.value, 
        precio:txtPrecio.value
        }
    productos.push(producto);
    console.log(productos)
    localStorage.setItem("productos",JSON.stringify(productos));
    cargarProductos();
    document.getElementById("addProducto").close();
}

btnEdit.onclick=()=>{
    txtNombre=document.getElementById("nombree");
    txtPrecio=document.getElementById("precioe");
    posicion=document.getElementById("posicion");
    if(txtNombre.value==""|| txtPrecio.value==""){
        alert("ERROR: CAMPOS VACIOS")
        return;
    }
    productos[posicion.value].nombre=txtNombre.value;
    productos[posicion.value].precio=txtPrecio.value;
    localStorage.setItem("productos",JSON.stringify(productos));
    document.getElementById("editProducto").close();
    txtNombre.value="";
    txtPrecio.value="";
    cargarProductos();
}

const cargarProductos=()=>{
    let posicion=0;
    productos = JSON.parse(localStorage.getItem("productos"));
    tbody=document.getElementById("productos");
    var tabla="";
    productos.map((producto)=>{
        tabla+=`<tr class="text-center">
            <td><b>${producto.nombre.toUpperCase()}</b></td>
            <td><b>$${parseFloat(producto.precio).toFixed(2)}</b></td>
            <td>
                <button class="btn-solid theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash-fill"></i></button>
                <button class="btn-solid theme-warning" data-bs-toggle="dialog" data-bs-target="#editProducto" onclick="editarProducto(${posicion})"><i class="bi bi-pencil-fill"></i></button>
            </td>
        </tr>`
        posicion++;
    })
    tbody.innerHTML=tabla;
}
cargarProductos();
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
    confirmButton: 'btn-solid theme-success mx-5',
    cancelButton: 'btn-solid theme-danger'
    },
    buttonsStyling: false
});


const eliminarProducto=(posicion)=>{

swalWithBootstrapButtons.fire({
    title: "ELIIMINAR REGISTRO",
    text: "Estas sefuro de eliminar este registro?",
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "SI",
    cancelButtonText: "NO",
    reverseButtons: true
}).then((result) => {
    if(result.isConfirmed){
        productos.splice(posicion,1);
        localStorage.setItem("productos",JSON.stringify(productos));
        cargarProductos();
        Swal.fire({title: "EXITO!",text: "Se eliminó correctamente!",icon: "success"});
    }
});

}

const editarProducto=(posicion)=>{
    const producto=productos[posicion];
    document.getElementById("nombree").value=producto.nombre;
    document.getElementById("precioe").value=producto.precio;
    document.getElementById("posicion").value=posicion;
}   
