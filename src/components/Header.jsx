import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";

export default function Header() {
  const { search, setSearch } = useContext(PodcastContext);

  return (
    <header className="app-header">
      <h1>🎙️ Podcast App</h1>
      <div className="search">
      <input className="search-bar" type="text" placeholder="Search podcasts..." value={search} onChange={(e) => setSearch(e.target.value)} />
      
      </div>
    </header>

  );
}
