/**
 * Jenison V's Portfolio JS - Luxury Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initMobileMenu();
  initTimelineTabs();
  initThemeToggle();
  initScrollEffects();
  initFormSubmissions();
  
  // Luxury enhancements
  initMouseSpotlight();
  initStatsCounter();
  initProjectFilter();
});

/* ==========================================================================
   TYPING TEXT ANIMATION
   ========================================================================== */
function initTypingAnimation() {
  const typedTextSpan = document.getElementById('typed-text');
  if (!typedTextSpan) return;

  const roles = ["Full Stack Developer", "Web Developer", "Programmer"];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newRoleDelay = 2200; 
  
  let roleIdx = 0;
  let charIdx = 0;
  let isErasing = false;

  function type() {
    const currentRole = roles[roleIdx];

    if (!isErasing) {
      typedTextSpan.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === currentRole.length) {
        isErasing = true;
        setTimeout(type, newRoleDelay);
      } else {
        setTimeout(type, typingSpeed);
      }
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isErasing = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 600); 
      } else {
        setTimeout(type, erasingSpeed);
      }
    }
  }

  setTimeout(type, 800);
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('bx-menu');
      icon.classList.toggle('bx-x');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('show');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
      }
    }
  });
}

/* ==========================================================================
   TIMELINE TABS SWITCHER
   ========================================================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.timeline-content-pane').forEach(pane => {
        pane.classList.remove('active');
      });

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   THEME SWITCHING (LIGHT / DARK)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light') {
    setLightTheme();
  } else if (savedTheme === 'dark') {
    setDarkTheme();
  } else if (systemPrefersDark) {
    setDarkTheme();
  } else {
    setLightTheme();
  }

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  });

  function setLightTheme() {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  }

  function setDarkTheme() {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

/* ==========================================================================
   SCROLL EFFECTS (ScrollSpy & Element Reveal)
   ========================================================================== */
function initScrollEffects() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

  // ScrollSpy
  function scrollSpy() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSectionId) {
          link.classList.add('active');
        }
      });

      mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSectionId) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', scrollSpy);
  scrollSpy();

  // Scroll Reveal (Intersection Observer)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('element-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   FORM SUBMISSIONS WITH DESIGNER TOASTS
   ========================================================================== */
function initFormSubmissions() {
  const contactForm = document.getElementById('contactForm');
  const subscribeForm = document.getElementById('subscribeForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name && email && message) {
        showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
        contactForm.reset();
      } else {
        showToast('Please fill out all contact fields.', 'error');
      }
    });
  }

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('firstname').value.trim();
      const email = document.getElementById('emailSub').value.trim();

      if (name && email) {
        showToast(`Awesome, ${name}! You are subscribed to updates.`, 'success');
        subscribeForm.reset();
      } else {
        showToast('Please fill out both email fields.', 'error');
      }
    });
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const iconClass = type === 'success' ? 'bx-check-circle' : 'bx-info-circle';
  toast.innerHTML = `
    <i class="bx ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-exit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 4500);
}

// Exit animation style helper
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes toast-exit {
  100% { transform: translateY(-20px); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);


/* ==========================================================================
   LUXURY ENHANCEMENT: MOUSE SPOTLIGHT (Frosted Glass Glow Follower)
   ========================================================================== */
function initMouseSpotlight() {
  const cards = document.querySelectorAll('.spotlight-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   LUXURY ENHANCEMENT: ANIMATED STATISTICS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.stat-number');
  if (statsElements.length === 0) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
        observer.disconnect(); // Animate only once
      }
    });
  }, {
    threshold: 0.3
  });

  // Watch the hero container
  const heroSection = document.getElementById('home');
  if (heroSection) {
    observer.observe(heroSection);
  }

  function animateCounters() {
    statsElements.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const countLabel = stat.querySelector('span'); // Keep the "+"
      
      let count = 0;
      const duration = 1200; // Total animation length in ms
      const stepTime = Math.max(Math.floor(duration / target), 30);
      
      const timer = setInterval(() => {
        count++;
        stat.childNodes[0].textContent = count; // Replace prefix without removing span
        
        if (count >= target) {
          stat.childNodes[0].textContent = target; // Ensure exact final value
          clearInterval(timer);
        }
      }, stepTime);
    });
  }
}

/* ==========================================================================
   LUXURY ENHANCEMENT: DYNAMIC PROJECTS GRID FILTER
   ========================================================================== */
function initProjectFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterTabs.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active states
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Show card
          card.classList.remove('hide');
        } else {
          // Hide card
          card.classList.add('hide');
        }
      });
    });
  });
}
