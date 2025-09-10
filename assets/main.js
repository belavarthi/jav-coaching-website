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

  // Newsletter signup functionality
  const newsletter = document.querySelector('[data-newsletter]');
  if (newsletter) {
    newsletter.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = new FormData(newsletter).get('email');
      const submitButton = newsletter.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Basic email validation
      if (!email || !email.includes('@')) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Show loading state
      submitButton.textContent = 'Subscribing...';
      submitButton.disabled = true;
      
      try {
        const response = await fetch('/api/newsletter-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
          showNewsletterMessage(data.message, 'success');
          newsletter.reset();
        } else {
          showNewsletterMessage(data.message || 'Oops, something went wrong. Please try again.', 'error');
        }
        
      } catch (error) {
        console.error('Newsletter signup error:', error);
        showNewsletterMessage('Oops, something went wrong. Please try again.', 'error');
      } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
  
  // Helper function to show newsletter messages
  function showNewsletterMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `newsletter-message newsletter-message--${type}`;
    messageEl.textContent = message;
    
    // Insert after the newsletter form
    const newsletter = document.querySelector('[data-newsletter]');
    if (newsletter) {
      newsletter.parentNode.insertBefore(messageEl, newsletter.nextSibling);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.remove();
        }
      }, 5000);
    }
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

