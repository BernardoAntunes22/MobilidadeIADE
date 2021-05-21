let parsed; 
let user;

window.onload = function () {
  user = JSON.parse(sessionStorage.getItem("conta"));
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
};

function parseData(data) { 
  parsed = []
  for(let item of data.features) {
    let obj = {};
    obj.label = item.place_name;
    obj.value = `[${item.center[0]}, ${item.center[1]}]`;
    parsed.push(obj)
  }
  return parsed;
}





async function submit() {

  let rideDate = $("#rideDate").val();
  let rideTime = $("#rideTime").val();
  let passengers = $("#passengers").val();
  let matricula = $("#matricula").val();
  let marca = $('#car').val();
  let modelo = $('#model').val();
  let coo = $("#start").val();

  
  if (
    rideDate != "" &&
    rideTime != "" &&
    passengers != "" &&
    coo != "" &&
    matricula != ""&&
    marca != ""&&
    modelo != ""
  ) {
    coo = coo.toString().replace('[', '');
    coo = coo.replace(']', '');
    coo = coo.replace(' ', '')
    coo = coo.split(',');
    console.log(coo)

    let body = {
      DateS: rideDate,
      HourS: rideTime,
      R_lat: coo[1],
      R_long: coo[0],
      nPassengers: passengers,
      matriculaC: matricula,
      R_car: marca,
      R_model: modelo,
      C_id: user.C_id,
    };

    let res = await $.ajax({
      type: "POST",
      url: "/api/rides",
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
