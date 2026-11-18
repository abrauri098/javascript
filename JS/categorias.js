var btnsave = document.getElementById("btnsave");
var btnEdit = document.getElementById("btnEdit");
var categorias = [];

btnsave.onclick = () => {
let txtNombre = document.getElementById("nombre");
    if (txtNombre.value.trim() == "") {
    Swal.fire({ title: "ERROR", text: "EL CAMPO NOMBRE ESTÁ VACÍO", icon: "error" });
    return;
    }

const categoria = {
    nombre: txtNombre.value.trim()
    };
    categorias.push(categoria);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    cargarCategorias();
    txtNombre.value = "";
    document.getElementById("addCategoria").close();
};

btnEdit.onclick = () => {
let txtNombre = document.getElementById("nombree");
let posicion = document.getElementById("posicion");
    if (txtNombre.value.trim() == "") {
    Swal.fire({ title: "ERROR", text: "EL CAMPO NOMBRE ESTÁ VACÍO", icon: "error" });
    return;
    }
    categorias[posicion.value].nombre = txtNombre.value.trim();
    localStorage.setItem("categorias", JSON.stringify(categorias));
    document.getElementById("editCategoria").close();
    txtNombre.value = "";
    cargarCategorias();
};

const cargarCategorias = () => {
let posicion = 0;
categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let tbody = document.getElementById("categoria");
var tabla = "";

categorias.map(cat => {
    tabla += `
    <tr class="text-center align-middle">
        <td><b>${cat.nombre.toUpperCase()}</b></td>
        <td>
            <button class="btn-solid theme-danger" onclick="eliminarCategoria(${posicion})">
            <i class="bi bi-trash-fill"></i>
            </button>
            <button class="btn-solid theme-warning" data-bs-toggle="dialog" data-bs-target="#editCategoria" onclick="editarCategoria(${posicion})">
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

const eliminarCategoria = (posicion) => {
    swalWithBootstrapButtons.fire({
    title: "ELIMINAR CATEGORÍA",
    text: "¿Estás seguro de eliminar esta categoría?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "SÍ",
    cancelButtonText: "NO",
    reverseButtons: true
    }).then((result) => {
    if (result.isConfirmed) {
        categorias.splice(posicion, 1);
        localStorage.setItem("categorias", JSON.stringify(categorias));
        cargarCategorias();
        Swal.fire({ title: "ÉXITO", text: "Se eliminó correctamente", icon: "success" });
    }
    });
};

const editarCategoria = (posicion) => {
const cat = categorias[posicion];
document.getElementById("nombree").value = cat.nombre;
document.getElementById("posicion").value = posicion;
};

cargarCategorias();