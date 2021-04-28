var map;
var marker;


function map() {
    map = L.map('map').setView([38.70736728020726, -9.152443430499575], 13);//Zoom to IADE
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=nzLBBO7atyb6b5uMflmX', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(map);
    Iade()//Marker do IADE
 
}


uniIcon = L.icon({
    iconUrl: "images/BUni.png",
    iconSize:     [25, 25], 
});

function Iade (){
    marker = L.marker([38.70738402469949, -9.152389786320123], {icon: uniIcon}).addTo(map);

}










window.onload = () => {

    map();
  

}






