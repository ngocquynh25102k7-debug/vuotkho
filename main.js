document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const cards = Array.from(track.children);
  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');
  const gap = 20;
  let currentIndex = 0; 
  let autoSlide;

  function updateCards() {
    const trackWidth = track.offsetWidth;
    const cardWidth = cards[0].offsetWidth;

    cards.forEach((card, i) => {
      card.classList.remove('active');
      card.style.opacity = "0.6";
      card.style.transform = "scale(0.8)";
      card.style.zIndex = "1";
    });

   
    const activeCard = cards[currentIndex];
    activeCard.classList.add('active');
    activeCard.style.opacity = "1";
    activeCard.style.zIndex = "2";

    const offset = (trackWidth / 2) - (cardWidth / 2) - (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(${offset}px)`;
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  }

  function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
  }

  
  nextBtn.addEventListener('click', () => { nextCard(); resetAutoSlide(); });
  prevBtn.addEventListener('click', () => { prevCard(); resetAutoSlide(); });

  
  function startAutoSlide() { autoSlide = setInterval(nextCard, 3000); }
  function resetAutoSlide() { clearInterval(autoSlide); startAutoSlide(); }

  
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carousel.addEventListener('mouseleave', startAutoSlide);

  
  updateCards();
  startAutoSlide();
});
