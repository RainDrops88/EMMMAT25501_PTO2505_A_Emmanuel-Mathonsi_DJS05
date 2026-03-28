import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import icon from "../assets/podcast icon.webp";

/**
 * Renders the app header and global podcast search input.
 *
 * @returns {JSX.Element}
 */
export default function Header() {
  const { search, setSearch, searchBarVisible } = useContext(PodcastContext);

  return (
    <header className="app-header">
      <h1><img src={icon} alt="Podcast Icon" className="icon" /> Podcast App</h1>
      {searchBarVisible && (
        <div className="search">
          <input className="search-bar" type="text" placeholder="Search podcasts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      )}
    </header>

  );
}
