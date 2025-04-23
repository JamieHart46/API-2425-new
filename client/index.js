import './index.css';

document.querySelectorAll('a.clubs').forEach(link => {
    link.addEventListener('click', navigateWithTransition);
});

// Class geven aan img voor View transition
// met behulp van Sanne, Mike en Chat
function navigateWithTransition(event) {
    event.preventDefault();
  
    const link = event.currentTarget;
    const img = link.querySelector('a img');

    console.log('Clicked image:', img);
  
    document.querySelectorAll('.teamBadge').forEach(el => {
      el.classList.remove('teamBadge');
    });
  
    if (img) {
      img.classList.add('teamBadge');
    }
  
    new Promise((resolve) => {
      const checkClass = setInterval(() => {
        if (img && img.classList.contains('teamBadge')) {
          clearInterval(checkClass); 
          resolve(); 
        }
      }, 10); 
    }).then(() => {
      document.startViewTransition(() => {
        window.location.href = link.href;
      });
    });
  }
  //https://developer.chrome.com/docs/web-platform/view-transitions/cross-document#navigation-activation-info
  

// Canvas API voor regenen aantal ballen in gescoorde doelpunten, met behulp van chat.
  const canvas = document.getElementById('footballRain');
  const ctx = canvas.getContext('2d');

  let width, height;
  const footballs = [];
  const teamGoalCount = document.querySelector('#scored');
// select het element waarin id="scored" zich bevindt.
  const footballCount = parseInt(teamGoalCount.textContent.trim(), 10);
// Zet het om naar alleen de inhoud van de li, die vanuit de server ingevoerd wordt.
  const footballImage = new Image();
  footballImage.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg';

//console.log(teamGoalCount);
// console.log(footballCount);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  class Football {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -Math.random() * height;
      this.size = 20 + Math.random() * 40;
      this.speed = 2 + Math.random() * 10;
    }

    update() {
      this.y += this.speed;
      if (this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.drawImage(footballImage, this.x, this.y, this.size, this.size);
    }
  }

  for (let i = 0; i < footballCount; i++) {
    footballs.push(new Football());
  }

  let stopAnimation = false;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    footballs.forEach(ball => {
      if (!stopAnimation) {
        ball.update();
      }
      ball.draw();
    });
    requestAnimationFrame(animate);
  }

  footballImage.onload = () => {
    animate();
    setTimeout(() => {
      stopAnimation = true; 
    }, 5000); 
  };