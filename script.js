const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const wishButton = document.querySelector('#wishButton');
const wishMessage = document.querySelector('#wishMessage');
const birthdayAudio = document.querySelector('#birthdayAudio');
const audioToggle = document.querySelector('#audioToggle');
const audioIcon = document.querySelector('#audioIcon');
const audioPlayer = document.querySelector('.audio-player');
const giftButton = document.querySelector('#giftButton');
const giftArea = document.querySelector('.gift-area');
const giftHint = document.querySelector('#giftHint');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCount = document.querySelector('#lightboxCount');
const photoButtons = [...document.querySelectorAll('.photo-trigger[data-photo]')];
const photoFiles = ['b1.jpg', 'b2.jpg', 'b3.jpg', 'b4.jpg', 'b5.jpg', 'b6.jpg', 'b7.jpg'];
let activePhoto = 0;

const showPhoto = (index) => {
  activePhoto = (index + photoFiles.length) % photoFiles.length;
  lightboxImage.src = photoFiles[activePhoto];
  lightboxImage.alt = `Bhavya photo ${activePhoto + 1} of 7`;
  lightboxCount.textContent = `${String(activePhoto + 1).padStart(2, '0')} / 07`;
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
};

photoButtons.forEach((button) => button.addEventListener('click', () => showPhoto(Number(button.dataset.index))));
document.querySelector('#lightboxClose').addEventListener('click', () => { lightbox.hidden = true; document.body.classList.remove('lightbox-open'); });
document.querySelector('#lightboxPrev').addEventListener('click', () => showPhoto(activePhoto - 1));
document.querySelector('#lightboxNext').addEventListener('click', () => showPhoto(activePhoto + 1));
document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') document.querySelector('#lightboxClose').click();
  if (event.key === 'ArrowLeft') showPhoto(activePhoto - 1);
  if (event.key === 'ArrowRight') showPhoto(activePhoto + 1);
});

audioToggle.addEventListener('click', async () => {
  if (birthdayAudio.paused) {
    await birthdayAudio.play();
    audioIcon.textContent = 'Ⅱ';
    audioToggle.setAttribute('aria-label', 'Pause birthday soundtrack');
    audioPlayer.classList.add('is-playing');
  } else {
    birthdayAudio.pause();
    audioIcon.textContent = '▶';
    audioToggle.setAttribute('aria-label', 'Play birthday soundtrack');
    audioPlayer.classList.remove('is-playing');
  }
});

giftButton.addEventListener('click', () => {
  giftArea.classList.add('open');
  giftHint.textContent = 'a little love, just for you';
});

wishButton.addEventListener('click', () => {
  wishMessage.classList.add('show');
  wishButton.innerHTML = '<span class="button-spark">✦</span> wish sent <span class="button-heart">♥</span>';
  wishButton.setAttribute('aria-label', 'Your birthday wish has been sent');

  for (let index = 0; index < 18; index += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.textContent = index % 2 ? '✦' : '·';
    spark.style.setProperty('--x', `${(Math.random() - 0.5) * 260}px`);
    spark.style.setProperty('--y', `${-60 - Math.random() * 150}px`);
    spark.style.setProperty('--delay', `${Math.random() * .25}s`);
    document.querySelector('.wish-section').appendChild(spark);
    setTimeout(() => spark.remove(), 1300);
  }
});