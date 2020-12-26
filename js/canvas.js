class Canvas {
  constructor() {
    this.canvas = document.getElementById("sig-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 3;
    this.drawing = false;
    this.containsSignature = false;
    this.mousePosition = {
      x: 0,
      y: 0,
    };
    this.lastPosition = this.mousePosition;
    this.cancelBooking = document.getElementById("cancel_booking");
    this.canvas.width = 150;
    this.canvas.height = 150;
    this.init();
  }

  init() {
    // Prevent scrolling when touching the canvas
    //empêcher le défilement sur document.body si la cible d’un événement tactile est le canevas.

    var that = this;

    that.canvas.addEventListener("touchstart", function (e) {
      e.preventDefault();
    });

    that.canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
    });

    that.canvas.addEventListener("touchend", function (e) {
      e.preventDefault();
    });

    // Set up touch events for mobile, etc

    this.canvas.addEventListener("mousedown", function (e) {
      //mousedown est déclenché lorsqu'une souris est pressé sur un élément, /pour activer le mode de dessin
      that.drawing = true;
      that.lastPosition = that.positionMousse(e); //POSITION DE LA SOURIS AVEC DEUX PARAMETRES
      that.containsSignature = true;
    });

    this.canvas.addEventListener("mousemove", function (e) {
      //mousemove se déclenche lorsque la souris se déplace alors qu'elle est au dessus d'un élément./pour basculer la position de la souris, utilisée en dessin
      that.mousePosition = that.positionMousse(e);
      that.renderCanvas();
    });

    document.addEventListener("mouseup", function (e) {
      //mouseup est déclenché quand un dispositif de pointage est relâché au dessus d'un élément./pour désactiver le mode de dessin
      that.drawing = false;
    });

    this.canvas.addEventListener("touchstart", function (e) {
      //est déclenché lorsqu'un ou plusieurs points tactiles sont placés sur la surface tactile.
      that.mousePosition = that.getTouchposition(e); //POSITION DE LA SOURIS =
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      that.canvas.dispatchEvent(mouseEvent);
    });

    this.canvas.addEventListener("touchmove", function (e) {
      var touch = e.touches[0];
      e.preventDefault();
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      that.canvas.dispatchEvent(mouseEvent);
    });

    this.canvas.addEventListener("touchend", function (e) {
      var mouseEvent = new MouseEvent("mouseup", {});
      that.canvas.dispatchEvent(mouseEvent);
    });

    //Effacer
    this.cancelBooking.addEventListener("click", function (e) {
      that.clearCanvas();
    });
  }

  // Get the position of the mouse relative to the canvas
  //ETABLIR FUNCTION POUR DETERMINER LA POSITION DE LA SOURIS DS LE CANVAS
  positionMousse(mouseEvent) {
    if (this.drawing) {
      var rect = this.canvas.getBoundingClientRect(); //Element.getBoundingClientRect() renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage (viewport).CONTIENT 2 proprietes top et left.
      return {
        x: mouseEvent.clientX - rect.left, //Comme la position de la souris que vous obtenez est relative par rapport à la fenêtre du client, vous devez soustraire la position de l’élément canvas pour le convertir par rapport à l’élément lui-même.
        //RECT est la taille du est la position de l'element par rapport au viewport.MOUSSE EVENT EST LA OU ON CLIQUE
        y: mouseEvent.clientY - rect.top,
      };
    }
  }

  // Get the position of a touch relative to the canvas

  getTouchposition(touchEvent) {
    var oRect = this.canvas.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - oRect.left,
      y: touchEvent.touches[0].clientY - oRect.top,
    };
  }

  // Draw to the canvas
  //les chemins vont nous permettre de creer des lignes, la création de chemin se fait par étape successive
  renderCanvas() {
    if (this.drawing) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y); //moveto est le pt de depart 2 parametres = coordonnes du point par rapport au bord à haut à gauche
      this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y); //line to est le point final
      this.ctx.stroke(); // stroke permet de realiser le traçé entre les 2 points lineto et moveto
      this.lastPosition = this.mousePosition;
    }
  }

  // efface le dession
  clearCanvas() {
    this.canvas.width = this.canvas.width;
    this.ctx.lineWidth = 3;
    this.containsSignature = false;
  }
}

let canvasDisplay = new Canvas();
//console.log(canvasDisplay.drawing);
