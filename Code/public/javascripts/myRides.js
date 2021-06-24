async function createCards() {
    let main = document.getElementById('ride');
    let user = JSON.parse(sessionStorage.getItem("conta"));
    let rides = await $.ajax({
        url: "/API/rides/getById/" + user.C_id,
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
        html += `<div id="information" onclick = "change(${ride.Ride_id})">
        <h5>Start</h5>
        <h5>Day</h5>
        <h5>Hour</h5>
        <h5 id="rideI">${ride.R_lat}, ${ride.R_long}</h5>
        <h5 id="rideI">${getDate(ride.DateS)}</h5>
        <h5 id="rideI">${ride.HourS}</h5>
      </div>
    </div>`;
    return html;
}


window.onload = () => {
    createCards();   
}

function change(id) {
    sessionStorage.setItem('ride', id);
    window.location = 'acceptR.html';
}

function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}

