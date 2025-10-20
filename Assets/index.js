// For information on the email messaging system check, EmailJS

const cursorDot = document.querySelector(".cursor--dot");
const cursorOutline = document.querySelector(".cursor--outline");
console.log(cursorDot);
let isModalOpen = false;
let contrastToggle = false;

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

// EmailJS contact form submission is disabled, so we use formspree.io instead below
// function contact(event) {
//   event.preventDefault();

//   const loading = document.querySelector(".modal__overlay--loading");
//   const success = document.querySelector(".modal__overlay--success");
//   loading.classList += " modal__overlay--visible";

//   emailjs
//     .sendForm(
//       "service_a0ofr3j",
//       "template_2fqot2d",
//       event.target,
//       "kvUDIvkDMJdmm7_h3"
//     )
//     .then(() => {
//       loading.classList.remove("modal__overlay--visible");
//       success.classList += " modal__overlay--visible";
//     })
//     .catch((e) => {
//       loading.classList.remove("modal__overlay--visible");
//       alert(
//         "The email service is temporarily unavailable. Please contact me directly on dcmillea@gmail.com"
//       );
//     });
// }

// Formspree contact form submission
function contact(event) {
  event.preventDefault();

  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  const form = event.target;

  // Show loading spinner
  loading.classList.add("modal__overlay--visible");
  success.classList.remove("modal__overlay--visible");

  const data = new FormData(form);

  fetch("https://formspree.io/f/xwprjlwq", {
    // <-- Replace with your Formspree endpoint
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: data,
  })
    .then((response) => {
      loading.classList.remove("modal__overlay--visible");
      if (response.ok) {
        success.classList.add("modal__overlay--visible");
        form.reset();
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert("Network error. Please try again later.");
    });
}

function toggleModal() {
  isModalOpen = !isModalOpen;
  if (isModalOpen) {
    document.body.classList += " modal--open";
    window.scrollTo(0, 0);
  } else {
    document.body.classList.remove("modal--open");
  }
}

// Custom cursor and background mover

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", handleResize);

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 75) * (canvas.width / 75),
};

window.addEventListener("mousemove", function (e) {
  // for the custom cursor
  const x = e.clientX;
  const y = e.clientY;

  // for the background
  mouse.x = x;
  mouse.y = y;

  cursorOutline.style.left = `${x}px`;
  cursorOutline.style.top = `${y}px`;
  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;

  cursorOutline.animate(
    {
      left: `${x}px`,
      top: `${y}px`,
    },
    { duration: 500, fill: "forwards", easing: "ease" }
  );
});

window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

// Particle
// class Particle {
//   constructor(x, y, dirX, dirY, size, color) {
//     this.x = x;
//     this.y = y;
//     this.dirX = dirX;
//     this.dirY = dirY;
//     this.size = size;
//     this.color = color;
//   }

//   draw() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
//     ctx.fillStyle = "#2563eb";
//     ctx.fill();
//   }

//   // update() {
//   //   if (this.x > canvas.width || this.x < 0) {
//   //     this.dirX = -this.dirX;
//   //   }
//   //   if (this.y > canvas.height || this.y < 0) {
//   //     this.dirY = -this.dirY;
//   //   }

//   //   let dX = mouse.x - this.x;
//   //   let dY = mouse.y - this.y;
//   //   let distance = Math.sqrt(dX * dX + dY * dY);
//   //   if (distance < mouse.radius + this.size) {
//   //     if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
//   //       this.x += 5;
//   //     }
//   //     if (mouse.x > this.x && this.x > this.size * 10) {
//   //       this.x -= 5;
//   //     }
//   //     if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
//   //       this.y += 5;
//   //     }
//   //     if (mouse.y > this.y && this.y > this.size * 10) {
//   //       this.y -= 5;
//   //     }
//   //   }
//   //   this.x += this.dirX;
//   //   this.y += this.dirY;
//   //   this.draw();
//   // }

