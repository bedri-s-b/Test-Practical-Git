
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

/*Adding, checking, recording a new example in db*/

//-------> Example start

// Add a listener to the entry point
exampleHref.addEventListener('click', async (e) => {
  e.preventDefault();
  const navExample = document.querySelector('.nav-example')
  let result = document.querySelector('.example-form');
  if (!result) {
    navExample.insertAdjacentElement('afterend', showForm());
    const addForm = document.querySelector('.add-btn');
    await addEventListenerToForm();
  }
});

// Dynamic form
function showForm() {
  const form = document.createElement('div');
  form.innerHTML = `
    <div class="single-view example-form">
                <form action="/api/example/${id}" id="add-example" class="card" method="POST">
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
                        <label for="example">Пример</label>
                        <textarea id="example" name="example" rows="4" required></textarea>
                    </section>
                    <section  class="example">
                        <button type="submit" class="add-btn">Добави пример</button>
                    </section>
                </form>
            </div>
  `
  return form;
}

// Sent the data to Server
async function addEventListenerToForm(form) {
  document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const example = document.querySelector('#example').value.trim();

    if (!title) {
      alert('Моля, въведете заглавие на примера.');
      return;
    };

    if (!description) {
      alert('Моля, въведете обяснение обяснението.');
      return;
    };

    if (!example) {
      alert('Моля, въведете обяснение примера.');
      return;
    };

    const formData = {
      title,
      description,
      example,
      tipicId: id
    };

    const res = await fetch('/api/example/:id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Новият пример е добавен успешно!');
      window.location.href = `/card/${id}`;
    } else {
      alert('Възникна грешка при добавянето на новия cheat sheet. Моля, опитайте отново.');
    }

  })
};

//-------> Example end