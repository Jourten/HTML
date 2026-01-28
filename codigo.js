// Variables globales
const inputProducto = document.getElementById('inputProducto');
const botonAnadir = document.getElementById('botonAnadir');
const listaCompra = document.getElementById('listaCompra');
const botonReiniciar = document.getElementById('botonReiniciar');
const mensajeListaVacia = document.getElementById('mensajeListaVacia');
const totalProductos = document.getElementById('totalProductos');
const productosComprados = document.getElementById('productosComprados');
const productosPendientes = document.getElementById('productosPendientes');

// Array para almacenar productos
let productos = [];

// Inicialización
function inicializar() {
    cargarProductosDelLocalStorage();
    actualizarInterfaz();
    agregarEventListeners();
}

// Agregar event listeners
function agregarEventListeners() {
    botonAnadir.addEventListener('click', anadirProducto);
    inputProducto.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            anadirProducto();
        }
    });
    botonReiniciar.addEventListener('click', reiniciar);
}

// Añadir producto a la lista
function anadirProducto() {
    const nombre = inputProducto.value.trim();
    
    // Validación: no permitir productos vacíos
    if (nombre === '') {
        alert('Por favor, escribe el nombre de un producto');
        inputProducto.focus();
        return;
    }

    // Crear objeto producto
    const producto = {
        id: Date.now(),
        nombre: nombre,
        comprado: false
    };

    // Agregar al array
    productos.push(producto);

    // Limpiar input
    inputProducto.value = '';
    inputProducto.focus();

    // Actualizar interfaz
    actualizarInterfaz();
    guardarProductosEnLocalStorage();
}

// Marcar producto como comprado
function marcarComprado(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        producto.comprado = !producto.comprado;
        actualizarInterfaz();
        guardarProductosEnLocalStorage();
    }
}

// Eliminar producto
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    actualizarInterfaz();
    guardarProductosEnLocalStorage();
}

// Actualizar la interfaz
function actualizarInterfaz() {
    // Limpiar lista
    listaCompra.innerHTML = '';

    // Si la lista está vacía
    if (productos.length === 0) {
        mensajeListaVacia.style.display = 'block';
        totalProductos.textContent = '0';
        productosComprados.textContent = '0';
        productosPendientes.textContent = '0';
        return;
    }

    mensajeListaVacia.style.display = 'none';

    // Renderizar cada producto
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.className = `item-producto ${producto.comprado ? 'comprado' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = producto.comprado;
        checkbox.addEventListener('change', () => marcarComprado(producto.id));

        const label = document.createElement('label');
        label.textContent = producto.nombre;

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => eliminarProducto(producto.id));

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(btnEliminar);
        listaCompra.appendChild(li);
    });

    // Actualizar contadores
    actualizarContadores();
}

// Actualizar contadores dinámicos
function actualizarContadores() {
    const total = productos.length;
    const comprados = productos.filter(p => p.comprado).length;
    const pendientes = total - comprados;

    totalProductos.textContent = total;
    productosComprados.textContent = comprados;
    productosPendientes.textContent = pendientes;
}

// Reiniciar la aplicación
function reiniciar() {
    const confirmar = confirm('¿Estás seguro de que deseas borrar toda la lista?');
    if (confirmar) {
        productos = [];
        actualizarInterfaz();
        guardarProductosEnLocalStorage();
    }
}

// Guardar en localStorage
function guardarProductosEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Cargar de localStorage
function cargarProductosDelLocalStorage() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);