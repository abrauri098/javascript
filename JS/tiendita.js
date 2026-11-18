var btnsave = document.getElementById("btnsave");
var btnEdit = document.getElementById("btnEdit");
var productos = [];


const convertirBase64 = (file) => {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    });
};


const cargarSelectCategorias = () => {
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    const selectAgregar = document.getElementById("categoria");
    const selectEditar = document.getElementById("categoriae");

    let opciones = `<option value="">-- Selecciona una categoría --</option>`;
    categorias.forEach(cat => {
    opciones += `<option value="${cat.nombre}">${cat.nombre.toUpperCase()}</option>`;});

    selectAgregar.innerHTML = opciones;
    selectEditar.innerHTML = opciones;
};

btnsave.onclick = async () => {
let txtNombre = document.getElementById("nombre");
let txtPrecio = document.getElementById("precio");
let txtCantidad = document.getElementById("cantidad");
let selCategoria = document.getElementById("categoria");
let fileImagen = document.getElementById("imagen");
if (txtNombre.value.trim() == "" || txtPrecio.value == "" || txtCantidad.value == "" || selCategoria.value == "" || fileImagen.files.length === 0) {
    Swal.fire({ title: "ERROR", text: "TODOS LOS CAMPOS SON OBLIGATORIOS", icon: "error" });
    return;
    }


const imagenBase64 = await convertirBase64(fileImagen.files[0]);

const producto = {
    nombre: txtNombre.value.trim(),
    precio: txtPrecio.value,
    cantidad: txtCantidad.value,
    categoria: selCategoria.value,
    imagen: imagenBase64
    };

    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();

    txtNombre.value = "";
    txtPrecio.value = "";
    txtCantidad.value = "";
    selCategoria.value = "";
    fileImagen.value = "";
    document.getElementById("addProducto").close();
};

btnEdit.onclick = async () => {
let txtNombre = document.getElementById("nombree");
let txtPrecio = document.getElementById("precioo");
let txtCantidad = document.getElementById("cantidade");
let selCategoria = document.getElementById("categoriae");
let fileImagen = document.getElementById("imagene");
let posicion = document.getElementById("posicion");

if (txtNombre.value.trim() == "" || txtPrecio.value == "" || txtCantidad.value == "" || selCategoria.value == "") {
    Swal.fire({ title: "ERROR", text: "CAMPOS VACÍOS", icon: "error" });
    return;
}

productos[posicion.value].nombre = txtNombre.value.trim();
productos[posicion.value].precio = txtPrecio.value;
productos[posicion.value].cantidad = txtCantidad.value;
productos[posicion.value].categoria = selCategoria.value;
if (fileImagen.files.length > 0) {
    productos[posicion.value].imagen = await convertirBase64(fileImagen.files[0]);
}

localStorage.setItem("productos", JSON.stringify(productos));
document.getElementById("editProducto").close();

txtNombre.value = "";
txtPrecio.value = "";
txtCantidad.value = "";
selCategoria.value = "";
fileImagen.value = "";
cargarProductos();
};

const cargarProductos = () => {
    let posicion = 0;
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    let tbody = document.getElementById("productos");
    var tabla = "";

    productos.map(producto => {
    let categoriaTexto = producto.categoria ? producto.categoria.toUpperCase() : "SIN CATEGORÍA";
    let imagenHTML = producto.imagen? `<img src="${producto.imagen}" alt="${producto.nombre}" width="64" height="64" style="object-fit: cover; border-radius: 6px;">`: `<span>Sin imagen</span>`;

    tabla += `<tr class="text-center align-middle">
        <td><b>${producto.nombre.toUpperCase()}</b></td>
        <td><b>$${parseFloat(producto.precio).toFixed(2)}</b></td>
        <td><b>${producto.cantidad}</b></td>
        <td><b>${categoriaTexto}</b></td>
        <td>${imagenHTML}</td>
        <td>
        <button class="btn-solid theme-danger" onclick="eliminarProducto(${posicion})">
            <i class="bi bi-trash-fill"></i>
            </button>
            <button class="btn-solid theme-warning" data-bs-toggle="dialog" data-bs-target="#editProducto" onclick="editarProducto(${posicion})">
            <i class="bi bi-pencil-fill"></i>
            </button>
        </td>
        </tr>`;
    posicion++;
    });
tbody.innerHTML = tabla;
};

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
    text: "¿Estás seguro de eliminar este registro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "SÍ",
    cancelButtonText: "NO",
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed) {
    productos.splice(posicion, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();
    Swal.fire({ title: "ÉXITO", text: "Se eliminó correctamente", icon: "success" });
    }
    });
};

const editarProducto = (posicion) => {
    cargarSelectCategorias();
    const producto = productos[posicion];
    document.getElementById("nombree").value = producto.nombre;
    document.getElementById("precioo").value = producto.precio;
    document.getElementById("cantidade").value = producto.cantidad;
    document.getElementById("categoriae").value = producto.categoria || "";
    document.getElementById("imagene").value = "";
    document.getElementById("posicion").value = posicion;
};

cargarSelectCategorias();
cargarProductos();