let totalcompra = 150; // Ejemplo de total de compra
if (totalcompra >= 50) {
    let descuento = totalcompra * 0.1; // 10% de descuento
    let totalconDescuento = totalcompra - descuento;
    console.log("Total con descuento: " + totalconDescuento);
} else {
    console.log("No hay descuento");
}