import { Song } from "../interfaces/iSong";

const FAVORITE_SONGS_KEY = 'favorite_songs';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) || "")) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}
const readFavoriteSongs = () => JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY)  || "");

const saveFavoriteSongs = (favoriteSongs: object[]) => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

const simulateRequest = (response: string) => (callback: (response: string) => void) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteSongs = () => new Promise<Song[]>((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  simulateRequest(JSON.stringify(favoriteSongs))((response: string) => {
    resolve(JSON.parse(response));
  });
});

export const addSong = (song: Song) => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeSong = (song: Song) => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s: Song) => s.trackId !== song.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
