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

// Carousel circle
const track = document.getElementById("carouselTrack");
let index = 0;
const total = track.children.length;

// Auto slide tiap 5 detik
setInterval(() => {
  index = (index + 1) % total;
  track.style.transform = `translateX(-${index * 140}px)`; // 120px + margin
}, 5000);

// Geser manual (swipe)
let startX = 0;
track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    // geser kiri
    index = (index + 1) % total;
  } else if (endX - startX > 50) {
    // geser kanan
    index = (index - 1 + total) % total;
  }
  track.style.transform = `translateX(-${index * 140}px)`;
});


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

