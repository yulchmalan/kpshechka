window.addEventListener("load", function () {
    if (!localStorage.getItem("popupShown")) {
        setTimeout(function open() {
            document.querySelector(".popup").style.display = "block";
            overlay.classList.add("active");
      
            localStorage.setItem("popupShown", "true");
          }, 1000);
    }

    function startCountdown() {
      const targetDate = new Date("2024-12-18T12:00:00");
      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");
  
      function updateTimer() {
        const now = new Date();
        const timeDiff = targetDate - now;
  
        if (timeDiff <= 0) {
          clearInterval(timerInterval);
          daysEl.textContent = "0";
          hoursEl.textContent = "0";
          minutesEl.textContent = "0";
          secondsEl.textContent = "0";
          return;
        }
  
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
      }
  
      const timerInterval = setInterval(updateTimer, 1000);
      updateTimer(); 
    }
  
    startCountdown();
  });
  
  document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
    overlay.classList.remove("active");
  });
  
  overlay.addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
    overlay.classList.remove("active");
  });
  