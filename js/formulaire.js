//declaration variable globale

var timer_handle = 0;

let formulaire = {
  name: document.getElementById("name"),
  firstName: document.getElementById("firstName"),
  send_form: document.getElementById("send_form"),
  field: document.getElementsByClassName("field"),
  mistake: document.getElementById("mistake"),
  confirmation: document.getElementById("confirmation"),
  confirmation_booking: document.getElementById("confirmation_booking"),
  cancel_booking: document.getElementById("cancel_booking"),
  inProgressPara1: document.getElementById("inProgressPara1"),
  inProgressPara3: document.getElementById("inProgressPara3"),
  canvas: document.getElementById("sig-canvas"),

  sendForm: function () {
    formulaire.send_form.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        formulaire.field[0].value.length < 2 ||
        formulaire.field[1].value.length < 2
      ) {
        // si le champ est vide
        formulaire.mistake.style.display = "block"; // on affiche le message d'erreur
        formulaire.canvas.style.display = "none";
        formulaire.name.style.color = "red";
        formulaire.firstName.style.color = "red";
        formulaire.confirmation.style.display = "none";
        return false;
      } else {
        formulaire.confirmation.style.display = "block"; // on affiche la div confirmation
        formulaire.mistake.style.display = "none"; // on annule le message d'erreur
        formulaire.send_form.style.display = "block";
        formulaire.canvas.style.display = "block";
        formulaire.name.style.color = "green";
        formulaire.firstName.style.color = "green";
      } //fin de if
      // puis on lance la fonction de vérification sur tous les champs :
      if (formulaire.firstName.value === "") {
        //si il esiste pas on fait un return false
        return false;
      } else {
        ////recuperer et stocke les info du formulaire dans local storage

        key = localStorage.setItem("firstName", formulaire.firstName.value);
      }
      if (formulaire.name.value === "") {
        return false;
      } else {
        keyName = localStorage.setItem("name", formulaire.name.value);
      }
    });
  }, //FIN SEND FORM BUTTON

  confirmationBooking: function () {
    formulaire.confirmation_booking.style.display = "block";

    formulaire.confirmation_booking.addEventListener("click", function () {
      if (!canvasDisplay.containsSignature) {
        alert("Vous devez signer pour reserver un vélo");
      } else {
        formulaire.inProgressPara3.innerHTML =
          " Votre réservation expirera dans " +
          "<span id='timer'> </span>" +
          "<span id='minutes'> 20 </span>" +
          "<span id='secondes'>  00</span>";

        //RECUPERE SETITEM DS LE LOCAL STORAGE POUR L4 AFFICHER
        stationsKey = sessionStorage.getItem("stationsName"); //RECUPERE SETITEM DS LE LOCAL STORAGE POUR L4 AFFICHER
        objStations = JSON.stringify(stationsKey);
        var stationName = document.getElementById("name_location").innerHTML;
        formulaire.inProgressPara1.innerHTML =
          "Réservation en cours à : " + stationName;
        formulaire.inProgressPara3.style.display = "block"; // on affiche la div timer;

        let timer = new Timer();
        timer_handle = timer.demarrerDecompte();

        sessionStorage.setItem("minutes", timer.minutesNbr);
        sessionStorage.setItem("secondes", timer.secondesNbr);
      }
    });
  }, //fin de confirmationbooking

  cancelBooking: function () {
    (formulaire.cancel_booking.style.display = "block"),
      formulaire.cancel_booking.addEventListener("click", function (e) {
        formulaire.inProgressPara1.innerHTML = " ";
        let timer = new Timer();
        timer.stopDecompte(timer_handle);
        sessionStorage.clear();
        canvasDisplay.clearCanvas();
        formulaire.inProgressPara3.innerHTML =
          "Votre réservation a été annulée. A bientôt! ";
      });
  },
  inputLocalStorage: function () {
    let nameLocalStorage = localStorage.getItem("name");
    let firstNameLocalStorage = localStorage.getItem("firstName");

    if (nameLocalStorage != null) {
      formulaire.field[0].value = nameLocalStorage;
      formulaire.field[1].value = firstNameLocalStorage;
    } else {
      formulaire.field[0].value = "";
      formulaire.field[1].value = "";
    }
  },
}; // fin formulaire

let sendFormButton = formulaire.sendForm();
let confirmationBookingButton = formulaire.confirmationBooking();
let cancelBookingButton = formulaire.cancelBooking();

formulaire.inputLocalStorage();

window.onload = function () {
  var hasTimerStarted = sessionStorage.getItem("time-started"); //renvoie une chaine de caractère

  if (JSON.parse(hasTimerStarted)) {
    //transforme en boleen la fonction time started
    displayReservationInfo();
    let timer = new Timer();
    timer.demarrerDecompte();

    formulaire.inProgressPara3.style.display = "block";
    formulaire.confirmation.style.display = "block";
  }
};

function displayReservationInfo() {
  // FUNCTION LOCAL STORAGE POUR RECUPERER NOM ET PRENOM DS FORMULAIRE
  let nameKey = localStorage.getItem("name");
  document.getElementById("name").value = nameKey == "null" ? "" : nameKey;

  let firstNameKey = localStorage.getItem("firstName");

  document.getElementById("firstName").value =
    firstNameKey == "null" ? "" : firstNameKey;

  let stationAddressKey = sessionStorage.getItem("stationsAddress");

  document.getElementById("info").innerHTML =
    stationAddressKey == "null" ? "" : stationAddressKey;

  let location = sessionStorage.getItem("stationsName");
  document.getElementById("name_location").innerHTML =
    location == "null" ? "" : location;
  formulaire.inProgressPara1.innerHTML = "Réservation en cours à : " + location;

  let status = sessionStorage.getItem("stationsStatus");
  document.getElementById("status_station").innerHTML =
    status == "null" ? "" : status;

  let bikes = sessionStorage.getItem("stationsBike");
  document.getElementById("bikes").innerHTML = bikes == "null" ? "" : bikes;
}
