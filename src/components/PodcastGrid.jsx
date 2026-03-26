import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import PodcastCard from "./PodcastCard";


/**
 * Displays a grid layout of podcast preview cards. Each card includes
 * podcast details such as title, image, genres, season count, and updated date.
 *
 * @returns {JSX.Element} The rendered grid of podcast cards.
 *
 */

export default function PodcastGrid() {
  const { podcasts, genres } = useContext(PodcastContext);
  return (
    <div className="grid">
      {podcasts.map((podcast) => (
        
          <PodcastCard key={podcast.id} podcast={podcast} genres={genres} />
        
      ))}
    </div>
  );
}
