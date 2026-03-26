import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";
import Filter from "./components/Filter";
import {PodcastProvider} from "./context/PodcastContext"
import Pagination  from "./components/Pagination"
import { Routes, Route } from 'react-router-dom';
import DetailedCard from "./components/DetailedCard";

/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing search, sort and filter states
 * - Managing loading and error states
 * - Rendering the podcast grid once data is successfully fetched
 * - Displaying a header and fallback UI during loading or error
 * @returns {JSX.Element} The rendered application interface
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      <PodcastProvider initialPodcast={podcasts}>
      <Header />
      
      
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while trying fetching podcasts: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Filter />
                  <PodcastGrid />
                  <Pagination />
                </>
              }
            />
            <Route path="/detailed-card/:id" element={<DetailedCard />} />
          </Routes>
        )}
      </main>
      
      </PodcastProvider>
    </>
  );
}
