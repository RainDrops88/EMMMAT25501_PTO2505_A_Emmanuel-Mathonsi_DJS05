/**
 * @function fetchShowById
 * Fetches a single podcast show from the API using a show ID.
 *
 * @param {string | number} showId - The podcast show ID to fetch.
 * @returns {Promise<object>} A promise that resolves to the show payload.
 */
export async function fetchShowById(showId) {
	if (showId === undefined || showId === null || showId === "") {
		throw new Error("A valid show ID is required.");
	}

	const res = await fetch(`https://podcast-api.netlify.app/id/${showId}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch show ${showId}: ${res.status}`);
	}

	return res.json();
}
