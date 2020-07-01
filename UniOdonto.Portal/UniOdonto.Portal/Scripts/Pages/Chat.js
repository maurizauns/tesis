const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub").build();


connection.on("ReceiveMesage", (user, message) => {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const fecha = new Date().toLocaleTimeString();
    const mensajeAMostrar = fecha + "<strong>" + user + "</strong>" + msg;
    const li = document.createElement("li");
    li.innerHTML = mensajeAMostrar
    document.getElementById("mensajsList").appendChild(li);
});

connection.start().catch(err=>console.error(err.toString()));

document.getElementById("sendButton").addEventListener("click", event=> {
    const user = document.getElementById("userInput").value;
    const mesage = document.getElementById("messageInout").value;
    connection.invoke("SendMessage", user, mesage).catch(err=>console.error(err.toString()));
});