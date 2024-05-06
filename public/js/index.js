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

function deleteProduct(productId) {
    socket.emit('deleteProduct', { pid: productId });
}

function cleanForm() {
    $('#title').value = '';
    $('#description').value = '';
    $('#code').value = '';
    $('#price').value = '';
    $('#stock').value = '';
    $('#category').value = '';
};