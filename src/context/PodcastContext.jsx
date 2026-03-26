import React, { createContext, useEffect, useState } from "react";
import { fetchGenreById } from "../api/fetchGenres.jsx";
import { fetchShowById } from "../api/fetchShow.jsx";

/**
 * @typedef Podcast
 * @property (number) id - Unique identifier
 * @property (string) title - Podcast title
 * @property (string) updated - last updated IOS date string
 * @property (number[]) genres - Array of genre IDs
 * @property (string) image - URL to podcast artwork
 * @property (number) seasons - Number of seasons
 * 
 */

/**
 * Sorting options available to the user for viewing podcasts.
 * @type {{key: string, label: string}[]}
 */

export const SORT_OPTIONS = [
    {key: "default", label: "Default"},
    {key: "newest", label: "Newest"},
    {key: "oldest", label: "Oldest"},
    {key: "title_a-z", label: "A - Z"},
    {key: "title_z-a", label: "Z - A"}
];

/**
 * React context for sharing podcast states across components.
 * Must be used within a <PodcastProvider>
 */

export const PodcastContext = createContext();

/**
 * 
 * PodcastProvider component wraps children in a context with state for
 * searching, sorting, filtering and paginating podcast data 
 */

/**
 * Dynamically calculate how many cards can fit on screen.
 * Set a fixed 10 cards for tablet and smaller screen.
 *
 */
export function PodcastProvider({ children, initialPodcast}){
    const [search, setSearch] = useState("");
    const [searchBarVisible, setSearchBarVisible] = useState(true);
    const [sort, setSort] = useState("default");
    const [filter, setFilter] = useState("all-genres");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [genres, setGenres] = useState([]);
    const [showsById, setShowsById] = useState({});
    const [showsLoading, setShowsLoading] = useState(true);
    const [showsError, setShowsError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadGenres() {
            try {
                const genreIds = Array.from(
                    new Set((initialPodcast || []).flatMap((podcast) => podcast.genres || []))
                ).sort((a, b) => a - b);

                if (!genreIds.length) {
                    if (isMounted) {
                        setGenres([]);
                    }
                    return;
                }

                const genreData = await Promise.all(genreIds.map((id) => fetchGenreById(id)));
                if (isMounted) {
                    setGenres(genreData);
                }
            } catch (err) {
                console.error("Failed to fetch genres:", err);
            }
        }

        loadGenres();
        return () => {
            isMounted = false;
        };
    }, [initialPodcast]);

    useEffect(() => {
        let isMounted = true;

        async function loadShows() {
            try {
                setShowsLoading(true);
                setShowsError(null);

                const showIds = (initialPodcast || []).map((podcast) => podcast.id);

                if (!showIds.length) {
                    if (isMounted) {
                        setShowsById({});
                        setShowsLoading(false);
                    }
                    return;
                }

                const shows = await Promise.all(showIds.map((showId) => fetchShowById(showId)));
                const showsMap = Object.fromEntries(
                    shows.map((show) => [String(show.id), show])
                );

                if (isMounted) {
                    setShowsById(showsMap);
                }
            } catch (err) {
                if (isMounted) {
                    setShowsError(err.message || "Failed to load shows.");
                }
            } finally {
                if (isMounted) {
                    setShowsLoading(false);
                }
            }
        }

        loadShows();

        return () => {
            isMounted = false;
        };
    }, [initialPodcast]);

  

  useEffect(() => {
    const calculatePageSize = () =>{
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1024){
            setPageSize(10);
            return;
        }

        const cardWidth = 260;
        const maxRows = 2;
        const columns = Math.floor(screenWidth/cardWidth);
        const pageSize = columns * maxRows;

        setPageSize(pageSize);
        };

        calculatePageSize();
        window.addEventListener("resize", calculatePageSize);
        return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  const applyFilters = () => {
    let data = [...initialPodcast];

    // search filter
    if (search.trim() !== '') {
        data = data.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    // genre filter
    if (filter && filter !== "all-genres") {
        const genreId = Number(filter);
        if (Number.isFinite(genreId)) {
        data = data.filter((p) => p.genres.includes(genreId));
        }
    }

    // sort order
    if (sort === "default") {
        data = [...data];
    } else if (sort === "title_a-z") {
        data = [...data].sort((a, b) => a.title.localeCompare(b.title));
    } 
    else if (sort === "title_z-a"){
        data = [...data].sort((a,b) => b.title.localeCompare(a.title));
    }
    else if (sort === "newest") {
        data = [...data].sort(
        (a, b) => new Date(b.updated) - new Date(a.updated));
    }
    else if (sort === "oldest"){
        data = [...data].sort(
        (a, b) => new Date(a.updated) - new Date(b.updated));
    }

    return data;
    
  };

  const filtered = applyFilters();
  const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1 )* pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [search, sort, filter]);

    const value = {
        search,
        setSearch,
        searchBarVisible,
        setSearchBarVisible,
        sort,
        setSort,
        filter,
        setFilter,
        page: currentPage,
        setPage,
        totalPages,
        podcasts: paged,
        allPodcasts: filtered,
        allPodcastsCount: filtered.length,
        genres,
        showsById,
        showsLoading,
        showsError,
    };

    return(
        <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
    );

}