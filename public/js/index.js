import { scrolling } from './common.js';


// Smooth scrolling for internal links
// document.querySelectorAll('a[href^="#"]').forEach(a => {
//   a.addEventListener('click', e => {
//     const href = a.getAttribute('href');
//     if (href.length > 1) {
//       e.preventDefault();
//       const el = document.querySelector(href);
//       if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   })
// });

scrolling();

// Initialize the user data
document.addEventListener('DOMContentLoaded', async () => { 
  try {
    const response = await fetch('/index');
    const data = await displayUserData(response);
    if (!response.ok) throw new Error('Network response was not ok');
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

// Fetch and display the user data
async function displayUserData(res) {
  const data = await res.json();
  // Display the user data on the page
  const container = document.querySelector('.grid');
  const addArticle = document.querySelector('.card-add');
  container.removeChild(addArticle);
  data.forEach(item => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.id = `topic-${item.topic_id}`;
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.short_descr}</p>
      <div class="links">
        <a href="#topic-${item.topic_id}">Преглед</a>
        <a href="https://example.com/${item.topic_id}" target="_blank" rel="noopener">Чети повече</a>
      </div>
    `;
    container.appendChild(card);
    container.appendChild(addArticle);
  });

  // console.log('User data fetched successfully:', data);
  return data;
}
