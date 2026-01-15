import { Album } from "./class/Album.js";
const albums = [
    new Album("The Rise and Fall of Ziggy Stardust and the Spiders from Mars", 1972, "David Bowie", "https://upload.wikimedia.org/wikipedia/en/0/01/ZiggyStardust.jpg"),
    new Album("Sgt. Pepper's Lonely Hearts Club Band", 1967, "The Beatles", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZ1pXmmf-BhcSCwaI5cAz-iOjjChRwcyEBw&s"),
    new Album("Thriller", 1982, "Michael Jackson", "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"),
    new Album("Back in Black", 1980, "AC/DC", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG563E6p5rw9Qg98N8M53jGTyu2tiAj9oHQA&s"),
];
function renderAlbums(list) {
    const grid = document.getElementById("albumsGrid");
    if (!grid)
        return;
    grid.innerHTML = "";
    list.forEach((album) => {
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
    });
}
renderAlbums(albums);
