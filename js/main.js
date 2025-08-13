const imageSources = {
  "crown-clothing": [
    "./assets/images/projects/crown-clothing/home.png",
    "./assets/images/projects/crown-clothing/login.png",
    "./assets/images/projects/crown-clothing/cart.png",
    "./assets/images/projects/crown-clothing/checkout.png",
    "./assets/images/projects/crown-clothing/checkout-2.png",
  ],
  theturn: ["./assets/images/projects/theturn/theturn.png"],
};
const currentIndexes = {
  camplife: 0,
  "crown-clothing": 0,
  wedding: 0,
};

// Particles System
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 1, 99, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Typing Animation
class TypingAnimation {
  constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
    this.element = element;
    this.texts = texts;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    
    this.start();
  }
  
  start() {
    this.type();
  }
  
  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        setTimeout(() => this.type(), this.pauseTime / 2);
        return;
      }
    } else {
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      if (this.currentCharIndex === currentText.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.pauseTime);
        return;
      }
    }
    
    const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
    setTimeout(() => this.type(), speed);
  }
}

// Intersection Observer for animations
class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    this.initializeAnimations();
  }
  
  initializeAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.experience').forEach((el, index) => {
      el.classList.add('fade-in-up');
      el.style.transitionDelay = `${index * 0.1}s`;
      this.observer.observe(el);
    });
    
    document.querySelectorAll('.skill').forEach((el, index) => {
      el.classList.add('fade-in-up');
      el.style.transitionDelay = `${index * 0.05}s`;
      this.observer.observe(el);
    });
    
    document.querySelectorAll('.project').forEach((el, index) => {
      el.classList.add('fade-in-up');
      el.style.transitionDelay = `${index * 0.2}s`;
      this.observer.observe(el);
    });
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }
}

// Theme Toggle
class ThemeToggle {
  constructor() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.init();
  }
  
  init() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.toggle();
      });
    }
    
    this.apply();
  }
  
  toggle() {
    this.isDark = !this.isDark;
    this.apply();
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
  
  apply() {
    const root = document.documentElement;
    const body = document.body;
    
    if (this.isDark) {
      root.setAttribute('data-theme', 'dark');
      // Apply dark theme styles
      body.style.backgroundColor = '#121212';
      body.style.color = '#e0e0e0';
      // Update navigation
      const nav = document.querySelector('nav');
      if (nav) nav.style.backgroundColor = '#0f0f0f';
    } else {
      root.removeAttribute('data-theme');
      // Apply light theme styles
      body.style.backgroundColor = '#e0e0e0';
      body.style.color = '#202020';
      // Update navigation
      const nav = document.querySelector('nav');
      if (nav) nav.style.backgroundColor = '#1d1d1d';
    }
  }
}

// Scroll Progress Bar
class ScrollProgress {
  constructor() {
    this.progressBar = document.getElementById('scroll-progress');
    this.init();
  }
  
  init() {
    if (this.progressBar) {
      window.addEventListener('scroll', () => this.updateProgress());
    }
  }
  
  updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    this.progressBar.style.width = scrollPercent + '%';
  }
}

// Loading Screen
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.init();
  }
  
  init() {
    if (this.loadingScreen) {
      // Simulate loading time
      setTimeout(() => {
        this.hide();
      }, 2500);
    }
  }
  
  hide() {
    this.loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
    }, 500);
  }
}

// Enhanced Performance with requestAnimationFrame
function optimizedResize(callback) {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(callback, 100);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  const loadingScreen = new LoadingScreen();
  const themeToggle = new ThemeToggle();
  const scrollProgress = new ScrollProgress();
  const scrollAnimations = new ScrollAnimations();
  
  // Initialize particles
  const particlesCanvas = document.getElementById('particles-canvas');
  let particleSystem;
  if (particlesCanvas) {
    particleSystem = new ParticleSystem(particlesCanvas);
  }
  
  // Initialize typing animation
  const typedElement = document.getElementById('typed-text');
  if (typedElement) {
    new TypingAnimation(typedElement, [
      "I'm Anabel Sieber",
      "I'm a Software Engineer",
      "I'm a Full-Stack Developer",
      "I'm a Problem Solver",
      "I'm ready to innovate"
    ]);
  }
  
  // Existing navigation functionality
  const navItems = document.querySelectorAll(".nav-item");
  const menuButton = document.querySelector("i.fa-solid.fa-bars");
  const mobileMenu = document.querySelector("nav ul.minimized-menu");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((a) => {
        a.classList.remove("active");
      });

      item.classList.add("active");
      if (mobileMenu) mobileMenu.classList.remove("active");
    });
  });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
    });
  }

  // Enhanced project navigation
  document.querySelectorAll(".project").forEach((projectElement) => {
    const projectContainer = projectElement.querySelector(".project-container");
    if (!projectContainer) return;
    
    const projectClass = projectContainer.classList[1];
    const leftArrow = projectElement.querySelector(".fa-chevron-left");
    const rightArrow = projectElement.querySelector(".fa-chevron-right");

    if (!rightArrow || !leftArrow) {
      return;
    }

    rightArrow.addEventListener("click", () => {
      updateImage(projectClass, "right");
    });
    leftArrow.addEventListener("click", () => {
      updateImage(projectClass, "left");
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Update active navigation item
        updateActiveNavItem(targetId);
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Function to update active navigation item
  function updateActiveNavItem(targetId) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to corresponding nav items
    document.querySelectorAll(`a[href="${targetId}"] .nav-item`).forEach(item => {
      item.classList.add('active');
    });
  }
  
  // Update active nav item on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], header[id]');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for navigation height
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = '#' + section.getAttribute('id');
      }
    });
    
    if (currentSection) {
      updateActiveNavItem(currentSection);
    }
  });
  
  // Add floating animation to profile image
  const profileImage = document.querySelector('.my-photo img');
  if (profileImage) {
    profileImage.classList.add('floating');
  }
  
  // Optimized resize handler
  optimizedResize(() => {
    if (particleSystem) {
      particleSystem.resize();
    }
  });
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (particleSystem) {
      particleSystem.destroy();
    }
  });
});

function updateImage(projectClass, direction) {
  const projectImages = imageSources[projectClass];
  let currentIndex = currentIndexes[projectClass];

  if (projectImages.length <= 1) {
    return;
  }

  if (direction === "left") {
    currentIndex =
      (currentIndex - 1 + projectImages.length) % projectImages.length;
  } else if (direction === "right") {
    currentIndex = (currentIndex + 1) % projectImages.length;
  }

  const projectContainer = document.querySelector(
    `.project-container.${projectClass}`
  );
  const imgElement = projectContainer.querySelector("img");
  
  // Add transition effect
  imgElement.style.opacity = '0.5';
  imgElement.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    imgElement.src = projectImages[currentIndex];
    imgElement.style.opacity = '1';
    imgElement.style.transform = 'scale(1)';
  }, 150);

  currentIndexes[projectClass] = currentIndex;
}
