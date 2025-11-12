
import { scrolling } from './common.js';

scrolling();

// Topic selection logic (checkbox list)
const topicChecks = Array.from(document.querySelectorAll('input[name="topicChk"]'));
const topicInputWrap = document.querySelector('.topic-input');
const newTopicInput = document.getElementById('newTopic');
const topicField = document.getElementById('topicField');
const addForm = document.querySelector('.add-form');
const topicListContainer = document.querySelector('.topic-list');
const otherCheckbox = document.querySelector('input[value="other"]');

// Get all topicts from the server and populate the checkbox list
async function fetchTopics() {
  try { 
    const res = await fetch('/topics/names');
    const data = await res.json();
    data.forEach(topic => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" name="topicChk" value="${topic.name}"> ${topic.name}
      `;
      const checkbox = label.querySelector('input[type="checkbox"]');
      topicChecks.push(checkbox);
      topicListContainer.appendChild(label);
    });
      topicListContainer.appendChild(otherCheckbox.parentNode);
  } catch (error) {
    console.error('Error fetching topics:', error);
  }
}
addEventListener('DOMContentLoaded', fetchTopics);

//Show new topic input if "other" is checked
otherCheckbox.addEventListener('change', () => {
  if (otherCheckbox.checked) topicInputWrap.style.display = 'block';
  else topicInputWrap.style.display = 'none';});

// Add new card form submission
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

  const res = await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (res.ok) {
    alert('Новият cheat sheet е добавен успешно!');
    window.location.href = '/';
  } else {
    alert('Възникна грешка при добавянето на новия cheat sheet. Моля, опитайте отново.');
  }

});


