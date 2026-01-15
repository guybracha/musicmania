export class Album {
  title: string;
  year: number;
  artist: string;
  imageUrl: string;

  constructor(title: string, year: number, artist: string, imageUrl: string) {
    this.title = title;
    this.year = year;
    this.artist = artist;
    this.imageUrl = imageUrl;
  }
}
