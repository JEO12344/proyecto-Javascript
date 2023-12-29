function Pizza(nombre, precio, ingredientes) {
    this.nombre = nombre;
    this.precio = precio;
    this.ingredientes = ingredientes;
}

function Orden(pizza, cantidad) {
    this.pizza = pizza;
    this.cantidad = cantidad;
}

let menuPizzas = [];
let pedidos = [];

let menuContainer = document.getElementById('menu-container');
let ordenContainer = document.getElementById('orden-container');
let totalContainer = document.getElementById('total-container');

fetch('menuPizzas.json')
    .then(response => response.json())
    .then(data => {
        menuPizzas = data;
        mostrarMenu(); 
    })
    .catch(error => console.error('Error cargando el menú:', error));

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
let borrarOrdenButton = document.getElementById('borrar-orden');
borrarOrdenButton.addEventListener('click', borrarOrden);

function borrarOrden() {
    pedidos = [];
    mostrarOrden();
    mostrarTotal();
}
let confirmarOrdenButton = document.getElementById('confirmar-orden');
confirmarOrdenButton.addEventListener('click', confirmarOrden);

function confirmarOrden() {
    mostrarAgradecimiento();
}

function mostrarAgradecimiento() {
    return new Promise((resolve, reject) => {
        swal({
            title: "¿Estás seguro/a de las opciones seleccionadas?",
            text: "Una vez confirmado tu pedido empezará a prepararse",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Tu pedido ha sido confirmado. Estará listo en breve.", {
                    icon: "success",
                })
                .then(() => {
                    setTimeout(() => {
                        resolve('Tu pizza está lista. Puedes pasar a retirarla.');
                    }, 11000); 
                });
            } else {
                swal("Tu pedido ha sido cancelado");
                reject('Pedido cancelado');
            }
        });
    });
}

