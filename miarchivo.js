function Pizza(nombre, precio, ingredientes) {
    this.nombre = nombre;
    this.precio = precio;
    this.ingredientes = ingredientes;
}

function Orden(pizza, cantidad) {
    this.pizza = pizza;
    this.cantidad = cantidad;
}

let PizzaMorrones = new Pizza("Pizza de morrones", 4500, ["salsa", "queso", "morrones"]);
let PizzaRucula = new Pizza("Pizza de rucula", 5000, ["salsa", "queso", "rucula"]);
let PizzaEspecial = new Pizza("Pizza especial", 4500, ["salsa", "queso muzarella", "aceitunas", "tomates", "jamon"]);
let PizzaClasica = new Pizza("Pizza clasica", 3500, ["salsa", "queso"]);
let PizzaAceitunas = new Pizza("Pizza con aceitunas", 4000, ["salsa", "queso", "aceitunas"]);
let Pizza4Quesos = new Pizza("Pizza 4 quesos", 5500, ["salsa", "queso roquefort", "queso parmesano", "queso mozzarella", "queso crema"]);

let menuPizzas = [PizzaMorrones, PizzaRucula, PizzaEspecial, PizzaClasica, PizzaAceitunas, Pizza4Quesos];
let pedidos = [];

let menuContainer = document.getElementById('menu-container');

let ordenContainer = document.getElementById('orden-container');

let totalContainer = document.getElementById('total-container');

mostrarMenu();

function mostrarMenu() {
    menuContainer.innerHTML = "<h2>Menú de Pizzas:</h2>";
    for (let i = 0; i < menuPizzas.length; i++) {
        let pizzaOption = document.createElement('button');
        pizzaOption.textContent = `${menuPizzas[i].nombre} - ${menuPizzas[i].precio} pesos`;
        pizzaOption.addEventListener('click', () => {
            agregarPedido(menuPizzas[i]);
        });
        menuContainer.appendChild(pizzaOption);
    }
}

function agregarPedido(pizza) {
    let ordenExistente = pedidos.find(item => item.pizza.nombre === pizza.nombre);
    if (ordenExistente) {
        ordenExistente.cantidad += 1;
    } else {
        let nuevaOrden = new Orden(pizza, 1);
        pedidos.push(nuevaOrden);
    }
    mostrarOrden();
    mostrarTotal();
}

function mostrarOrden() {
    ordenContainer.innerHTML = "<h2>Tu Orden:</h2>";
    for (let i = 0; i < pedidos.length; i++) {
        let ordenItem = document.createElement('p');
        ordenItem.textContent = `${pedidos[i].cantidad} x ${pedidos[i].pizza.nombre} - ${pedidos[i].pizza.precio * pedidos[i].cantidad} pesos`;
        ordenContainer.appendChild(ordenItem);
    }
}

function mostrarTotal() {
    let total = pedidos.reduce((acc, item) => acc + item.pizza.precio * item.cantidad, 0);
    totalContainer.textContent = total;
}