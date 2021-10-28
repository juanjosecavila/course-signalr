import * as signalR from "@microsoft/signalr";
import { CustomLogger } from "./customLogger";

var counter = document.getElementById("viewCounter");
let btn = document.getElementById("btnGetFullName");

// create connection
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub/view")
    .build();

// on view update message from client
connection.on("viewCountUpdate", (value: number) => {
    counter.innerText = value.toString();
});

// notify server we're watching
function notify(){
    connection.send("notifyWatching");
}

btn.addEventListener("click", function (evt) {
    var firstName = (document.getElementById("inputFirstName") as HTMLInputElement).value;
    var lastName = (document.getElementById("inputLastName") as HTMLInputElement).value;
    console.log(111);
    
    connection
        .invoke("getFullName", firstName, lastName)
        .then((name: string) => { alert(name); });
});

// start the connection
function startSuccess(){
    console.log("Connected.");
    notify();
}
function startFail(){
    console.log("Connection failed.");
}

connection.start().then(startSuccess, startFail);