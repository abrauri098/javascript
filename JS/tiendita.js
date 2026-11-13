var btnsave = document.getElementById("btnsave");
var btnEdit = document.getElementById("btnEdit");
var productos = [];

btnsave.onclick = () => {
    let txtNombre = document.getElementById("nombre");
    let txtPrecio = document.getElementById("precio");
    let txtCantidad = document.getElementById("cantidad");

    if (txtNombre.value == "" || txtPrecio.value == "" || txtCantidad.value == "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    const producto = {
        nombre: txtNombre.value,
        precio: txtPrecio.value,
        cantidad: txtCantidad.value
    };

    productos.push(producto);
    console.log(productos);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();

    txtNombre.value = "";
    txtPrecio.value = "";
    txtCantidad.value = "";
    document.getElementById("addProducto").close();
}

btnEdit.onclick = () => {
    let txtNombre = document.getElementById("nombree");
    let txtPrecio = document.getElementById("precioe");
    let txtCantidad = document.getElementById("cantidade");
    let posicion = document.getElementById("posicion");

    if (txtNombre.value == "" || txtPrecio.value == "" || txtCantidad.value == "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    productos[posicion.value].nombre = txtNombre.value;
    productos[posicion.value].precio = txtPrecio.value;
    productos[posicion.value].cantidad = txtCantidad.value;

    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("editProducto").close();
    txtNombre.value = "";
    txtPrecio.value = "";
    txtCantidad.value = "";
    cargarProductos();
}

const cargarProductos = () => {
    let posicion = 0;
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    let tbody = document.getElementById("productos");
    var tabla = "";

    productos.map((producto) => {
        tabla += `<tr class="text-center">
            <td><b>${producto.nombre.toUpperCase()}</b></td>
            <td><b>$${parseFloat(producto.precio).toFixed(2)}</b></td>
            <td><b>${producto.cantidad}</b></td>
            <td>
                <button class="btn-solid theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash-fill"></i></button>
                <button class="btn-solid theme-warning" data-bs-toggle="dialog" data-bs-target="#editProducto" onclick="editarProducto(${posicion})"><i class="bi bi-pencil-fill"></i></button>
            </td>
        </tr>`;
        posicion++;
    });

    tbody.innerHTML = tabla;
}

cargarProductos();

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn-solid theme-success mx-5',
        cancelButton: 'btn-solid theme-danger'
    },
    buttonsStyling: false
});

const eliminarProducto = (posicion) => {
    swalWithBootstrapButtons.fire({
        title: "ELIMINAR REGISTRO",
        text: "Estas seguro de eliminar este registro?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(posicion, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            cargarProductos();
            Swal.fire({ title: "EXITO!", text: "Se eliminó correctamente!", icon: "success" });
        }
    });
}

const editarProducto = (posicion) => {
    const producto = productos[posicion];
    document.getElementById("nombree").value = producto.nombre;
    document.getElementById("precioe").value = producto.precio;
    document.getElementById("cantidade").value = producto.cantidad;
    document.getElementById("posicion").value = posicion;
}