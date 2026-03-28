import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";

/**
 * Renders podcast filtering and sorting controls.
 *
 * @returns {JSX.Element}
 */
export default function Filter() {
    const { filter, setFilter, sort, setSort, genres } = useContext(PodcastContext);
    return (
        <div className="filters">
            <label className="filter">Filter by:</label>
            <select 
                name="all-genres"
                id="genre-list"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                >
                <option value="all-genres" defaultValue>All genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.title}</option>
                ))}
            </select>
            <label className="sort">Sort by:</label>
            <select
                name="sort-by"
                id="sort-by"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title_a-z">A-Z</option>
                <option value="title_z-a">Z-A</option>
            </select>
        </div>
    );
}