
const titleElemnt = document.querySelector('.container h1');
const shortDescr = document.querySelector('.container .lead');
const tags = document.querySelector('.tags');

//Fetch card data and populate the page
document.addEventListener('DOMContentLoaded', async () => {
  const id = window.location.pathname.split('/').pop();
  try {
    const res = await fetch(`/api/card/${id}`);
    const data = await res.json();
    await displayUserData(data)
  } catch (error) {
    console.error('Error fetching card data:', error);
  }
});

// Display data in Card template
async function displayUserData(dataRes) {
  titleElemnt.textContent = dataRes.name;
  shortDescr.textContent = dataRes.short_descr;
  dataRes.relatetTopics.forEach(relTopic => {
    const tag = document.createElement('span');
    tag.innerHTML = `
    <span class="tag">${relTopic.connected_topic_id}</span>
    `
    tags.appendChild(tag)
  });

}