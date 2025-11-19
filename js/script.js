const changeIcon = document.querySelector('.mobile-menu-btn i');

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const opened = navLinks.classList.toggle('mobile-open');
      menuBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    // Close when clicking a link
    document.querySelectorAll('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('mobile-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside nav
    document.addEventListener('click', function (e) {
      if (!e.target.closest('nav')) {
        navLinks.classList.remove('mobile-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Back-to-top show/hide based on hero visibility
  const backToTop = document.querySelector('.back-to-top');
  const hero = document.querySelector('#hero');

  if (backToTop && hero) {
    // Smooth scroll to top on click
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            backToTop.classList.remove('visible');
          } else {
            backToTop.classList.add('visible');
          }
        });
      }, { threshold: 0.15 });

      io.observe(hero);
    } else {
      // Fallback: show button after scrolling 300px
      const onScroll = function () {
        if (window.scrollY > 300) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    }
  }

});

// Contact form handler
const form = document.getElementById('contactForm');
const result = document.getElementById('result');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const subject = `${name} sent a message from MotionOnScroll MOS website`;
    
    formData.append('subject', subject);
    
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      result.innerHTML = json.message;
      result.style.color = "green";
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
      result.style.color = "red";
    })
    .finally(() => {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
  });
}

// Mobile menu icon toggle 
if (changeIcon) {
  const menuBtn = document.getElementById('mobileMenuBtn');
  menuBtn.addEventListener('click', function () {
    changeIcon.classList.toggle('fa-bars');
    changeIcon.classList.toggle('fa-times');
  });
}