class Timer {
  constructor() {
    this.minutesElt = document.getElementById("minutes");
    this.secondesElt = document.getElementById("secondes");
    this.minutesNbr = Number(this.minutesElt.textContent);
    this.secondesNbr = Number(this.secondesElt.textContent);
    this.interval = null;
  }

  decompte() {
    if (sessionStorage.getItem("minutes")) {
      var minutes = Number(sessionStorage.getItem("minutes"));
      var secondes = Number(sessionStorage.getItem("secondes"));
    } else {
      var minutes = 0;
      var secondes = 0;
    }

    secondes -= 1;

    if (minutes < 0) {
      return;
    } else if (secondes < 0 && minutes != 0) {
      minutes -= 1;
      secondes = 59;
    } else if (secondes < 10 && secondes.length !== 2) {
      secondes = "0" + secondes;
    }

    if (minutes == 0 && secondes == 0) {
      clearInterval(this.interval);
      sessionStorage.setItem("time-started", false);

      document.getElementById("inProgressPara3").innerHTML =
        "Votre réseravation a éxpiré";
      document.getElementById("inProgressPara1").style.display = "none";
      sessionStorage.removeItem("minutes");
      sessionStorage.removeItem("secondes");
      sessionStorage.removeItem("stationsAddress");
      sessionStorage.removeItem("stationsBike");
      sessionStorage.removeItem("stationsStatus");
      sessionStorage.removeItem("stationsName");
    } else {
      // Enregistrer et Afficher le timer dans la session

      this.minutesElt.textContent = minutes;
      sessionStorage.setItem("minutes", minutes);
      this.secondesElt.textContent = secondes;
      sessionStorage.setItem("secondes", secondes);
    }
  }

  demarrerDecompte() {
    sessionStorage.setItem("time-started", true);
    this.interval = setInterval(this.decompte.bind(this), 1000);

    return this.interval;
  }

  stopDecompte(handle) {
    clearInterval(handle);
  }
} //fin de timer
