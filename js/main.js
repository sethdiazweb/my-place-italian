/**
 * My Place Italian Restaurant
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');

      // Animate hamburger icon
      const spans = navbarToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (navbarMenu.classList.contains('active')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
    });

    // Close menu when clicking a link
    const navLinks = navbarMenu.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarMenu.classList.remove('active');
        const spans = navbarToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarMenu.classList.remove('active');
        const spans = navbarToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      }
    });
  }

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // Smooth Scrolling for Anchor Links
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ============================================
  // Fade In Animation on Scroll
  // ============================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });
  }

  // ============================================
  // Contact Form Handling
  // ============================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Simple validation feedback
      const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
      let isValid = true;

      inputs.forEach(input => {
        if (input.required && !input.value.trim()) {
          input.style.borderColor = '#C41E3A';
          isValid = false;
        } else {
          input.style.borderColor = '#E8E0D8';
        }
      });

      if (isValid) {
        // Show success message
        alert('Thank you for your message! We\'ll get back to you as soon as possible.');
        contactForm.reset();
      }
    });

    // Real-time validation feedback
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.required && !this.value.trim()) {
          this.style.borderColor = '#C41E3A';
        } else {
          this.style.borderColor = '#E8E0D8';
        }
      });

      input.addEventListener('focus', function() {
        this.style.borderColor = '#C41E3A';
      });
    });
  }

  // ============================================
  // Phone Number Click Tracking (Optional)
  // ============================================
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Could add analytics tracking here
      console.log('Phone call initiated');
    });
  });

  // ============================================
  // Active Navigation Link
  // ============================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
