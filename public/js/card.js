
const titleElemnt = document.querySelector('.container h1');
const shortDescr = document.querySelector('.container .lead');
const tags = document.querySelector('.tags');
const main = document.querySelector('main');
const exampleHref = document.querySelector('#add-example');
const id = window.location.pathname.split('/').pop();

//Fetch card data and populate the page
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(`/api/card/${id}`);
    const data = await res.json();
    await displayUserData(data);
    await diplayExamples(data.examples);
    exampleHref.href = `/card/example/${id}`
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
    main.appendChild(singelView)

  })
}

// Add example
exampleHref.addEventListener('click', (e) => {
  e.preventDefault();
  const navExample = document.querySelector('.nav-example') 
  navExample.insertAdjacentElement('afterend',showForm())

})

function showForm() {
  const form = document.createElement('div');
  form.innerHTML = `
    <div class="single-view">
                <form action="/add" id="add-example" class="card" method="POST">
                    <header>
                        <h3>Добави пример</h3>
                    </header>
                    <section  class="example">
                        <label for="title">Заглавие</label>
                        <input type="text" id="title" name="title" required>
                    </section>
                     <section  class="example">
                        <label for="description">Описание</label>
                        <textarea id="description" name="description" rows="4" required></textarea>
                    </section>
                    <section  class="example">
                        <button type="submit" class="add-btn">Добави пример</button>
                    </section>
                </form>
            </div>
  `
  return form;
}

