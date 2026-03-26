import { formatDate } from "../utils/formatDate";
import { genre } from "../utils/genres";
import { Link } from "react-router-dom";

/**
 * Renders a single podcast preview card with image, title, number of seasons,
 * genres (as styled tags), and the last updated date.
 *
 * @param {Object} props
 * @param {Object} props.podcast - The podcast data object to display.
 * @param {string} props.podcast.id - Unique ID of the podcast.
 * @param {string} props.podcast.title - Title of the podcast.
 * @param {string} props.podcast.image - URL of the podcast image.
 * @param {number} props.podcast.seasons - Number of seasons available.
 * @param {string} props.podcast.updated - ISO date string for the last update.
 * @param {Array<Object>} props.genres - Array of genre objects for mapping IDs to titles.
 *
 * @returns {JSX.Element} The rendered podcast card component.
 */
export default function PodcastCard({ podcast, genres }) {
 

  return (
   <Link key={podcast.id} to={`/detailed-card/${podcast.id}`}>
    <div className="card">
      <img src={podcast.image} alt={podcast.title} />

      <h3>{podcast.title}</h3>
      <p className="seasons">{podcast.seasons} seasons</p>
      <div className="tags">{genre.getGenreNames(podcast.genres, genres).map((title, index) => (
        <span key={index} className="tag">{title}</span>
      ))}</div>
      <p className="updated-text">Updated {formatDate(podcast.updated)}</p>
    </div>
   </Link>
  );
}
