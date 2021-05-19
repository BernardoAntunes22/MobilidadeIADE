let user;
let ride;

async function createCards() {
    let main = document.getElementById('information');
    user = JSON.parse(sessionStorage.getItem("conta"));
    ride = JSON.parse(sessionStorage.getItem("ride"));
    let rides = await $.ajax({
        url: "/API/rides/getByRide/" + ride.Ride_id,
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
        html += `          
        <p>Data</p>
        <p>Hour</p>
        <p>Start</p>
        <p class="DB">${getDate(ride.DateS)}</p>
        <p class="DB">${ride.HourS}</p>
        <p class="DB">${ride.R_lat}, ${ride.R_long}</p>
        <p>Number of seats</p>
        <p>Matricula</p>
        <p>State</p>
        <p class="DB">${ride.nPassengers}</p>
        <p class="DB">${ride.matriculaC}</p>
        <p class="DB">${ride.rState}</p>`;
    return html;
}

function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}
window.onload = function(){
    createCards();

    $("#rideDate").datepicker({ dateFormat: "yy/mm/dd" });
    $("#rideTime").timepicker({ timeFormat: "HH:mm", interval: 60 });
  
    $( "#start" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${request.term}.json?access_token=pk.eyJ1IjoibWN2aXR6eiIsImEiOiJja2tpdDcwZHUxcXR4Mm5tbnpoY3JwcXZ1In0.AVRKDMASEL6fSFbPRFXw7w`,
          dataType: "json",
          success: function( data ) {
            response( parseData(data) );
          }
        });
      },
      minLength: 4,
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });
}
  
function parseData(data) {
    let parsed = [];  
    for(let item of data.features) {
      let obj = {};
      obj.label = item.place_name;
      obj.value = `[${item.center[0]}, ${item.center[1]}]`;
      parsed.push(obj)
    }
    return parsed;
  }

  async function submit() {


    let coo = $("#start").val();
  
    
    if (
      coo != "" 
    ) {
      coo = coo.toString().replace('[', '');
      coo = coo.replace(']', '');
      coo = coo.replace(' ', '')
      coo = coo.split(',');
      console.log(coo)
  
      let body = {
        P_lat: coo[1],
        P_long: coo[0],
        C_id: user.C_id,
        Ride_id: ride.Ride_id
      };
  
      let res = await $.ajax({
        type: "POST",
        url: "/api/participars",
        data: JSON.stringify(body),
        dataType: "json",
        contentType: "application/json",
      });
      if (res.insertId) {
        alert("Reserva feita!");
        window.location = "home.html";
      } else {
        alert("Algo correu mal.\n Tente mais tarde.");
      }
    } else {
      alert("Por favor preencha os campos todos caralho.");
    }
  }