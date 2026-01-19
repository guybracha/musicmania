import { Album } from "./class/Album.js";
const albums = [
    new Album("The Rise and Fall of Ziggy Stardust and the Spiders from Mars", 1972, "David Bowie", "https://upload.wikimedia.org/wikipedia/en/0/01/ZiggyStardust.jpg"),
    new Album("Sgt. Pepper's Lonely Hearts Club Band", 1967, "The Beatles", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZ1pXmmf-BhcSCwaI5cAz-iOjjChRwcyEBw&s"),
    new Album("Thriller", 1982, "Michael Jackson", "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"),
    new Album("Back in Black", 1980, "AC/DC", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG563E6p5rw9Qg98N8M53jGTyu2tiAj9oHQA&s"),
    new Album("Rumours", 1977, "Fleetwood Mac", "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG"),
    new Album("Brothers in Arms", 1985, "Dire Straits", "https://upload.wikimedia.org/wikipedia/en/6/67/DS_Brothers_in_Arms.jpg")
];
function renderAlbums(list) {
    const grid = document.getElementById("albumsGrid");
    if (!grid)
        return;
    grid.innerHTML = "";
    list.forEach((album, index) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-4";
        col.innerHTML = `
      <div class="card album-card h-100">
        <div class="album-img-wrap">
          <img class="card-img-top album-img" src="${album.imageUrl}" alt="${album.title}">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title mb-1">${album.title}</h5>
          <p class="card-text text-muted mb-2">${album.artist}</p>
          <span class="badge album-badge mt-auto">${album.year}</span>
        </div>
      </div>
    `;
        grid.appendChild(col);
        // GSAP animations
        gsap.from(col, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
        });
        const card = col.querySelector(".album-card");
        if (card) {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }
    });
}
function updateStatistics(list) {
    const totalAlbumsEl = document.getElementById("totalAlbums");
    const earliestYearEl = document.getElementById("earliestYear");
    const latestYearEl = document.getElementById("latestYear");
    if (totalAlbumsEl) {
        totalAlbumsEl.textContent = list.length.toString();
    }
    if (list.length > 0) {
        const years = list.map(album => album.year);
        const earliest = Math.min(...years);
        const latest = Math.max(...years);
        if (earliestYearEl)
            earliestYearEl.textContent = earliest.toString();
        if (latestYearEl)
            latestYearEl.textContent = latest.toString();
    }
}
function filterAlbums(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    if (!term)
        return albums;
    return albums.filter(album => album.title.toLowerCase().includes(term) ||
        album.artist.toLowerCase().includes(term) ||
        album.year.toString().includes(term));
}
function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    if (!searchInput || !searchResults)
        return;
    searchInput.addEventListener("input", (e) => {
        const target = e.target;
        const searchTerm = target.value;
        const filteredAlbums = filterAlbums(searchTerm);
        // Update results message
        if (searchTerm.trim()) {
            searchResults.textContent = `נמצאו ${filteredAlbums.length} תוצאות`;
            searchResults.style.display = "block";
        }
        else {
            searchResults.style.display = "none";
        }
        // Re-render albums
        renderAlbums(filteredAlbums);
        updateStatistics(filteredAlbums);
    });
}
// Animate title on load
gsap.from(".title", {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: "bounce.out"
});
// Animate subtitle
gsap.from(".subtitle", {
    opacity: 0,
    duration: 1,
    delay: 0.3
});
// Animate statistics
gsap.from(".stat-card", {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.15,
    delay: 0.5,
    ease: "back.out(1.7)"
});
// Animate search bar
gsap.from(".search-container", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.8
});
// Animate footer
gsap.from(".footer", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 1.2
});
renderAlbums(albums);
updateStatistics(albums);
setupSearch();
