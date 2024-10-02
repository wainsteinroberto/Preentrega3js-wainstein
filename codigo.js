// Constructor de productos
class Producto {
    constructor(nombre, precio, alcohol) {
        this.nombre = nombre;
        this.precio = precio;
        this.alcohol = alcohol;
    }
}

// Crear productos
const productos = [
    new Producto("Cerveza", 5, true),
    new Producto("Vodka", 15, true),
    new Producto("Vino", 12, true),
    new Producto("Agua", 2, false),
    new Producto("Jugo", 3, false),
    new Producto("Soda", 4, false),
    new Producto("Leche", 2.5, false),
    new Producto("Café", 4.5, false),
    new Producto("Té", 3.5, false),
    new Producto("Chocolate caliente", 6, false)
];

let total = 0; // Variable global
let productosSeleccionados = []; // Array global

// Mostrar productos en el DOM
const mostrarProductos = () => {
    const productosDiv = document.getElementById('productos');
    productos.forEach((producto, index) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            ${producto.nombre} - $${producto.precio} 
            <input type="number" id="cantidad-${index}" min="0" placeholder="Cantidad">
        `;
        productosDiv.appendChild(div);
    });
};

// Manejar la confirmación de la compra
document.getElementById('confirmarCompra').onclick = () => {
    total = 0; // Reiniciar total
    productosSeleccionados = []; // Reiniciar selección
    productos.forEach((producto, index) => {
        const cantidad = document.getElementById(`cantidad-${index}`).value;
        if (cantidad > 0) {
            // Verificación de edad para productos con alcohol
            if (producto.alcohol && !confirm("Has seleccionado un producto con alcohol. ¿Eres mayor de 18 años?")) {
                alert("No puedes comprar productos con alcohol.");
                return;  // Termina el proceso si no es mayor de edad
            }

            // Cálculo del subtotal
            const cantidadNumerica = parseInt(cantidad);
            const subtotal = producto.precio * cantidadNumerica;
            productosSeleccionados.push({ nombre: producto.nombre, cantidad: cantidadNumerica, subtotal: subtotal });
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

    let productosTexto = productosSeleccionados.map(prod => `${prod.cantidad} x ${prod.nombre} ($${prod.subtotal})`).join(", ");
    alert(`Has seleccionado: ${productosTexto}. El total es: $${total}`);
    document.getElementById('total').innerText = `Total a pagar: $${total}`;
    console.log("Compra realizada: ", productosTexto, " - Total: $", total);
};

// Mostrar los productos cuando se carga la página
mostrarProductos();
