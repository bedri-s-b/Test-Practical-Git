 
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

    function updateTopicUI(){
      const checked = topicChecks.filter(c => c.checked).map(c=>c.value);
      if(checked.includes('other')) topicInputWrap.style.display = 'block';
      else topicInputWrap.style.display = 'none';
      topicField.value = checked.filter(s=>s!=='other').join(',') || '';
    }

    topicChecks.forEach(c => c.addEventListener('change', updateTopicUI));
    newTopicInput.addEventListener('input', ()=>{
      const checked = topicChecks.filter(c => c.checked).map(c=>c.value).filter(s=>s!=='other');
      if(newTopicInput.value.trim()) checked.push(newTopicInput.value.trim());
      topicField.value = checked.join(',');
    });

    addForm.addEventListener('submit', ()=>{
      const checked = topicChecks.filter(c => c.checked).map(c=>c.value);
      const chosen = checked.filter(s=>s!=='other');
      if(checked.includes('other')){
        if(newTopicInput.value.trim()) chosen.push(newTopicInput.value.trim());
        else chosen.push('root');
      }
      topicField.value = chosen.join(',') || 'root';
    });


  // public/js/add.js
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('addForm');
//   const message = document.getElementById('message');

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const title = document.getElementById('title').value.trim();
//     const content = document.getElementById('content').value.trim();

//     if (!title || !content) {
//       message.textContent = '⚠️ Попълни всички полета.';
//       return;
//     }

//     try {
//       const response = await fetch('/api/sample-data', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, content })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         message.textContent = '✅ Успешно добавен запис!';
//         form.reset();
//       } else {
//         message.textContent = '❌ Грешка: ' + (data.error || 'Нещо се обърка.');
//       }
//     } catch (err) {
//       console.error(err);
//       message.textContent = '⚠️ Проблем с връзката към сървъра.';
//     }
//   });
// });