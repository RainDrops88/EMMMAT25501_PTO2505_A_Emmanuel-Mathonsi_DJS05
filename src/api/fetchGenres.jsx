/**
 * @function fetchGenreById
 * Fetches genre data from the podcast API using a genre ID.
 *
 * @param {string | number} genreId - The genre ID to fetch.
 * @returns {Promise<object>} A promise that resolves to the genre payload.
 */
 
export async function fetchGenreById(genreId) {
	if (genreId === undefined || genreId === null || genreId === "") {
		throw new Error("A valid genre ID is required.");
	}

	const res = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch genre ${genreId}: ${res.status}`);
	}

	return res.json();
}

