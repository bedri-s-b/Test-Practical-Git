// -------------------- Селектори --------------------
const titleElemnt = document.querySelector('.container h1');
const shortDescr = document.querySelector('.container .lead');
const tags = document.querySelector('.tags');
const main = document.querySelector('main');
const exampleBtn = document.querySelector('#add-example');
const id = window.location.pathname.split('/').pop();

// Контейнер за examples
const examplesContainer = document.createElement('div');
examplesContainer.id = 'examples-container';
main.appendChild(examplesContainer);

// -------------------- Fetch card data --------------------
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(`/api/card/${id}`);
    const data = await res.json();

    displayUserData(data);
    displayExamples(data.examples);

    exampleBtn.href = `/card/example/${id}`;
  } catch (error) {
    console.error('Error fetching card data:', error);
  }
});

// -------------------- Display card data --------------------
function displayUserData(dataRes) {
  titleElemnt.textContent = dataRes.name;
  shortDescr.textContent = dataRes.short_descr;

  dataRes.relatetTopics.forEach(relTopic => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = relTopic.connected_topic_id;
    tags.appendChild(tag);
  });
}

// -------------------- Display examples --------------------
function displayExamples(examples) {
  examples.forEach(e => {
    const singleView = document.createElement('div');
    singleView.id = e.example_id;

    singleView.innerHTML = `
      <div class="single-view">
        <article class="card" aria-labelledby="card1-title">
          <header>
            <h3 id="card1-title">${e.name}</h3>
            <p class="muted">Кратко обяснение за бърз достъп</p>
          </header>

          <p class="card-desc">${e.description}</p>

          <section class="examples">
            <h4>Пример</h4>
            <pre><code>${e.example}</code></pre>

            <nav class="top-nav">
              <ul>
                <li><a href="#" class="edit-btn" data-id="${e.example_id}">Редактирай</a></li>
                <li><a href="#" class="delete-btn" data-id="${e.example_id}">Изтрий</a></li>
              </ul>
            </nav>
          </section>
        </article>
      </div>
    `;

    examplesContainer.appendChild(singleView);
  });
}

// -------------------- Добавяне на нов пример --------------------
exampleBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const navExample = document.querySelector('.nav-example');
  if (!document.querySelector('.example-form')) {
    navExample.insertAdjacentElement('afterend', showForm());
  }
});

// -------------------- Функция за създаване на формата --------------------
function showForm(example) {
  const formWrapper = document.createElement('div');
  formWrapper.className = 'single-view example-form';

  formWrapper.innerHTML = `
    <form class="card" method="POST">
      <header><h3>${example ? 'Редактирай пример' : 'Добави пример'}</h3></header>

      <section class="example">
        <label for="title">Заглавие</label>
        <input type="text" id="title" name="title" value="${example ? example.name : ''}" required>
      </section>

      <section class="example">
        <label for="description">Описание</label>
        <textarea id="description" name="description" rows="4" required>${example ? example.description : ''}</textarea>
      </section>

      <section class="example">
        <label for="example">Пример</label>
        <textarea id="example" name="example" rows="4" required>${example ? example.example : ''}</textarea>
      </section>

      <section class="example">
        <button type="submit" class="add-btn">${example ? 'Запази' : 'Добави пример'}</button>
      </section>
    </form>
  `;

  // Спиране на bubble, за да не се задейства click listener-а на контейнера
  formWrapper.addEventListener('click', (e) => e.stopPropagation());

  return formWrapper;
}

// -------------------- Submit на формата --------------------
examplesContainer.addEventListener('submit', async (e) => {
  const form = e.target.closest('form');
  if (!form) return;

  e.preventDefault();

  const title = form.querySelector('#title').value.trim();
  const description = form.querySelector('#description').value.trim();
  const exampleText = form.querySelector('#example').value.trim();

  if (!title || !description || !exampleText) {
    alert('Попълнете всички полета!');
    return;
  }

  const formData = {
    title,
    description,
    example: exampleText,
    tipicId: id
  };

  const res = await fetch('/api/example/:id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (res.ok) {
    alert('Примерът е записан успешно!');
    window.location.reload();
  } else {
    alert('Възникна грешка, опитайте отново.');
  }
});

// -------------------- Event delegation за бутоните --------------------
examplesContainer.addEventListener('click', async (e) => {
  // EDIT
  if (e.target.classList.contains('edit-btn')) {
    e.preventDefault();
    const exampleId = e.target.dataset.id;

    const res = await fetch('/api/example/' + exampleId);
    const data = await res.json();

    const oldBlock = document.getElementById(exampleId);
    const form = showForm(data[0]);
    oldBlock.replaceWith(form);
    return;
  }

  // DELETE
  if (e.target.classList.contains('delete-btn')) {
    e.preventDefault();
    const exampleId = e.target.dataset.id;
    if (confirm('Сигурни ли сте, че искате да изтриете този пример?')) {
      await fetch('/api/example/' + exampleId, { method: 'DELETE' });
      const oldBlock = document.getElementById(exampleId);
      oldBlock.remove();
    }
  }
});
