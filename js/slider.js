let slider = {
  sliderImages: document.querySelectorAll(".slide"),
  btnLeft: document.querySelector("#prevBtn"),
  btnRight: document.querySelector("#nextBtn"),
  current: 0, //image qu'on regarde
  pauseBtn: document.getElementById("stopBtn"),

  //methode pour faire disparaître les images
  reset: function () {
    for (let i = 0; i < slider.sliderImages.length; i++) {
      slider.sliderImages[i].style.display = "none";
    }
  },
  //  commencer slider: but faire apparaître la 1ere image
  startSlide: function () {
    slider.reset();
    slider.sliderImages[0].style.display = "block";
    slider.current = -1;
  },
  //  prev
  slideLeft: function () {
    if (slider.current === 0) {
      slider.current = slider.sliderImages.length;
    }

    slider.reset();
    slider.sliderImages[slider.current - 1].style.display = "block";
    slider.current--;
  },
  // suivant
  slideRight: function () {
    if (slider.current === slider.sliderImages.length - 1) {
      slider.current = -1;
    }

    slider.reset();
    slider.sliderImages[slider.current + 1].style.display = "block";
    slider.current++;
  },

  animationImage: function () {
    if (slider.current === slider.sliderImages.length - 1) {
      //SI L IMAGE ACTUEL EST LA DERNIERE ALORS
      slider.startSlide();
    }
    if (slider.current != slider.sliderImages.length - 1) {
      slider.slideRight();
    }
  },

  enableKeyboardTouch: function () {
    document.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "Pause":
          clearInterval(animationId);
          break;
        case "ArrowLeft":
          slider.slideLeft();
          break;
        case "ArrowRight":
          slider.slideRight();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    });
  },
}; //fin objet slider

// btn prev
slider.btnLeft.addEventListener("click", function () {
  slider.slideLeft();
});

// btn suivant
slider.btnRight.addEventListener("click", function () {
  slider.slideRight();
});

slider.pauseBtn.addEventListener("click", function () {
  if (!pause) {
    clearInterval(animationId);
    slider.pauseBtn.textContent = "démarrer";
  } else {
    animationId = setInterval(slider.animationImage, 5000);
    slider.pauseBtn.textContent = "Pause";
  }
  pause = !pause;
});

//let animationId;

let animationId = setInterval(slider.animationImage, 5000);
//BOUTON
let pause = false; // arreter (true) demarrer (false)

slider.enableKeyboardTouch();
