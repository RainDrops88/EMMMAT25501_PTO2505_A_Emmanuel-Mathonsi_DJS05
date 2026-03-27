import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { PodcastContext } from "../context/PodcastContext";
import { genre } from "../utils/genres";
import { Link } from "react-router-dom";
import SeasonCard from "./SeasonCard";
import "../index.css";


export default function DetailedCard() {
  const { genres = [], allPodcasts = [], showsById = {}, showsLoading, showsError, setSearchBarVisible } = useContext(PodcastContext);
  const { id } = useParams();
  const parentPodcast = allPodcasts.find((podcast) => String(podcast.id) === String(id));
  const show = showsById[String(id)];
  const genreIds = parentPodcast?.genres || show?.genres || [];

  useEffect(() => {
    setSearchBarVisible(false);

    return () => {
      setSearchBarVisible(true);
    };
  }, [setSearchBarVisible]);

  if (showsLoading) {
    return (
      <div className="message-container">
        <div className="spinner"></div>
        <p>Loading show details...</p>
      </div>
    );
  }

  if (showsError) {
    return (
      <div className="message-container">
        <div className="error">Failed to load show: {showsError}</div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="message-container">
        <div className="error">Show not found. Please open a show from the grid.</div>
      </div>
    );
  }



  return (
    <div className="detailed-card-page">
        <Link to="/" className="arrow-container"><div className="arrow"></div></Link>
        <div className="detailed-card-container">
            <div className="card-profile">
            <img className="detailed-image" src={show.image} alt={show.title} />
                <div className="title-info">
                    <h1 className="d-title">{show.title}</h1>
                    <p className="d-description">{show.description}</p>
                    <div className="genre-date">
                        <div className="d-genre-div">
                            <p className="d-genre-title">GENRES</p>
                            <div className="d-genre-tags">{genre.getGenreNames(genreIds, genres).map((title, index) => (
                                <span key={index} className="tag">
                                {title}
                                </span>
                                ))}
                            </div>
                        </div>
                        <div className="d-date-div">
                        <p className="d-date-title">LAST UPDATED</p>
                        <div className="d-updated">{formatDate(show.updated)}</div>
                    </div>
                    </div>
                    <div className="season-info">
                        <div className="d-season-div">
                            <p className="d-total-season">TOTAL SEASONS</p>
                        <div className="total-seasons">{show.seasons.length} Seasons</div>
                        </div>
                        <div className="d-episodes-div">
                            <p className="d-total-episodes">TOTAL EPISODES</p>
                            <div className="total-episodes">{show.seasons.reduce((total, season) => total + (season.episodes?.length || 0), 0)} Episodes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <SeasonCard key={show.id} show={show} />
    </div>
  );
}
