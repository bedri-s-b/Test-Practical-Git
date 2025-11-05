  
  
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      })
    });

    // Initialize the user data
    document.addEventListener('DOMContentLoaded', async () => {
      try {
        const response = await fetch('/index');
        console.log('User data fetched successfully:', response);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('User data fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });

    // Fetch and display the user data
    async function displayUserData() {
      const response = await fetch('/index');
      const data = await response.json();
      console.log('User data fetched successfully:', data);
    }
