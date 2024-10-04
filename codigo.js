// Construir de productos
class Producto {
    constructor(nombre, precio, alcohol) {
        this.nombre = nombre;
        this.precio = precio;
        this.alcohol = alcohol;
    }
}

// Creación de productos
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

// Función para buscar producto por nombre
const buscarProducto = (nombre) => {
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
};

// Función para buscar y mostrar un producto
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

// Función para filtrar productos por categoría
const filtrarProductos = (categoria) => {
    if (categoria === "alcohol") {
        return productos.filter(producto => producto.alcohol);
    } else if (categoria === "no-alcohol") {
        return productos.filter(producto => !producto.alcohol);
    } else {
        return productos;
    }
};

// Función para mostrar productos filtrados
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

// Función para manejar la compra usando prompt()
const realizarCompra = () => {
    total = 0; // Reiniciar total
    productosSeleccionados = []; // Reiniciar selección

    productos.forEach((producto) => {
        let cantidadStr = prompt(`¿Cuántas unidades de ${producto.nombre} deseas comprar?`, "0");
        // Validar la entrada
        if (cantidadStr === null) {
            // cancelar prompt
            return;
        }

        let cantidad = parseInt(cantidadStr);
        if (isNaN(cantidad) || cantidad < 0) {
            alert("Por favor, ingresa una cantidad válida.");
            return;
        }

        if (cantidad > 0) {
            // Verificación de edad 
            if (producto.alcohol) {
                let esMayor = confirm("Has seleccionado un producto con alcohol. ¿Eres mayor de 18 años?");
                if (!esMayor) {
                    alert("No puedes comprar productos con alcohol.");
                    return;
                }
            }

            // Cuenta subtotal
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
    console.log("Compra realizada:", productosTexto, " - Total: $", total.toFixed(2));
};

// Inicializar la aplicación
const iniciarCompra = () => {
    // Pregunta al usuario si quiere buscar, filtrar o realizar una compra
    let opcion = prompt("¿Qué deseas hacer? (comprar / buscar / filtrar / salir)");

    while (opcion !== null && opcion.toLowerCase() !== "salir") {
        if (opcion.toLowerCase() === "comprar") {
            realizarCompra();
        } else if (opcion.toLowerCase() === "buscar") {
            buscarYMostrarProducto();
        } else if (opcion.toLowerCase() === "filtrar") {
            mostrarProductosFiltrados();
        } else {
            alert("Opción no reconocida. Por favor, elige 'comprar', 'buscar', 'filtrar' o 'salir'.");
        }

        opcion = prompt("¿Qué deseas hacer? (comprar / buscar / filtrar / salir)");
    }

    alert("Gracias por tu compra. ¡Hasta luego!");
};

// Ejecutar la compra cuando se carga la página
window.onload = iniciarCompra;
