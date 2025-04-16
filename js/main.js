// # DATA 

const slides = [
  {
    img: "01.jpg",
    title: "Slide 1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nesciunt dolore facilis!",
  },
  {
    img: "02.jpg",
    title: "Slide 2",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nesciunt dolore facilis!",
  },
  {
    img: "03.jpg",
    title: "Slide 3",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nesciunt dolore facilis!",
  },
  {
    img: "04.jpg",
    title: "Slide 4",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nesciunt dolore facilis!",
  },
  {
    img: "05.jpg",
    title: "Slide 5",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nesciunt dolore facilis!",
  },
];

let activeSlideIndex = 2;
let autoplayClock;
let isMouseOnCarousel;

// # DOM ELEMENTS

// * Containers

const carouselContainer = document.querySelector(".carousel-container");
const activeSlideContainer = document.querySelector(".active-item");
const thumbnailsContainer = document.querySelector(".thumbnails-container");

// * Thumbnails (disponibile dopo il render sul load della pagina)
let thumbnailsElements;

// * Buttons

const prevButton = document.querySelector(".control-prev")
const autoplayButton = document.querySelector(".control-autoplay")
const stopButton = document.querySelector(".control-stop")
const nextButton = document.querySelector(".control-next")

// # DOM RENDERING FUNCTIONS

// * Generazione slide attiva 

const renderActiveSlide = () => {
  const activeSlide = slides[activeSlideIndex];

  activeSlideContainer.innerHTML = `
    <div class="active-item-media glow-animation">
      <img src="./img/${activeSlide.img}" alt="" />
    </div>
    <div class="active-item-content">
      <h1>${activeSlide.title}</h1>
      <p>${activeSlide.description}</p>
    </div>`;
}

// * Generazione thumbnails

const renderThumbnails = () => {
  let thumbnailsHtml = "";
  for (let i = 0; i < slides.length; i++) {
    const currentSlide = slides[i];

    thumbnailsHtml += `
    <div class="thumb ${i === activeSlideIndex && "active"}">
    <img src="./img/${currentSlide.img}" />
    </div>`
  }

  thumbnailsContainer.innerHTML = thumbnailsHtml;
  thumbnailsElements = document.querySelectorAll(".thumbnails-container .thumb");

  for (let i = 0; i < thumbnailsElements.length; i++) {
    const currentThumbNode = thumbnailsElements[i];
    currentThumbNode.addEventListener("click", () => {
      goToSlide(i);
    })
  }
}

// * Cambio slide
const goToSlide = (newSlideIndex) => {
  activeSlideIndex = newSlideIndex;

  for (let i = 0; i < thumbnailsElements.length; i++) {
    const currentThumb = thumbnailsElements[i];
    if (newSlideIndex === i) {
      currentThumb.classList.add("active");
    } else {
      currentThumb.classList.remove("active");
    }
  }

  renderActiveSlide();
}

// # TIMING FUNCTIONS 

const setAutoplay = () => {
  if (!autoplayClock) {
    autoplayClock = setInterval(() => {
      if (!isMouseOnCarousel) {
        handleNextButtonClick();
      }
    }, 3000);

    stopButton.style.display = "inline-block";
    autoplayButton.style.display = "none";
  }
}

const clearAutoplay = () => {
  if (autoplayClock) {
    clearInterval(autoplayClock);
    autoplayClock = undefined;
    stopButton.style.display = "none";
    autoplayButton.style.display = "inline-block";
  }
}

// # EVENTS FUNCTIONS AND BINDINGS

const handleNextButtonClick = () => {
  if (activeSlideIndex + 1 > slides.length - 1) {
    goToSlide(0)
  } else {
    goToSlide(activeSlideIndex + 1);
  }
}

const handlePrevButtonClick = () => {
  if (activeSlideIndex - 1 < 0) {
    goToSlide(slides.length - 1);
  } else {
    goToSlide(activeSlideIndex - 1);
  }
}

const handleStopButtonClick = () => {
  clearAutoplay();
}

const handleAutoplayButtonClick = () => {
  setAutoplay();
}

const handleCarouselMouseEnter = () => {
  isMouseOnCarousel = true;
}

const handleCarouselMouseLeave = () => {
  isMouseOnCarousel = false;
}

nextButton.addEventListener("click", handleNextButtonClick);
prevButton.addEventListener("click", handlePrevButtonClick);
stopButton.addEventListener("click", handleStopButtonClick);
autoplayButton.addEventListener("click", handleAutoplayButtonClick);
carouselContainer.addEventListener("mouseenter", handleCarouselMouseEnter)
carouselContainer.addEventListener("mouseleave", handleCarouselMouseLeave)

// # ON LOAD

renderActiveSlide();
renderThumbnails();
setAutoplay();