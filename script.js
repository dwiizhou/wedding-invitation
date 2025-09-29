// Nama tamu dari URL (?to=...)
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");
if (guest) {
  document.getElementById("guestName").textContent = guest;
}

/* Slideshow */
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
  let prev = slides[currentSlide];
  currentSlide = (currentSlide + 1) % slides.length;
  let next = slides[currentSlide];

  next.style.left = "0";      // langsung masuk
  next.classList.add("active");
  
  prev.style.left = "-100%";  // geser keluar
  prev.classList.remove("active");
}

// Ganti slide tiap 5 detik
setInterval(showNextSlide, 5000);


// Countdown
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

// Carousel circle Start
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".circle");
const total = slides.length;
const slideWidth = 140; // 120px + margin
let index = 0;

// fungsi geser
function moveToSlide(newIndex) {
  index = newIndex;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

// auto slide
setInterval(() => {
  if (index < total - 1) {
    moveToSlide(index + 1);
  } else {
    // reset langsung ke awal tanpa animasi
    track.style.transition = "none";
    index = 0;
    track.style.transform = `translateX(0)`;
  }
}, 5000);  // Carousel circle End



// Opening handler
function openInvitation() {
  const overlay = document.getElementById("overlay");
  const music = document.getElementById("bgMusic");

  music.play(); // user click -> musik boleh jalan
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }, 1000);
}

