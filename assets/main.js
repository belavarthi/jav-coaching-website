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
});

