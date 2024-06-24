const products = [
    { id: 1, name: "Mezcla original 200g", price: 500 },
    { id: 2, name: "Mezcla original 500g", price: 900 },
    { id: 3, name: "Mezcla especial 200g", price: 700 },
    { id: 4, name: "Mezcla especial 500g", price: 1200 }
];

const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
    const targetId = parseInt(priceElement.value);
    const product = products.find(item => item.id === targetId);
    const number = parseInt(numberElement.value);

    if (!product || isNaN(number) || number <= 0) {
        window.alert("Seleccione un producto válido y una cantidad válida.");
        return;
    }

    let purchase = {
        product: product,
        number: number,
    };

    const existingPurchaseIndex = purchases.findIndex((item) => item.product.id === purchase.product.id);
    if (existingPurchaseIndex === -1) {
        purchases.push(purchase);
    } else {
        purchases[existingPurchaseIndex].number += purchase.number;
    }

    window.alert(`Producto agregado:\n${product.name}\nCantidad: ${number}\nPrecio: ${product.price} yenes`);
    priceElement.value = "";
    numberElement.value = "";
}

function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.product.price * purchase.number;
    }, 0);
}

function display() {
    return purchases.map(purchase => {
        return `${purchase.product.name} ${purchase.product.price} yenes: ${purchase.number}\n`;
    }).join("");
}

function calcPostageFromPurchase(sum) {
    if (sum >= 3000) {
        return 0;
    } else if (sum >= 2000) {
        return 250;
    } else {
        return 500;
    }
}

function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);
    const total = sum + postage;
    const message = `Productos agregados:
    ${display()}
    \nSubtotal: ${sum} yenes
    \nTarifa de envío: ${postage} yenes
    \nTotal: ${total} yenes
    `;
    window.alert(message.trim());
    purchases = [];
    priceElement.value = "";
    numberElement.value = "";
}
