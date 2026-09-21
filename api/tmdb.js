// API til TMDB (The Movie Database)
// Sørger for, at appen bare kan kalde searchTitles() uden at vide noget om URL og nøgler

// Read Access Tokenfra TMDB
const TMDB_TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const headers = {
  accept: "application/json",
  Authorization: "Bearer " + TMDB_TOKEN,
};

// Lav en fuld billed-url ud fra en poster-sti (eller null hvis dr ingen er)
export function posterUrl(path) {
  if (!path) return null;
  return IMAGE_URL + path;
}

// Søg efter både film og serier ud fra søgetekst
export async function searchTitles(query) {
  if (!query) return [];

  const url =
    BASE_URL +
    "/search/multi?query=" +
    encodeURIComponent(query) +
    "&language=da-DK&page=1";

  const response = await fetch(url, { headers });
  const data = await response.json();

  // KKun have film og serier med
  const results = (data.results || []).filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );

  // Lav TMDB's data om til eget format
  return results.map(toMovie);
}

// Laver TMDB-resultat om til eget movie-objekt
export function toMovie(item) {
  const isTv = item.media_type === "tv";
  const title = isTv ? item.name : item.title;
  const date = isTv ? item.first_air_date : item.release_date;

  return {
    id: item.id,
    mediaType: item.media_type, // movie eller tv
    title: title,
    year: date ? date.slice(0, 4) : "",
    poster: posterUrl(item.poster_path),
    overview: item.overview,
    rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : null,
    watched: false,
  };
}
