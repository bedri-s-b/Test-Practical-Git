
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

// Topic selection logic (checkbox list)
const topicChecks = Array.from(document.querySelectorAll('input[name="topicChk"]'));
const topicInputWrap = document.querySelector('.topic-input');
const newTopicInput = document.getElementById('newTopic');
const topicField = document.getElementById('topicField');
const addForm = document.querySelector('.add-form');

function updateTopicUI() {
  const checked = topicChecks.filter(c => c.checked).map(c => c.value);
  if (checked.includes('other')) topicInputWrap.style.display = 'block';
  else topicInputWrap.style.display = 'none';
  topicField.value = checked.filter(s => s !== 'other').join(',') || '';
}

topicChecks.forEach(c => c.addEventListener('change', updateTopicUI));
newTopicInput.addEventListener('input', () => {
  const checked = topicChecks.filter(c => c.checked).map(c => c.value).filter(s => s !== 'other');
  if (newTopicInput.value.trim()) checked.push(newTopicInput.value.trim());
  topicField.value = checked.join(',');
});

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const checked = topicChecks.filter(c => c.checked).map(c => c.value);
  const chosen = checked.filter(s => s !== 'other');

  const titleInput = document.getElementById('title');
  if (!titleInput.value.trim()) {
    alert('Моля, въведете заглавие за новия cheat sheet.');
    return;
  }
  const descInput = document.getElementById('description');
  if (!descInput.value.trim()) {
    alert('Моля, въведете кратко описание за новия cheat sheet.');
    return;
  }
  if (checked.includes('other')) {
    if (newTopicInput.value.trim()) chosen.push(newTopicInput.value.trim());
    else chosen.push('root');
  }
  topicField.value = chosen.join(',') || 'root';

  const formData = {
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    topics: chosen
  };
  console.log('Submitting new cheat sheet:', formData);

  const res = await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (res.ok) {
    alert('Новият cheat sheet е добавен успешно!');
    window.location.reload();
  } else {
    alert('Възникна грешка при добавянето на новия cheat sheet. Моля, опитайте отново.');
  }  

});


