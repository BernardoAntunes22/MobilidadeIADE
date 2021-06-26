let today = new Date().toISOString().slice(0, 10)

async function createCards() {
    let main = document.getElementById('ride');
    let user = JSON.parse(sessionStorage.getItem("conta"));
    let rides = await $.ajax({
        url: "/API/participars/getRideById/" + user.C_id,
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
        <h5>Start</h5>
        <h5>Day</h5>
        <h5>Hour</h5>
        <h5 id="rideI">${ride.R_lat}, ${ride.R_long}</h5>
        <h5 id="rideI">${getDate(ride.DateS)}</h5>
        <h5 id="rideI">${ride.HourS}</h5>
        <input type="button" class="btn" value="Aceitar" onclick="aceitar()" /><br>
        <input type="button" class="btn" value="Recusar" onclick="recusar()" />
      </div>
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
        P_estado: 'Aceite-confirmado',
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