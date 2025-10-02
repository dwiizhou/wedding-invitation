// Nama tamu dari URL (?to=...)
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");
if (guest) {
  document.getElementById("guestName").textContent = guest;
}

/* Slideshow */
let slideItems = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
  let prev = slideItems[currentSlide];
  currentSlide = (currentSlide + 1) % slideItems.length;
  let next = slideItems[currentSlide];

  next.style.left = "0";
  next.classList.add("active");
  
  prev.style.left = "-100%";
  prev.classList.remove("active");
}
setInterval(showNextSlide, 5000);

/* Countdown */
const eventDate = new Date("Dec 20, 2025 18:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(function() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    countdown.textContent = "Acara telah dimulai!";
    return;
  }

  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
  const seconds = Math.floor((distance%(1000*60))/1000);

  countdown.innerHTML = `
    <div>${days}d</div>
    <div>${hours}h</div>
    <div>${minutes}m</div>
    <div>${seconds}s</div>
  `;
},1000);

/* Carousel circle seamless */
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  // Gandakan isi track → 2 set
  track.innerHTML = track.innerHTML + track.innerHTML;

  const itemCount = track.children.length / 2;
  const baseDuration = 12; // detik
  const duration = Math.max(8, baseDuration + itemCount * 0.8);
  track.style.setProperty("--duration", duration + "s");

  const carousel = track.closest(".circle-carousel");
  carousel.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  carousel.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
  carousel.addEventListener("touchstart", () => {
    track.style.animationPlayState = "paused";
  }, { passive: true });
  carousel.addEventListener("touchend", () => {
    track.style.animationPlayState = "running";
  });
});

// Galeri

const images = [
  "assets/couple14.jpeg",
  "assets/couple15.jpeg",
  "assets/couple16.jpeg",
  "assets/couple17.jpeg"
  "assets/couple18.jpeg",
];

let currentIndex = 0;
let interval;

function showImage(index) {
  currentIndex = index;
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".gallery-thumbnails img");

  // ubah foto utama
  mainImage.src = images[index];

  // zoom efek
  mainImage.classList.add("zoom");
  setTimeout(() => mainImage.classList.remove("zoom"), 500);

  // update thumbnail aktif
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

// slideshow otomatis
function startSlideshow() {
  interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 5000);
}

// swipe gesture untuk HP
const mainImage = document.getElementById("mainImage");
let startX = 0;

mainImage.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

mainImage.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) {
    // geser kiri
    currentIndex = (currentIndex + 1) % images.length;
  } else if (endX > startX + 50) {
    // geser kanan
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  showImage(currentIndex);
});

// mulai pertama kali
showImage(0);
startSlideshow();


/* Opening overlay */
function openInvitation() {
  const overlay = document.getElementById("overlay");
  const music = document.getElementById("bgMusic");

  music.play().catch(()=>{}); 
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }, 1000);
}
