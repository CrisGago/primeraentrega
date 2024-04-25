const socket = io();

function $(selector) {
    return document.querySelector(selector);
}

socket.on('statusError', data => {
    console.log(data);
    alert(data);
});

socket.on('publishProducts', data => {
    $('.products-box').innerHTML = '';

    let html = '';
    data.forEach(products => {
        html += `<div class="product-card">
                    <h3>${products.title}</h3>
                    <hr>
                    <p>Categoria: ${products.category}</p>
                    <p>Descripción: ${products.description}</p>
                    <p>Precio: $ ${products.price}</p>
                    <button id="button-delete" onclick="deleteProduct(${products.id})">Eliminar</button>
                </div>`;
    });

    $('.products-box').innerHTML = html;
});

function addProduct(event) {
    event.preventDefault();
    const newProduct = {
        title: $('#title').value,
        description: $('#description').value,
        code: $('#code').value,
        price: $('#price').value,
        stock: $('#stock').value,
        category: $('#category').value
    }

    cleanForm();

    socket.emit('add', newProduct);
}

function deleteProduct(pid) {
    socket.emit('deleteProduct', { pid });
}

function cleanForm() {
    $('#title').value = '';
    $('#description').value = '';
    $('#code').value = '';
    $('#price').value = '';
    $('#stock').value = '';
    $('#category').value = '';
}
//aquí comienza el chat...
//const socket = io();

let user;
let chatBox = document.querySelector("#chatBox");
let messagesLogs = document.querySelector("#messagesLogs");

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario para identificarte en el CoderChat",
    inputValidator: (value) => {
        return !value && "Necesitas identificarte para continuar!"
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value;
    console.log(`Tu Nombre de usuario es ${user}`);

    socket.emit("userConnect", user);
});

chatBox.addEventListener("keypress", e =>{
    if (e.key == "Enter") {
        if (chatBox.value.trim().length > 0) {
            console.log(`Mensaje: ${chatBox.value}`);
            socket.emit("message", {
                user,
                message: chatBox.value
            });
            chatBox.value = "";
        }
    }
});
socket.on("messagesLogs", data => {
    let messages = "";
    data.forEach(chat =>{
        messages += `${chat.user}: ${chat.message} </br>`;
    });
    messagesLogs.innerHTML = messages;
});

socket.on("newUser", data =>{
    Swal.fire({
        text: `${data} se ha unido al chat`,
        toast: true,
        position: "top-right"
    });
});