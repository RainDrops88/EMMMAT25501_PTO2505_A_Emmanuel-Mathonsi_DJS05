/**
 * Utility functions for genre handling.
 * @module genre
 * 
 */

/**
 * @typedef {Object} Genre
 * @property {number|string} id - Genre identifier.
 * @property {string} title - Display label for the genre.
 */

export const genre = {
  /**
   * Maps a list of genre IDs to display names.
   *
   * @param {(number|string)[]} [genreIds=[]] - Genre identifiers to resolve.
   * @param {Genre[]} [genres=[]] - Available genre objects.
   * @returns {string[]} Genre names in the same order as the given IDs.
   */
  getGenreNames(genreIds = [], genres = []) {
    const genreMap = new Map(
      genres.map((genreItem) => [Number(genreItem.id), genreItem.title])
    );

    return genreIds.map((id) => genreMap.get(Number(id)) || "Unknown");
  }
};