/**
 * Utility functions for genre handling.
 * @module genre
 * 
 */
export const genre = {
  getGenreNames(genreIds = [], genres = []) {
    const genreMap = new Map(
      genres.map((genreItem) => [Number(genreItem.id), genreItem.title])
    );

    return genreIds.map((id) => genreMap.get(Number(id)) || "Unknown");
  }
};