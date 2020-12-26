class Map {
  constructor() {
    this.mymap = L.map("mapId").setView([45.764, 4.8357], 13);
    this.tileStreet = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiY2xhcmlsbG9uIiwiYSI6ImNqdnRjbXoxbDBrMmQ0OXA0d3B6aGN5NHEifQ.3s6qFv2klCkw9Qm4dQP9RA",
      }
    );
    this.tileStreet.addTo(this.mymap);
    this.nameMarker = document.getElementById("name_location");
    this.infoMarker = document.getElementById("info");
    this.bikeMaker = document.getElementById("bikes");
    this.status_stationMaker = document.getElementById("status_station");

    this.bookingMarker = document.getElementById("booking");
    this.formMarker = document.getElementById("form");
    this.bikesAvailableMarker = document.getElementById("bikes0available");
    this.bookingDetail = document.getElementById("booking_detail");
    this.canvasSig = document.getElementById("sig-canvas");
    this.noAvailableBike = document.getElementById("noAvailableBike");
    this.confirmationBooking = document.getElementById("confirmation");
    this.showMap();
    this.showBooking();
  } //fin constructor

  showMap() {
    var that = this;
    ajaxGet(
      "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=11286d703cd72dac885956a1f481ce0ad70098a4",
      function (response) {
        let stations = JSON.parse(response); //CONVERTIR TEXTE JSON EN VARIABLE : tableau objet qui contient tt les infos
        stations.forEach(function (station) {
          // creation objet pour marker color
          let IconByke = L.Icon.extend({
            color: {
              iconSize: [30, 30],
            },
          });
          // couleurs icons
          let iconGreen = new IconByke({
            iconUrl: "images/marker_green.png",
          });
          let iconRed = new IconByke({
            iconUrl: "images/marker_red.png",
          });

          // initialiser variable let iconDisplay pour l'utiliser dans condition
          let iconDisplay = "";

          if (station.statut === "CLOSED" || station.available_bikes === 0) {
            iconDisplay = iconRed;
          } else {
            iconDisplay = iconGreen;
          }

          var marker = L.marker([station.position.lat, station.position.lng], {
            icon: iconDisplay,
          }).addTo(that.mymap);

          marker.on("click", function (e) {
            if (station.available_bikes == 0 || station.statut === "CLOSED") {
              that.noBooking();
            } else {
              that.showBooking();

              that.nameMarker.innerHTML = station.name;
              that.infoMarker.innerHTML = station.address;
              that.bikeMaker.innerHTML = station.available_bikes;
              that.status_stationMaker.innerHTML = station.status;
              //permettre d'enregistrer les données dans sessionstorage
              sessionStorage.setItem("stationsName", station.name);
              sessionStorage.setItem("stationsAddress", station.address);
              sessionStorage.setItem("stationsBike", station.available_bikes);
              sessionStorage.setItem("stationsStatus", station.status);
            }
          }); //fin de addeventlistener
        }); //fin de foreach
      }
    ); //fin de reponse
  } //finde showmap

  noBooking() {
    this.noAvailableBike.style.display = "block";
    this.bookingDetail.style.display = "none";
    this.confirmationBooking.style.display = "none";
    this.formMarker.style.display = "none";
    this.canvasSig.style.display = "none";
  } //fin de showBooking

  showBooking() {
    var that = this;
    that.noAvailableBike.style.display = "none";
    that.bookingMarker.style.backgroundColor = "rgba(78, 149, 173, 0.3)";
    that.bookingDetail.style.display = "block";
    that.formMarker.style.display = "block";
  }
} //fin map

let map = new Map();
