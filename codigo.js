let cantidad = prompt("¿Cuántas unidades de " + productoSeleccionado.nombre + " quieres comprar?");

cantidad = parseInt(cantidad);

let subtotal = productoSeleccionado.precio * cantidad;

total += subtotal;

let productosTexto = productosSeleccionados.map(prod => prod.cantidad + " x " + prod.nombre + " ($" + prod.subtotal + ")").join(", ");
alert("Has seleccionado: " + productosTexto + ". El total es: $" + total);

