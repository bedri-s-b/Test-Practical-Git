
//Fetch card data and populate the page
document.addEventListener('DOMContentLoaded', async () => {
  const id = window.location.pathname.split('/').pop();
  try {
    const res = await fetch(`/api/card/${id}`);
    const data = await res.json();

    document.querySelector('h3').textContent = data.title;
    document.querySelector('.card-desc').textContent = data.description;
  } catch (error) {
    console.error('Error fetching card data:', error);
  }
});
