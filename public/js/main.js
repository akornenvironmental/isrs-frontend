/**
 * ISRS Main JavaScript
 * Handles mobile menu, forms, and analytics event tracking
 */

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Track Donate Button Clicks
document.addEventListener('DOMContentLoaded', () => {
  // Track all donate button clicks
  const donateButtons = document.querySelectorAll('.btn-donate, a[href*="zeffy.com"]');
  donateButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (window.ISRSAnalytics) {
        window.ISRSAnalytics.trackDonation();
      }
    });
  });

  // Track outbound links
  const outboundLinks = document.querySelectorAll('a[target="_blank"]');
  outboundLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.ISRSAnalytics) {
        window.ISRSAnalytics.trackOutboundLink(link.href, link.textContent);
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Track form submission
      if (window.ISRSAnalytics) {
        window.ISRSAnalytics.trackFormSubmission('contact_form');
      }

      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      try {
        // Here you would send to your backend
        // For now, just show success message
        alert('Thank you for your message! We will be in touch shortly.');
        contactForm.reset();

        // Optional: Send to backend API
        // const response = await fetch('https://isrs-database-backend.onrender.com/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });

      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again.');
      }
    });
  }

  // Track navigation clicks
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.ISRSAnalytics) {
        window.ISRSAnalytics.trackEvent('navigation_click', {
          'link_text': link.textContent,
          'link_url': link.href
        });
      }
    });
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.querySelector('.mobile-menu-toggle');

  if (navLinks && navLinks.classList.contains('active')) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  }
});
