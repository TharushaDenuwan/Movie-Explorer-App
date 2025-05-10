# Movie Explorer

## Overview

Movie Explorer is a web application that allows users to search for movies, browse trending movies, and view detailed information about specific films, including their cast and genres. The application fetches movie data from The Movie Database (TMDb) API. It also incorporates features like dark/light mode.

## Project Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm (or yarn) installed on your system. Then, run:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project and add your TMDb API key:
    ```env
    REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
    ```
    *(Replace `YOUR_TMDB_API_KEY` with your actual API key from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))*

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will start the application, and you can usually view it in your browser at `http://localhost:3000`.

## API Usage

This project utilizes the [The Movie Database (TMDb) API](https://developers.themoviedb.org/3/) to fetch movie-related data. The following API endpoints are used:

* `/trending/movie/week`: Retrieves a list of movies trending this week.
* `/search/movie`: Searches for movies based on a query.
* `/movie/{movie_id}`: Retrieves detailed information about a specific movie.
* `/movie/{movie_id}/credits`: Retrieves the cast of a specific movie.
* `/genre/movie/list`: Retrieves a list of movie genres.

The following API key is required and should be placed in the `.env` file as `REACT_APP_TMDB_API_KEY`:

* **API Key:** You need to create an account on TMDb and obtain an API key from your account settings.

The application uses the `axios` library to make HTTP requests to the TMDb API. Image URLs are constructed using the `IMAGE_BASE_URL` and different `posterSizes` defined in the code.

## Features Implemented

The Movie Explorer application includes the following features:

* **Movie Search:** Users can search for movies by title using a search bar. The application displays a list of matching movies with their posters, titles, and release years.
* **Trending Movies:** The homepage displays a section showcasing movies that are currently trending.
* **Movie Details:** Clicking on a movie card takes the user to a detailed view of the movie, including:
    * Poster and backdrop image (if available)
    * Title and release year
    * User rating
    * Genres
    * Overview/Synopsis
    * Top 10 cast members
* **Dark/Light Mode:** Users can toggle between a dark and light theme for a more comfortable viewing experience. The selected theme is persisted in the browser's local storage.
* **Local Storage Persistence:**
    * **Dark Mode Preference:** The user's chosen dark/light mode setting is saved in local storage and applied on subsequent visits.
* **Infinite Scrolling (Search Results):** When searching for movies, the application implements infinite scrolling, loading more results as the user scrolls down the page.
* **Error Handling:** The application displays informative error messages if API requests fail.
* **Loading States:** Visual loading indicators are shown while data is being fetched from the API.
* **Responsive Design:** The layout is designed to be reasonably responsive across different screen sizes.

## Libraries Used

* **React:** A JavaScript library for building user interfaces.
* **Axios:** A promise-based HTTP client for making API requests.
* **Lucide React:** A library of beautiful SVG icons.
* **React Router DOM:** For handling navigation within the application (though not explicitly shown in the provided code, it's a common library for multi-page React applications).
* **CSS Modules:** Used for styling components with local scope.