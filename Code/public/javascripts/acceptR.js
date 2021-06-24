let ride;
let today = new Date().toISOString().slice(0, 10)
async function createCards() {
    let main = document.getElementById('ride');
    ride = JSON.parse(sessionStorage.getItem("ride"));
    let rides = await $.ajax({
        url: "/API/participars/info/" + ride,
        method: "get",
        dataType: "json"
    });
    console.log(rides)
    for (let idx in rides) {  
        main.innerHTML += showInformation(rides[idx]);
    }
}

function showInformation(ride) {
    let html = "";
        html += `<div id="information" onclick = "change(${ride.P_id})">
        <h5>PickUP</h5>
        <h5>Name</h5>
        <h5>Telemóvel</h5>
        <h5 id="rideI">${ride.P_lat}, ${ride.P_long}</h5>
        <h5 id="rideI">${ride.C_Name}</h5>
        <h5 id="rideI">${ride.C_telemovel}</h5>
        <input type="button" class="btn" value="Aceitar" onclick="aceitar()" /><br>
        <input type="button" class="btn" value="Recusar" onclick="recusar()" />
      </div>`;
    return html;
}


window.onload = () => {
    createCards();   
}

function change(id) {
    sessionStorage.setItem('id', JSON.stringify(id));
    console.log(id);
    
}

async function aceitar(){
    let body = {
        P_estado: 'Aceite-pendente',
        P_date: today
    }
    id = JSON.parse(sessionStorage.getItem("id"));
    let res = await $.ajax({
        type: "PUT",
        url: '/api/participars/' + id,
        data: JSON.stringify(body),
        contentType: "application/json"
    });
    alert('Ride Accepted')
}

async function recusar(){
    let body = {
        P_estado: 'Cancelada',
        P_date: today
    }
    id = JSON.parse(sessionStorage.getItem("id"));
    let res = await $.ajax({
        type: "PUT",
        url: '/api/participars/' + id,
        data: JSON.stringify(body),
        contentType: "application/json"
    });
    alert('Ride Rejected')
}

function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}

