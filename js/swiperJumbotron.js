const swiperJumbo = new Swiper('.swiper-jumbo', {
  pagination: {
    el: '.jambo-pag',
  },

  navigation: {
    nextEl: '.jambo-next',
    prevEl: '.jambo-prev',
  },

  autoplay: {
    delay: 5000,
  },

  slidesPerView: 1,
});