import { useState } from "react";

export default function SeasonCard({ show }) {
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
    const seasons = show?.seasons || [];
    const selectedSeason = seasons[selectedSeasonIndex] || seasons[0];
    const episodes = selectedSeason?.episodes || [];

    return (
        <section className="season-card">
            <div className="season-div">
                <h2 className="season-list-title">Seasons</h2>
                <select
                    name="seasons"
                    id="seasons-list"
                    value={selectedSeasonIndex}
                    onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
                    disabled={!seasons.length}
                >
                    {seasons.length > 0 ? (
                        seasons.map((season, index) => (
                            <option key={season.season} value={index}>
                                Season {season.season}
                            </option>
                        ))
                    ) : (
                        <option value="">No seasons available</option>
                    )}
                </select>
            </div>

            <div className="episodes-div">
                <div className="episodes-info">
                    {selectedSeason ? (
                        <>
                        <div className="season-header">
                            <img src={selectedSeason.image} alt={`Season ${selectedSeason.season} cover`} className="season-image" />
                            <div className="season-description">
                                <h2 className="season-title">
                                    Season {selectedSeason.season}{selectedSeason.title ? `: ${selectedSeason.title}` : ""}
                                </h2>
                                <p><span>{episodes.length} Episode{episodes.length !== 1 ? "s" : ""}</span></p>
                            </div>
                        </div>
                            <ul className="episodes-list">
                                {episodes.map((episode) => (
                                    <li key={episode.episode} className="episode-item">
                                        <img src={selectedSeason.image} alt={`Episode ${episode.episode} cover`} className="episode-image" />
                                        <div className="episode-d">
                                            <strong>Episode {episode.episode}:</strong> {episode.title}
                                            <p className="episode-description">
                                            {episode.description && episode.description !== "null" && episode.description.trim() !== ""
                                                ? episode.description
                                                : "Description not available"}
                                            </p>
                                            {episode.file && <audio className="episode-audio" controls> <source src={episode.file} type="audio/mpeg" /></audio>}
                                        </div>
                                        
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No episodes available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}