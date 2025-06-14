// Sample video data (replace with your videos)
const videos = [
    {
        id: 1,
        title: "Sample Video 1",
        thumbnail: "/thumb1.png",
        src: "/video1.mp4",
        description: "This is the first sample video.",
        duration: "2:08"
    },
    {
        id: 2,
        title: "Sample Video 2",
        thumbnail: "/thumb1.png",
        src: "/video1.mp4",
        description: "This is the second sample video.",
        duration: "3:45"
    }
    // Add more videos here
];

// Populate video grid
function populateVideoGrid(filteredVideos = videos) {
    const videoGrid = document.getElementById('video-grid');
    if (videoGrid) {
        videoGrid.innerHTML = '';
        filteredVideos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden';
            videoCard.innerHTML = `
                <a href="video.html?id=${video.id}">
                    <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">${video.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">${video.description}</p>
                        <span class="text-gray-500 dark:text-gray-500 text-sm">${video.duration}</span>
                    </div>
                </a>
            `;
            videoGrid.appendChild(videoCard);
        });
    }
}

// Populate video player
function populateVideoPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = parseInt(urlParams.get('id'));
    const video = videos.find(v => v.id === videoId);
    if (video) {
        document.getElementById('video-source').src = video.src;
        document.getElementById('video-player').load();
        document.getElementById('video-title').textContent = video.title;
        document.getElementById('video-description').textContent = video.description;
        populateRelatedVideos(videoId);
    }
}

// Populate related videos
function populateRelatedVideos(currentVideoId) {
    const relatedVideos = videos.filter(v => v.id !== currentVideoId);
    const relatedContainer = document.getElementById('related-videos');
    if (relatedContainer) {
        relatedContainer.innerHTML = '';
        relatedVideos.forEach(video => {
            const relatedCard = document.createElement('div');
            relatedCard.className = 'flex space-x-2';
            relatedCard.innerHTML = `
                <a href="video.html?id=${video.id}" class="flex space-x-2">
                    <img src="${video.thumbnail}" alt="${video.title}" class="w-24 h-14 object-cover rounded">
                    <div>
                        <h3 class="text-sm font-semibold">${video.title}</h3>
                        <span class="text-gray-500 dark:text-gray-500 text-xs">${video.duration}</span>
                    </div>
                </a>
            `;
            relatedContainer.appendChild(relatedCard);
        });
    }
}

// Sidebar toggle
document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('theme-toggle').querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(query) || video.description.toLowerCase().includes(query));
    populateVideoGrid(filteredVideos);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('video-grid')) {
        populateVideoGrid();
    }
    if (document.getElementById('video-player')) {
        populateVideoPlayer();
    }
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('theme-toggle').querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
});
