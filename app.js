// Get references to the input and button elements
const searchInput = document.getElementById("searchInput");
const searchMovieBtn = document.getElementById("searchMovieBtn");
const moviesContainer = document.getElementById("moviesContainer");

const createTitleInput = document.getElementById("createTitle");
const createYearInput = document.getElementById("createYear");
const createMovieBtn = document.getElementById("createMovieBtn");

const updateIdInput = document.getElementById("updateId");
const updateTitleInput = document.getElementById("updateTitle");
const updateYearInput = document.getElementById("updateYear");
const updateMovieBtn = document.getElementById("updateMovieBtn");

// Add an event listener to the "Search Movie" button
searchMovieBtn.addEventListener("click", searchMovie);
createMovieBtn.addEventListener("click", createMovie);
updateMovieBtn.addEventListener("click", updateMovie);

// Fetch movies from the backend API
function fetchMovies() {
  fetch('https://p2-backapi.herokuapp.com/movies')
    .then(response => response.json())
    .then(data => {
      displayMovies(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fetch ratings from the backend API
function fetchRatings() {
  fetch('https://p2-backapi.herokuapp.com/ratings')
    .then(response => response.json())
    .then(data => {
      // Process the returned rating data
      console.log(data); // You can perform further actions with the rating data here
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the fetchMovies and fetchRatings functions to get initial data
fetchMovies();
fetchRatings();

// Define the searchMovie function
function searchMovie() {
  // Get the user input from the search input field
  const movieTitle = searchInput.value;

  // Make a GET request to the OMDb API
  fetch(`https://www.omdbapi.com/?apikey=245d7e38&s=${encodeURIComponent(movieTitle)}`)
    .then(response => response.json())
    .then(data => {
      // Process the returned movie data and display movie cards
      displayMovies(data.Search);
    })
    .catch(error => {
      console.error("Error:", error);
    });

  // Clear the search input field after searching
  searchInput.value = "";
}

// Define the createMovie function
function createMovie() {
  // Get the user input from the create movie form
  const movieTitle = createTitleInput.value;
  const movieYear = createYearInput.value;

  // Make a POST request to create a new movie
  fetch('https://p2-backapi.herokuapp.com/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: movieTitle,
      year: movieYear,
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Display the newly created movie
      console.log(data); // You can perform further actions with the newly created movie here
    })
    .catch(error => {
      console.error('Error:', error);
    });

  // Clear the create movie form
  createTitleInput.value = "";
  createYearInput.value = "";

  // Display a success message or perform any other necessary actions
  alert("Movie created successfully!");
}

// Define the updateMovie function
function updateMovie() {
    // Get the user input from the update movie form
    const movieId = updateIdInput.value;
    const updatedTitle = updateTitleInput.value;
    const updatedYear = updateYearInput.value;
  
    // Make a PUT request to update the movie
    fetch(`https://p2-backapi.herokuapp.com/movies/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updatedTitle,
        year: updatedYear,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update movie');
        }
      })
      .then(data => {
        // Display the updated movie
        console.log(data); // You can perform further actions with the updated movie here
        // Update the UI or perform any other necessary actions
        alert("Movie updated successfully!");
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error gracefully, show an error message, etc.
        alert("Failed to update movie");
      });
  
    // Clear the update movie form
    updateIdInput.value = "";
    updateTitleInput.value = "";
    updateYearInput.value = "";
  }
  

// Define the deleteMovie function
function deleteMovie(movieId) {
  // Make a DELETE request to delete the movie
  fetch(`https://p2-backapi.herokuapp.com/movies/${movieId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.status === 204) {
        // Movie deleted successfully
        console.log("Movie deleted successfully!");
      } else {
        // Movie deletion failed
        console.error("Failed to delete movie.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Define the displayMovies function
function displayMovies(movies) {
    // Clear the existing movie cards
    moviesContainer.innerHTML = "";
  
    // Loop through the movies array and create movie cards
    movies.forEach(movie => {
      // Create the movie card element
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");
  
      // Create an image element for the movie poster
      const posterImg = document.createElement("img");
      posterImg.src = `http://img.omdbapi.com/?apikey=245d7e38&i=${movie.imdbID}`;
      posterImg.alt = movie.Title;
  
      // Create a heading element for the movie title
      const titleHeading = document.createElement("h2");
      titleHeading.textContent = movie.Title;
  
      // Create a paragraph element for the movie year
      const yearParagraph = document.createElement("p");
      yearParagraph.textContent = `Year: ${movie.Year}`;
  
      // Append the poster image, title heading, and year paragraph to the movie card
      movieCard.appendChild(posterImg);
      movieCard.appendChild(titleHeading);
      movieCard.appendChild(yearParagraph);
  
      // Append the movie card to the movies container
      moviesContainer.appendChild(movieCard);
    });
  }
  
  // Create a delete button element
const deleteButton = document.createElement("button");
deleteButton.textContent = "Clear Results";
deleteButton.addEventListener("click", clearResults);

// Append the delete button to a parent element (e.g., the document body)
document.body.appendChild(deleteButton);

// Function to clear the search results
function clearResults() {
  // Clear the existing movie cards
  moviesContainer.innerHTML = "";
}
