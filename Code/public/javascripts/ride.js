window.onload = function () {
  $("#rideDate").datepicker({ dateFormat: "yy/mm/dd" });
  $("#rideTime").timepicker({ timeFormat: "HH:mm", interval: 60 });
};

async function submit() {
  let rideDate = $("#rideDate").val();
  let rideTime = $("#rideTime").val();
  let passengers = $("#passengers").val();
  let start = $("#start").val();
  let matricula = $("#matricula").val();
  let Cpost = $("#Cpost").val();

  if (
    rideDate != "" &&
    rideTime != "" &&
    passengers != "" &&
    start != "" &&
    matricula != ""
  ) {
    let body = {
      DateS: rideDate,
      HourS: rideTime,
      RideS: start,
      nPassengers: passengers,
      matriculaC: matricula,
      C_id: cliente.C_id,
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
    } else {
      alert("Algo correu mal.\n Tente mais tarde.");
    }
  } else {
    alert("Por favor preencha os campos todos caralho.");
  }
}
