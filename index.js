const { Server } = require('ws');
 
const sockserver = new Server({ port: 9982 });
sockserver.on('connection', (ws) => {
   console.log('New client connected!'); 
   ws.on('close', () => console.log('Client has disconnected!'));
});

let x = 0;


let time = setInterval(() => {
   x+=10;
   sockserver.clients.forEach((client) => {

    let arr = [
    {
        "name" : "Thomas_Edison",
        "x" : x,
        "y" : 10.0,
        "ping" : 20,
        "money" : 1000,
        "bank" : 1000,
        "level" : 29,
        "admin" : true,
        "state" : "OnFoot"
    },
    {
        "name" : "Thomas_Edison2",
        "x" : 10.0,
        "y" : x,
        "ping" : 20,
        "money" : 1000,
        "bank" : 1000,
        "level" : 29,
        "admin" : true,
        "state" : "OnFoot"
    }
    ]
    const data = JSON.stringify( arr );
    client.send(data);
   });
}, 700);

setTimeout(() => {
    X();
    console.log("Clear");
}, 1000 * 7)

function X() {
    setInterval(() => {
        x+=10;
        sockserver.clients.forEach((client) => {
    
        let arr = [
        {
            "name" : "Thomas_Edison2",
            "x" : 10.0,
            "y" : x,
            "ping" : 20,
            "money" : 1000,
            "bank" : 1000,
            "level" : 29,
            "admin" : true,
            "state" : "OnFoot"
        }
        ]
        const data = JSON.stringify( arr );
        client.send(data);
        });
    }, 700);
    clearInterval(time);
}