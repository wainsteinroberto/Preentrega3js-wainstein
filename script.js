let productos = []; // array global para almacenar los productos
let carrito = []; // arreglo para almacenar productos seleccionados

// carga de productos desde el archivo JSON
const cargarProductos = async () => {
    try {
        const response = await fetch('data/bebidas.json'); // 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productos = await response.json();
        mostrarProductos(productos); // mostrar todos los productos al cargar
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

// f para mostrar productos en el DOM
const mostrarProductos = (listaProductos) => {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = ""; // clean del contenedor

    // creación del HTML para cada producto
    listaProductos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.className = "producto";
        divProducto.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <p>${producto.alcohol ? 'Contiene alcohol' : 'Sin alcohol'}</p>
            <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar</button>
        `;
        contenedor.appendChild(divProducto);
    });
};

// search  products for name
const buscarProductos = () => {
    const nombre = document.getElementById("buscarInput").value.toLowerCase();
    const productosBuscados = productos.filter(producto => producto.nombre.toLowerCase().includes(nombre));
    mostrarProductos(productosBuscados);
};

//  filtrar  por categoría
const filtrarProductos = () => {
    const categoria = document.getElementById("filtrarSelect").value;
    let productosFiltrados = [];

    if (categoria === "todo") {
        productosFiltrados = productos;
    } else if (categoria === "alcohol") {
        productosFiltrados = productos.filter(producto => producto.alcohol);
    } else if (categoria === "no-alcohol") {
        productosFiltrados = productos.filter(producto => !producto.alcohol);
    }

    mostrarProductos(productosFiltrados);
};

// función para incluir un producto al carrito
const agregarAlCarrito = (nombre) => {
    const producto = productos.find(prod => prod.nombre === nombre);
    if (producto) {
        if (producto.alcohol) {
            mostrarModalEdad(producto);
        } else {
            carrito.push(producto);
            guardarCarritoEnStorage();
            actualizarCarrito();
        }
    }
};

// función para mostrar el modal de confirmación de edad
const mostrarModalEdad = (producto) => {
    const modal = document.getElementById("modalEdad");
    modal.style.display = "block";

    document.getElementById("confirmarEdadBtn").onclick = () => {
        carrito.push(producto);
        guardarCarritoEnStorage();
        actualizarCarrito();
        modal.style.display = "none";
    };

    document.getElementById("rechazarEdadBtn").onclick = () => {
        alert("Pibe, tener que tener mas de 18 años para comprar productos con alcohol.");
        modal.style.display = "none";
    };
};

// función para cerrar el modal si se hace clic fuera de él
window.onclick = (event) => {
    const modal = document.getElementById("modalEdad");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// función para guardar el carrito en LocalStorage
const guardarCarritoEnStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// función para actualizar la lista del carrito y el total a pagar
const actualizarCarrito = () => {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = ""; // Limpiar la lista actual

    let totalCarrito = 0;

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
        totalCarrito += producto.precio;
    });

    document.getElementById("total").textContent = `Total a pagar: $${totalCarrito.toFixed(2)}`; // Actualiza el total
};

// función para realizar la compra
const realizarCompra = () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert(`Compra realizada con éxito. Total: $${document.getElementById("total").textContent.split('$')[1]}`);
    carrito = []; // Vaciar carrito
    guardarCarritoEnStorage(); // Actualizar LocalStorage
    actualizarCarrito(); // Actualizar vista
};

// carga la página
const iniciarCompra = () => {
    cargarProductos(); // Cargar productos al iniciar
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }

    // Agregar eventos a los botones de búsqueda y filtrado
    document.getElementById("buscarBtn").addEventListener("click", buscarProductos);
    document.getElementById("filtrarBtn").addEventListener("click", filtrarProductos);
    document.getElementById("finalizarCompraBtn").addEventListener("click", realizarCompra);
};

// ejecutar  carga de página
window.onload = iniciarCompra;
