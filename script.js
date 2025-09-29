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

// Carousel circle seamless Start
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  // Gandakan isi track supaya ada dua set item
  track.innerHTML = track.innerHTML + track.innerHTML;

  // Hitung jumlah item asli
  const itemCount = track.children.length / 2;

  // Atur durasi animasi berdasarkan jumlah item
  const baseDuration = 12; // detik
  const duration = Math.max(8, baseDuration + itemCount * 0.8);
  track.style.setProperty("--duration", duration + "s");

  // Pause kalau disentuh (mobile)
  const carousel = track.closest(".circle-carousel");
  carousel.addEventListener("touchstart", () => {
    track.style.animationPlayState = "paused";
  }, { passive: true });
  carousel.addEventListener("touchend", () => {
    track.style.animationPlayState = "running";
  });

  // Pause kalau hover (desktop)
  carousel.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  carousel.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
});
// Carousel circle seamless End Carousel circle End



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