//   update() {
//     // Bounce off edges
//     if (this.x + this.size > canvas.width || this.x - this.size < 0) {
//       this.velocityX = -this.velocityX;
//     }
//     if (this.y + this.size > canvas.height || this.y - this.size < 0) {
//       this.velocityY = -this.velocityY;
//     }

//     // Repel from mouse
//     if (mouse.x !== null && mouse.y !== null) {
//       let dx = mouse.x - this.x;
//       let dy = mouse.y - this.y;
//       let distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < mouse.radius + this.size) {
//         let angle = Math.atan2(dy, dx);
//         let force = (mouse.radius - distance) / mouse.radius;
//         let forceX = Math.cos(angle) * force * 2;
//         let forceY = Math.sin(angle) * force * 2;

//         this.velocityX -= forceX;
//         this.velocityY -= forceY;
//       }
//     }

//     // Apply friction to smooth out movement
//     this.velocityX *= 0.95;
//     this.velocityY *= 0.95;

//     // Add a bit of the original direction back in, so they keep drifting
//     this.velocityX += this.dirX * 0.05;
//     this.velocityY += this.dirY * 0.05;

//     this.x += this.velocityX;
//     this.y += this.velocityY;

//     this.draw();
//   }
// }

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;

    this.dirX = dirX;
    this.dirY = dirY;

    this.velocityX = dirX;
    this.velocityY = dirY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // Move particle
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Bounce off right/left edges
    if (this.x + this.size > canvas.width) {
      this.x = canvas.width - this.size;
      this.velocityX = -Math.abs(this.velocityX);
      this.dirX = -Math.abs(this.dirX); // flip base drift
    } else if (this.x - this.size < 0) {
      this.x = this.size;
      this.velocityX = Math.abs(this.velocityX);
      this.dirX = Math.abs(this.dirX); // flip base drift
    }

    // Bounce off bottom/top edges
    if (this.y + this.size > canvas.height) {
      this.y = canvas.height - this.size;
      this.velocityY = -Math.abs(this.velocityY);
      this.dirY = -Math.abs(this.dirY); // flip base drift
    } else if (this.y - this.size < 0) {
      this.y = this.size;
      this.velocityY = Math.abs(this.velocityY);
      this.dirY = Math.abs(this.dirY); // flip base drift
    }

    // Repulsion from mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius + this.size) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        const repulseX = Math.cos(angle) * force * 3;
        const repulseY = Math.sin(angle) * force * 3;

        this.velocityX -= repulseX;
        this.velocityY -= repulseY;
      }
    }

    // Friction
    this.velocityX *= 0.97;
    this.velocityY *= 0.97;

    // Add base drifting speed
    this.velocityX += this.dirX * 0.05;
    this.velocityY += this.dirY * 0.05;

    // Draw particle
    this.draw();
  }
}

function connect() {
  let opacityValue;
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      let distance =
        (particlesArray[i].x - particlesArray[j].x) *
          (particlesArray[i].x - particlesArray[j].x) +
        (particlesArray[i].y - particlesArray[j].y) *
          (particlesArray[i].y - particlesArray[j].y);

      if (distance < (canvas.width / 8) * (canvas.height / 8)) {
        opacityValue = 1 - distance / 14000;
        ctx.strokeStyle = `rgba(37, 99, 235, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function init() {
  // particlesArray = [];
  // let numberOfParticles = (canvas.height * canvas.width) / 12000;
  // for (let i = 0; i < numberOfParticles; i++) {
  //   let size = Math.random() * 4.5 + 1;
  //   let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
  //   let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
  //   let dirX = Math.random() * 5 - 2.5;
  //   let dirY = Math.random() * 5 - 2.5;
  //   let color = "#2563eb70";

  //   particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
  // }
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 12000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let dirX = (Math.random() - 0.5) * 2; // small smooth motion
    let dirY = (Math.random() - 0.5) * 2;
    let color = "#2563eb"; // solid Tailwind blue

    particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  connect();
}

init();
animate();
