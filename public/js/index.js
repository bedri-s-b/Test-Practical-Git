import { scrolling } from './common.js';

// Smooth scrolling for internal links
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
  const container = document.querySelector('.grid');
  data.forEach(item => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.id = `topic-${item.topic_id}`;
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.short_descr}</p>
      <div class="links">
        <a href="/card/${item.topic_id}">Преглед</a>
      </div>
    `;
    container.appendChild(card);
  });
  return data;
}
