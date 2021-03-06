var url =
  " https://newsapi.org/v2/top-headlines?country=us&apiKey=e3fb4f5299d44066b025296877ccc8e4";

// e3fb4f5299d44066b025296877ccc8e4;
var sliderRes;
var req = new Request(url);
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (obj) {
    sliderRes = obj;
    addImages();
  });

let slidePosition = 0;
const carouselContainer = document.getElementById("carousel");
const slides = document.getElementsByClassName("carousel__item");
const slideElements = document.getElementsByClassName("carousel__element");
const totalSlides = slides.length;
let directionOfSliding = 0;

slideTimer = setInterval(moveToNextSlide, 3000);
document
  .getElementById("carousel__button--next")
  .addEventListener("click", function () {
    moveToNextSlide();
  });
document
  .getElementById("carousel__button--prev")
  .addEventListener("click", function () {
    moveToPrevSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove("carousel__item--visible");
    slide.classList.remove("carousel__item--visible-left");

    slide.classList.add("carousel__item--hidden");
  }
  if (directionOfSliding === 0) {
    slides[slidePosition].classList.add("carousel__item--visible");
  } else {
    slides[slidePosition].classList.add("carousel__item--visible-left");
  }
  directionOfSliding = 0;
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}
//turn slide very 3 seconds

function moveToPrevSlide() {
  directionOfSliding = -1;
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}
function allowArrows(e) {
  switch (e.key) {
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      moveToPrevSlide();

      break;

    case "Right": // IE/Edge specific value
    case "ArrowRight":
      moveToNextSlide();

      break;
  }
}
function inContainer() {
  document.addEventListener("keydown", allowArrows);
}
function removeEvent() {
  document.removeEventListener("keydown", allowArrows);
}
carouselContainer.addEventListener("mouseenter", inContainer);
carouselContainer.addEventListener("mouseleave", removeEvent);

function addImages() {
  let counter = 0;
  for (let item of slideElements) {
    var readMore = document.createElement("a");

    readMore.classList.add("myButton");

    readMore.innerText = "Read More";

    if (counter < 10) {
      readMore.setAttribute("id", "SliderArticleNumber0" + counter);
    } else {
      readMore.setAttribute("id", "SliderArticleNumber" + counter);
    }
    readMore.addEventListener("click", addModalContent);

    var title = document.createElement("p");

    title.classList.add("carousel__item_text");
    title.appendChild(readMore);

    var image = document.createElement("IMG");
    if (sliderRes.articles[counter].urlToImage != null) {
      image.src = sliderRes.articles[counter].urlToImage;
    } else {
      image.src = "images/list/no_img.png";
    }

    title.innerText = sliderRes.articles[counter].title;
    console.log();
    if (title.innerText.length > 80) {
      title.innerText = title.innerText.slice(0, 80) + "...";
    }
    item.append(image);
    item.append(title);
    title.append(readMore);

    counter++;
  }
}
