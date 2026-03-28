#  Show Detail Page with Routing and Navigation

## Project Overview

In this project, I will build a podcast show detail page as part of a larger podcast browsing app. When users select a show from the homepage or listing page, they should be taken to a dedicated page that displays all details about that show. The app will support dynamic routing so each show has its own unique URL.

I will implement data fetching based on the show ID in the URL, handle loading and error states gracefully, and ensure a smooth user experience by preserving search filters and pagination when users navigate back to the homepage. Additionally, you will build a season navigation system allowing users to expand or switch between seasons to browse episodes efficiently.

This project demonstrate the ability to work with dynamic routes, manage state across pages, handle asynchronous data, and create a clean, maintainable React codebase.

## Live Data Source

This project consumes the public API endpoints:

- https://podcast-api.netlify.app/shows
- https://podcast-api.netlify.app/id/:showId
- https://podcast-api.netlify.app/genre/:genreId

## Tech Stack

    ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-circle&logo=github)
    ![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-circle&logo=html5&logoColor=white)
    ![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-circle&logo=css3)
    ![MARKDOWN](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&amp;logo=markdown&amp;logoColor=white)
    [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
    [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)


## Project Structure

src/

- api/
	- fetchPodcasts.js: Fetches all podcast shows
	- fetchShow.jsx: Fetches a single show by id
	- fetchGenres.jsx: Fetches a genre by id
- components/
	- Header.jsx: App title and search bar
	- Filter.jsx: Genre filter and sort controls
	- PodcastGrid.jsx: Podcast card list
	- PodcastCard.jsx: Individual podcast preview card
	- Pagination.jsx: Page navigation controls
	- DetailedCard.jsx: Show details view for a selected show
	- SeasonCard.jsx: Season selector and episode list with audio
- context/
	- PodcastContext.jsx: Global state for search, filter, sorting, pagination, and show details
- utils/
	- formatDate.js: Formats API date strings for display
	- genres.js: Maps genre ids to readable names
- App.jsx: Main routes and top-level application rendering
- main.jsx: Application entry point

## Features

### Home Page

- Loads all podcast cards from the shows endpoint
- Supports search by title
- Supports sorting:
	- Default
	- Newest
	- Oldest
	- A-Z
	- Z-A
- Supports filtering by genre
- Displays paginated cards

### Detailed Show Page

- Route: /detailed-card/:id
- Fetches and displays show details by id
- Shows title, image, description, genres, and last updated date
- Displays total seasons and total episodes
- Includes season dropdown selector
- Lists episodes for selected season
- Plays episode audio when an episode has an audio file

### State and UX Behavior

- Shared state is managed in PodcastContext
- Search bar is hidden on the detailed page and restored on exit
- Loading and error states are handled for both list and detail data

## Getting Started

### 1. Install dependencies

Run:

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Run lint checks

```bash
npm run lint
```

## Routing

- /: Podcast list view
- /detailed-card/:id: Podcast detail view

## Error Handling

- API fetch failures show user-friendly error messages
- Empty or missing data states are handled gracefully

## Documentation

- JSDoc comments are added across application logic and components to improve readability and maintainability.

 ---

## 🌐 Socials

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/RainDrops88)  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emmanuel-mathonsi-300b33308/)  
📧 Email: [07942jerry@gmail.com]