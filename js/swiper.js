const swiper = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      dragSize: 20,
    },

    slidesPerView: 1.6,
    spaceBetween: 30,
    breakpoints: {
        450: {
          slidesPerView: 1.9,
        },
        612: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      },
  });

  const swiperFour = new Swiper('.swiperFour', {
    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      dragSize: 20,
    },

    slidesPerView: 1.4,
    spaceBetween: 20,
    breakpoints: {
        450: {
          slidesPerView: 1.6,
        },
        612: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
  });
  
  