function Pizza(nombre, precio, ingredientes) {
    this.nombre = nombre;
    this.precio = precio;
    this.ingredientes = ingredientes;
}

function sumarTotal(pedidos) {
    let total = 0;
    for (let i = 0; i < pedidos.length; i++) {
        total += pedidos[i].precio;
    }
    return total;
}

let pizzaSimple = new Pizza("Pizza simple", 2500, ["salsa y queso"]);
let pizzaEspecial = new Pizza("Pizza especial", 2800, ["salsa", "queso", "jamón", "aceitunas", "sardinas"]);
let pizzaCalabresa = new Pizza("Pizza calabresa", 3000, ["salsa", "queso", "salame"]);

let menuPizzas = [pizzaSimple, pizzaEspecial, pizzaCalabresa];
alert("Bienvenido/a. Por favor, elija una opción de pizza:");

let pedidos = [];

while (true) {
    let mostrarOpciones = "Menú de Pizzas:\n";
    for (let i = 0; i < menuPizzas.length; i++) {
        mostrarOpciones += `${i + 1}. ${menuPizzas[i].nombre}\n`;
    }

    let pedirPizza = prompt(mostrarOpciones + "Seleccione una opción (1, 2 o 3):");

    if (pedirPizza >= 1 && pedirPizza <= 3) {
        let pizzaSeleccionada = menuPizzas[pedirPizza - 1];
        alert(`Ha seleccionado ${pizzaSeleccionada.nombre}. ¡Gracias por su pedido!\nTotal a pagar: ${pizzaSeleccionada.precio} pesos.`);

        pedidos.push(pizzaSeleccionada);

        let pedirMas = confirm("¿Desea pedir algo más?");
        if (!pedirMas) {
            break;
        }
    } else {
        alert("Opción no válida. Por favor, elija una opción válida (1, 2 o 3).");
        continue; 
    }
}

alert("Gracias por su pedido. El total a pagar es: " + sumarTotal(pedidos) + " pesos.");
