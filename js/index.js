let map; // Map Identifier

let player;  // This is dynamic data, so this can be channged.
let size = 0;
let internalData = [];
function createInfo(id)
{
    var p_windows = new google.maps.InfoWindow({
        content: `<p>${player[id].name} <b>(ID: ${id})</b><br/><br/>Data:<br/>Ping: ${player[id].ping}<br/>Level: ${player[id].level}<br/>Money: ${player[id].money}<br/>Bank: ${player[id].bank}</p>`
    });

    var p_marker = new google.maps.Marker({
        position: SanMap.getLatLngFromPos(player[id].x, player[id].y),
        map: map,
        icon: player[id].state != "OnVehicle" ? player[id].admin == false ? "assets/icon58.gif" : "assets/icon60.gif" : "assets/icon55.gif",
    });

    google.maps.event.addListener(p_marker, 'click', function() {
        p_windows.open(map,p_marker);
    });

    internalData.push({
        "id" : id,
        "marker" : p_marker,
        "window" : p_windows
    });
}

function deleteInfo()
{
    for (let id = 0; id < internalData.length; id++) {
        let infoWindow = internalData[id].window;
        google.maps.event.clearInstanceListeners(infoWindow);  // just in case handlers continue to stick around
        infoWindow.close();
        internalData[id].marker.setMap(null);
    }
}

function initMap() {

    let mapType = new SanMapType(0, 4, function (zoom, x, y) {
        return x == -1 && y == -1 
        ? "https://sanmap.ikkentim.com/tiles/sanandreas.blank.png" 
        : "https://sanmap.ikkentim.com/tiles/sanandreas." + zoom + "." + x + "." + y + ".png";//Where the tiles are located
    });
    
    map = SanMap.createMap(document.getElementById('map-canvas'), {'Map': mapType});
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('map-legend'));
}

let socket = new WebSocket("ws://localhost:9982/player");

socket.onmessage = event => {
    console.log(event.data);
    let newsize = Object.keys(JSON.parse(event.data)).length;
    if(size != newsize)
    {
        deleteInfo();
        player = []; // Reset the player array
        internalData = [];
        size = newsize;
    }
    console.log("Size : ", size);
    player = JSON.parse(event.data);
    console.log(player);
    for (var i = 0; i < Object.keys(player).length; i++) {
        if (internalData[i] == undefined) {
            createInfo(i); // If New ID Come out
        } else {
            internalData[i].marker.setPosition(SanMap.getLatLngFromPos(player[i].x, player[i].y));
            internalData[i].marker.setIcon(player[i].state != "OnVehicle" ? player[i].admin == false ? "assets/icon58.gif" : "assets/icon60.gif" : "assets/icon55.gif");
        }
    }
}