document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const cardsOriginal = Array.from(track.children);
  const gap = 20;
  const firstClone = cardsOriginal[0].cloneNode(true);
  const lastClone = cardsOriginal[cardsOriginal.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, cardsOriginal[0]);
  const cards = Array.from(track.children);
  const trackWidth = track.offsetWidth;
  const cardWidth = cards[0].offsetWidth;
  let currentIndex = 1;
  let autoSlideTimeout;
  const slideDelay = 4000;
  let isTransitioning = false;

  function updateCards(animate = true) {
    track.style.transition = animate ? "transform 0.8s ease" : "none";
    cards.forEach(card => card.classList.remove('active', 'left', 'right', 'second-left', 'second-right'));
    const center = cards[currentIndex];
    const leftIndex = (currentIndex - 1 + cards.length) % cards.length;
    const rightIndex = (currentIndex + 1) % cards.length;
    const left2Index = (currentIndex - 2 + cards.length) % cards.length;
    const right2Index = (currentIndex + 2) % cards.length;
    if (center !== firstClone && center !== lastClone) center.classList.add('active');
    cards[leftIndex].classList.add('left');
    cards[rightIndex].classList.add('right');
    cards[left2Index].classList.add('second-left');
    cards[right2Index].classList.add('second-right');
    const offset = -currentIndex * (cardWidth + gap) + (trackWidth - cardWidth) / 2;
    track.style.transform = `translateX(${offset}px)`;
  }

  function moveToIndex(index) {
    if (isTransitioning) return;
    clearTimeout(autoSlideTimeout);
    isTransitioning = true;
    currentIndex = index;
    updateCards(true);

    track.addEventListener('transitionend', function handler() {
      track.removeEventListener('transitionend', handler);
      if (currentIndex === 0) {
        currentIndex = cards.length - 2;
        track.style.transition = 'none';
        track.offsetHeight; 
        updateCards(false);
      } else if (currentIndex === cards.length - 1) {
        currentIndex = 1;
        track.style.transition = 'none';
        track.offsetHeight; 
        updateCards(false);
      }
      isTransitioning = false;
      scheduleAutoSlide();
    });
  }

  function nextCard() { moveToIndex(currentIndex + 1); }
  function prevCard() { moveToIndex(currentIndex - 1); }

  carousel.querySelector('.next').addEventListener('click', () => nextCard());
  carousel.querySelector('.prev').addEventListener('click', () => prevCard());

  function scheduleAutoSlide() {
    clearTimeout(autoSlideTimeout);
    if (isTransitioning) return;
    autoSlideTimeout = setTimeout(nextCard, slideDelay);
  }

  carousel.addEventListener('mouseenter', () => clearTimeout(autoSlideTimeout));
  carousel.addEventListener('mouseleave', scheduleAutoSlide);

  updateCards(false);
  scheduleAutoSlide();
});
