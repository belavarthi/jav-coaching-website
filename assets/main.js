document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - JavaScript is running!');
  
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }


  const contact = document.querySelector('[data-contact]');
  if (contact) {
    contact.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contact).entries());
      console.log('Contact submission (stub):', data);
      alert('Thanks! We will get back to you within 1 business day.');
      contact.reset();
    });
  }

  // FAQ section is now static - no JavaScript needed

  // Newsletter form uses simple Formspree submission - no JavaScript needed

  // Newsletter Popup functionality
  const newsletterPopup = document.getElementById('newsletter-popup');
  const popupClose = document.getElementById('popup-close');
  const popupDismiss = document.getElementById('popup-dismiss');
  
  // Check if user just subscribed (returned from Formspree)
  const urlParams = new URLSearchParams(window.location.search);
  const justSubscribed = urlParams.get('subscribed') === 'true';
  
  // If user just subscribed, mark them as subscribed and clean up URL
  if (justSubscribed) {
    localStorage.setItem('newsletterSubscribed', 'true');
    // Clean up the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  
  // Check if user has already subscribed
  const hasSubscribed = localStorage.getItem('newsletterSubscribed');
  
  // Show popup after 2 seconds only if user hasn't subscribed
  if (!hasSubscribed) {
    setTimeout(() => {
      if (newsletterPopup) {
        newsletterPopup.style.display = 'flex';
        newsletterPopup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    }, 2000);
  }
  
  // Close popup functions
  function closePopup() {
    if (newsletterPopup) {
      newsletterPopup.style.display = 'none';
      newsletterPopup.classList.remove('show');
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  }
  
  // Close popup when X button is clicked
  if (popupClose) {
    popupClose.addEventListener('click', () => {
      closePopup();
    });
  }
  
  // Close popup when "No Thanks" button is clicked
  if (popupDismiss) {
    popupDismiss.addEventListener('click', () => {
      closePopup();
    });
  }
  
  // Close popup when clicking outside the content
  if (newsletterPopup) {
    newsletterPopup.addEventListener('click', (e) => {
      if (e.target === newsletterPopup) {
        closePopup();
      }
    });
  }
  
  // Close popup with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsletterPopup && newsletterPopup.classList.contains('show')) {
      closePopup();
    }
  });
});

