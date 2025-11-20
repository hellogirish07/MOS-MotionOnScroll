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

  // Add copy buttons to installation code blocks
  (function addCopyButtons() {
    const installationCodeBlocks = document.querySelectorAll('.installation .code-block');
    installationCodeBlocks.forEach(cb => {
      // create button
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copy';
      cb.appendChild(btn);

      btn.addEventListener('click', async () => {
        // collect text from all <code> children
        const codes = cb.querySelectorAll('code');
        const text = Array.from(codes).map(c => c.innerText.replace(/\u00A0/g, ' ')).join('\n');
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          btn.classList.add('copied');
          const previous = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Copied';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = previous;
          }, 1800);
        } catch (err) {
          btn.innerHTML = 'Failed';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copy';
          }, 1400);
        }
      });
    });
  })();

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
  const navLinks = document.getElementById('navLinks');

  const setHamburger = () => {
    changeIcon.classList.add('fa-bars');
    changeIcon.classList.remove('fa-times');
  };
  const setClose = () => {
    changeIcon.classList.add('fa-times');
    changeIcon.classList.remove('fa-bars');
  };
  const updateIcon = () => {
    if (navLinks && navLinks.classList.contains('mobile-open')) setClose();
    else setHamburger();
  };

  // Ensure icon matches initial state
  updateIcon();

  if (menuBtn) {
    // After the other click handler toggles the menu, update the icon
    menuBtn.addEventListener('click', () => {
      // let the DOM toggle run first (existing handler), then sync icon
      setTimeout(updateIcon, 0);
    });
  }

  // Keep icon in sync if nav's class changes elsewhere (clicking links or outside)
  if (navLinks && window.MutationObserver) {
    const mo = new MutationObserver(updateIcon);
    mo.observe(navLinks, { attributes: true, attributeFilter: ['class'] });
  } else {
    // Fallback: watch clicks that might close the menu
    document.addEventListener('click', () => setTimeout(updateIcon, 0));
    document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', updateIcon));
  }
}
