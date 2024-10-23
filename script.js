let productos = [];
let carrito = [];

// Cargar productos desde el archivo JSON
fetch('bebidas.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos); // Muestra todos los productos inicialmente
    })
    .catch(error => console.error('Error al cargar los productos:', error));

// Función para mostrar productos en el DOM
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productosRow');
    contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de mostrar
    productos.forEach(producto => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');
        col.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.nombre}')">Agregar al Carrito</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(col);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre) {
    const producto = productos.find(prod => prod.nombre === nombre);
    const itemEnCarrito = carrito.find(item => item.nombre === nombre);

    if (itemEnCarrito) {
        // Si el producto ya está en el carrito, solo aumentamos la cantidad
        itemEnCarrito.cantidad++;
    } else {
        // Si no está, lo agregamos con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ''; // Limpiar la lista

    let impuestoTotal = 0; // Acumular impuestos
    let totalGeneral = 0; // Acumular total

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        const impuesto = item.alcohol ? subtotal * 0.22 : subtotal * 0.10; // Calcular impuesto
        const totalItem = subtotal + impuesto; // Total por item

        // Acumular totales
        impuestoTotal += impuesto;
        totalGeneral += totalItem;

        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            ${item.nombre} - Cantidad: 
            <input type="number" value="${item.cantidad}" min="1" onchange="actualizarCantidad('${item.nombre}', this.value)" class="form-control d-inline w-25">
            - Subtotal: $${subtotal.toFixed(2)} - Impuesto: $${impuesto.toFixed(2)} - Total: $${totalItem.toFixed(2)}
        `;
        listaCarrito.appendChild(li);
    });

    // Actualizar impuestos y total
    document.getElementById('impuestos').textContent = `Impuestos Totales: $${impuestoTotal.toFixed(2)}`;
    document.getElementById('total').textContent = `Total a pagar: $${totalGeneral.toFixed(2)}`;
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(nombre, cantidad) {
    const itemEnCarrito = carrito.find(item => item.nombre === nombre);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad = parseInt(cantidad);
        actualizarCarrito(); // Actualizar el carrito
    }
}

// Filtrar productos
document.getElementById('filtrarBtn').addEventListener('click', () => {
    const filtro = document.getElementById('filtrarSelect').value;
    let productosFiltrados;

    if (filtro === 'todo') {
        productosFiltrados = productos; // Muestra todos los productos
    } else if (filtro === 'alcohol') {
        productosFiltrados = productos.filter(prod => prod.alcohol === true); // Solo alcohólicos
    } else if (filtro === 'no-alcohol') {
        productosFiltrados = productos.filter(prod => prod.alcohol === false); // Solo no alcohólicos
    }

    mostrarProductos(productosFiltrados); // Mostrar los productos filtrados
});
