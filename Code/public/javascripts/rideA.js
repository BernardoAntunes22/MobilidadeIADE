let ride;
let today = new Date().toISOString().slice(0, 10)
async function createCards() {
    let main = document.getElementById('ride');
    let user = JSON.parse(sessionStorage.getItem("conta"));
    ride = JSON.parse(sessionStorage.getItem("ride"));
    let rides = await $.ajax({
        url: "/API/participars/accept/" + user.C_id,
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
        html += `<div id="information">
        <h5>PickUP</h5>
        <h5>Name</h5>
        <h5>Telemóvel</h5>
        <h5 id="rideI">${ride.P_lat}, ${ride.P_long}</h5>
        <h5 id="rideI">${ride.C_Name}</h5>
        <h5 id="rideI">${ride.C_telemovel}</h5>
      </div>`;
    return html;
}


window.onload = () => {
    createCards();   
}


function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}

