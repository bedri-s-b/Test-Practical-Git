
const titleElemnt = document.querySelector('.container h1');
const shortDescr = document.querySelector('.container .lead');
const tags = document.querySelector('.tags');
const main = document.querySelector('main');

//Fetch card data and populate the page
document.addEventListener('DOMContentLoaded', async () => {
  const id = window.location.pathname.split('/').pop();
  try {
    const res = await fetch(`/api/card/${id}`);
    const data = await res.json();
    await displayUserData(data)
    await diplayExamples(data.examples)
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

// Display all related examples
async function diplayExamples(examples) {
  examples.forEach(e => {
    const singelView = document.createElement('div');
    singelView.innerHTML = `
       <div class="single-view">
                <!-- Single card view (JavaScript example) -->
                <article class="card" aria-labelledby="card1-title">
                    <header>
                        <h3 id="card1-title">${e.name}</h3>
                        <p class="muted">Кратко обяснение за бърз достъп</p>
                    </header>
                    <p class="card-desc">${e.description}</p>

                    <section class="examples">
                        <h4>Пример</h4>
                        <pre><code>
                        ${e.example}
            </code> <nav class="top-nav">
                        <ul>
                            <li><a href="#">Редактирай</a></li>
                            <li><a href="#">Изтрий</a></li>
                        </ul>
                    </nav></pre>
                    </section>

                </article>

            </div>
    `
    console.log(singelView);
    main.appendChild(singelView)

  })
}