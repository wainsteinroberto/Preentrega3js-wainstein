// constriuir de productos
class Producto {
    constructor(nombre, precio, alcohol) {
        this.nombre = nombre;
        this.precio = precio;
        this.alcohol = alcohol;
    }
}

// Creacionn de  productos
const productos = [
    new Producto("Cerveza", 5, true),
    new Producto("Vodka", 15, true),
    new Producto("Vino", 12, true),
    new Producto("Agua", 2, false),
    new Producto("Jugo", 3, false),
    new Producto("Soda", 4, false),
    new Producto("Leche", 2.5, false),
    new Producto("Cafe", 4.5, false),
    new Producto("Te", 3.5, false),
    new Producto("Chocolate caliente", 6, false)
];

let total = 0; // Variable global
let productosSeleccionados = []; // Array global

// Mostrar productos para el  DOM
const mostrarProductos = () => {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = ""; // Limpiar contenido previo
    productos.forEach((producto, index) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `${producto.nombre} - $${producto.precio}`;
        productosDiv.appendChild(div);
    });
};

// Funcion para buscar  producto por nombre
const buscarProducto = (nombre) => {
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
};

// Funcion para buscar y mostrar un producto
const buscarYMostrarProducto = () => {
    let nombreBusqueda = prompt("Ingresa el nombre del producto que deseas buscar:");
    if (nombreBusqueda === null || nombreBusqueda.trim() === "") {
        alert("Búsqueda cancelada o entrada inválida.");
        return;
    }

    let productoEncontrado = buscarProducto(nombreBusqueda.trim());
    if (productoEncontrado) {
        alert(`Producto encontrado: ${productoEncontrado.nombre} - $${productoEncontrado.precio}`);
    } else {
        alert("Producto no encontrado.");
    }
};

// Funcion para filtrar productos por categoria
const filtrarProductos = (categoria) => {
    if (categoria === "alcohol") {
        return productos.filter(producto => producto.alcohol);
    } else if (categoria === "no-alcohol") {
        return productos.filter(producto => !producto.alcohol);
    } else {
        return productos;
    }
};

// Funcion para mostrar productos filtrados
const mostrarProductosFiltrados = () => {
    let categoria = prompt("¿Qué categoría deseas ver? (alcohol / no-alcohol / todo)");
    if (categoria === null || categoria.trim() === "") {
        alert("Entrada inválida.");
        return;
    }

    categoria = categoria.toLowerCase().trim();
    let productosFiltrados = filtrarProductos(categoria);

    if (productosFiltrados.length === 0) {
        alert("No se encontraron productos en esta categoría.");
    } else {
        let listaProductos = productosFiltrados.map(prod => `${prod.nombre} - $${prod.precio}`).join("\n");
        alert(`Productos en la categoría "${categoria}":\n${listaProductos}`);
    }
};

// Funcion para manejar la compra usando prompt()
const realizarCompra = () => {
    total = 0; // Reiniciar total
    productosSeleccionados = []; // Reiniciar seleccion

    productos.forEach((producto, index) => {
        let cantidadStr = prompt(`¿Cuántas unidades de ${producto.nombre} deseas comprar?`, "0");
        // Validar la entrada
        if (cantidadStr === null) {
            // cancelar  prompt
            return;
        }

        let cantidad = parseInt(cantidadStr);
        if (isNaN(cantidad) || cantidad < 0) {
            alert("Por favor, ingresa una cantidad válida.");
            return;
        }

        if (cantidad > 0) {
            // Verificacion de edad 
            if (producto.alcohol) {
                let esMayor = confirm("Has seleccionado un producto con alcohol. ¿Eres mayor de 18 años?");
                if (!esMayor) {
                    alert("No puedes comprar productos con alcohol.");
                    return;
                }
            }

            // cuenta  subtotal
            const subtotal = producto.precio * cantidad;
            productosSeleccionados.push({ nombre: producto.nombre, cantidad: cantidad, subtotal: subtotal });
            total += subtotal;
        }
    });

    mostrarTotal();
};

// Mostrar total y resumen de productos seleccionados
const mostrarTotal = () => {
    if (productosSeleccionados.length === 0) {
        alert("No has seleccionado productos.");
        return;
    }

    let productosTexto = productosSeleccionados.map(prod => `${prod.cantidad} x ${prod.nombre} ($${prod.subtotal.toFixed(2)})`).join(", ");
    alert(`Has seleccionado: ${productosTexto}. El total es: $${total.toFixed(2)}`);
    document.getElementById('total').innerText = `Total a pagar: $${total.toFixed(2)}`;
    console.log("Compra realizada:", productosTexto, " - Total: $", total.toFixed(2));
};

// Inicializar la aplicación
const iniciarCompra = () => {
    mostrarProductos();
    realizarCompra();

    // Opcional: Permitir al usuario buscar o filtrar despues de la compra
    let deseaContinuar = confirm("¿Deseas realizar otra acción?");
    while (deseaContinuar) {
        let accion = prompt("¿Qué deseas hacer? (buscar / filtrar / salir)").toLowerCase().trim();

        if (accion === "buscar") {
            buscarYMostrarProducto();
        } else if (accion === "filtrar") {
            mostrarProductosFiltrados();
        } else if (accion === "salir") {
            alert("Gracias por tu compra. ¡Hasta luego!");
            break;
        } else {
            alert("Acción no reconocida. Por favor, elige 'buscar', 'filtrar' o 'salir'.");
        }

        deseaContinuar = confirm("¿Deseas realizar otra acción?");
    }
};

// Ejecutar la compra cuando se carga la pagina
window.onload = iniciarCompra;
