const socket = io();

let user;
let chatBox = document.querySelector("#chatBox");
let messagesLogs = document.querySelector("#messagesLogs");

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario tu usuario",
    inputValidator: (value) => {
        return !value && "Necesitas identificarte para continuar!"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    console.log(`Tu Nombre de usuario es ${user}`);

    socket.emit("userConnect", user, (response) => {
        if (response.success) {
            Swal.fire({
                text: `Te has conectado como ${user}`,
                icon: "success"
            });
        } else {
            Swal.fire({
                text: `Hubo un error al conectarse. Por favor, intenta nuevamente.`,
                icon: "error"
            });
        }
    });
});

chatBox.addEventListener("keypress", e => {
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
    try {
        let messages = "";
        data.forEach(messages => {
            messages += `${messages.user}: ${messages.message} </br>`;
        });
        messagesLogs.innerHTML = messages;
    } catch (error) {
        console.error("Error al procesar los mensajes:", error);
    }
});

socket.on("newUser", data => {
    Swal.fire({
        text: `${data} se ha unido al chat`,
        toast: true,
        position: "top-right"
    });

});