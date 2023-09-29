export function makeImagePath(
  id: string,
  format?: "original" | "w500" | "w200"
) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function getGenreById(
  genres: { id: number; name: string }[],
  id: number
) {
  return genres.find((data) => data.id === id)?.name;
}
