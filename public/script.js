document.addEventListener('DOMContentLoaded', loadNews);

document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title && content) {
        const newsItem = { title, content };

        fetch('/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newsItem),
        })
        .then(response => response.json())
        .then(data => {
            addNewsToList(data);
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        });
    }
});

function addNewsToList(newsItem) {
    const newsList = document.getElementById('newsList');
    const newsElement = document.createElement('div');
    newsElement.className = 'news-item';
    newsElement.innerHTML = `<h2>${newsItem.title}</h2><p>${newsItem.content}</p>`;
    newsList.prepend(newsElement);
}

function loadNews() {
    fetch('/api/news')
    .then(response => response.json())
    .then(data => {
        data.forEach(newsItem => {
            addNewsToList(newsItem);
        });
    });
}
