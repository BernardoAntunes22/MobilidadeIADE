var map;
var marker;

function map() {
  map = L.map("map").setView([38.70736728020726, -9.152443430499575], 13); //Zoom to IADE
  L.tileLayer(
    "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=nzLBBO7atyb6b5uMflmX",
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }
  ).addTo(map);
  
}

uniIcon = L.icon({
  iconUrl: "images/BUni.png",
  iconSize: [50, 50],
});

rideIcon = L.icon({
  iconUrl: "images/CarS.png",
  iconSize:     [75, 50], 
});

function Iade() {
  marker = L.marker([38.70738402469949, -9.152389786320123], {
    icon: uniIcon,
  }).addTo(map);
}



async function rideMarkers(){
  rides = await $.ajax({
      url:"/API/rides",
      method: "get",
  });
  for (var idx in rides) {
      let ride = rides[idx];
      L.marker({lat: ride.R_lat, lon: ride.R_long}, {icon: rideIcon}).bindPopup(`<p>Date: ${getDate(ride.DateS)}</p><p>Time: ${ride.HourS}</p><p>Lugares: ${ride.nPassengers}</p><p>Marca: ${ride.R_car}</p><p>Modelo: ${ride.R_model}</p><p>Matricula: ${ride.matriculaC}</p><button id= "reserva" onclick="mostralocalizacao(${idx})">Participar</button>`).addTo(map);
  }
}

function mostralocalizacao(idx) {
  sessionStorage.setItem("ride", JSON.stringify(rides[idx]));
  window.location = "reserva.html";
}



window.onload = () => {
  map();
  Iade();
  rideMarkers();
};

function getDate(data) {
  return data.substring(data.indexOf('T'), -1);
}