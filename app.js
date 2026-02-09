async function loadIndex() {
  const res = await fetch('stories/index.json');
  const items = await res.json();
  const list = document.getElementById('story-list');
  list.innerHTML = '';
  for (const item of items) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = item.title;
    a.onclick = (e) => { e.preventDefault(); loadStory(item.file, item.title); };
    li.appendChild(a);
    list.appendChild(li);
  }
}

async function loadStory(filename, title) {
  const res = await fetch(`stories/${filename}`);
  const md = await res.text();
  const html = marked.parse(md);
  const container = document.getElementById('story-content');
  container.innerHTML = html;
  document.title = title;
}

loadIndex();
