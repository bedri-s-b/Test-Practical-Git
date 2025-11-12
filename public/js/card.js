
const titleElemnt = document.querySelector('.container h1');
const shortDescr = document.querySelector('.container .lead');

//Fetch card data and populate the page
document.addEventListener('DOMContentLoaded', async () => {
  const id = window.location.pathname.split('/').pop();
  try {
    const res = await fetch(`/api/card/${id}`);
    const data = await res.json();
    titleElemnt.textContent = data.name;
    shortDescr.textContent = data.short_descr;
  } catch (error) {
    console.error('Error fetching card data:', error);
  }
});
