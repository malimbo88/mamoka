// script.js

// Form login
const loginForm = document.getElementById("login");

// login
loginForm.addEventListener("submit", event => {
  event.preventDefault();

  // Input validation
  if (document.getElementById("username").value.length !== 0 && document.getElementById("password").value.length !== 0) {
    // Ajax
    const url = "http://kamaji2.dev.netbuilder.it/00900001";
    sendData(url);
  } else {
    // Create error message
    document.getElementsByTagName("main")[0].innerHTML = "";
    document.getElementsByTagName("main")[0].innerHTML += "<div id=\"errors\">Errors: Fill in all fields</div>";
  }
})

// Send data
function sendData(url) {
  let urlAuth = url + "/auth";

  // Form data
  let formData = new FormData()
    formData.append("username", document.getElementById("username").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("grant_type", "password");

  // Fetch
  fetch(urlAuth , {
    method: "POST",
    body: formData,
  })

  // Response login
  .then(response => {
    if (!response.ok) {

      // Create error message
      document.getElementsByTagName("main")[0].innerHTML = "";
      document.getElementsByTagName("main")[0].innerHTML += `<div id=\"errors\">Errors: ${response.statusText}</div>`;

      throw Error(response.statusText);
    } else {
      return response.json();
    }
  })

  // Data login
  .then(data => {
    let accessToken = data["access_token"];
    let headerAuth = "Bearer " + accessToken;

    // get Movies
    getMovies(url, headerAuth);
  })

  // Connection error
  .catch(error => console.log("Error! " + error.message))
}

// Get movies
function getMovies(url, headerAuth, container) {
  let urlMovies = url + "/movies";

  // Headers movies
  let headersMovies = new Headers()
    headersMovies.append("Authorization", headerAuth);

  // Fetch
  fetch(urlMovies, {
    method: "GET",
    headers: headersMovies,
  })

  // Response movies
  .then(response => {
    if (!response.ok) {

      // Create error message
      document.getElementsByTagName("main")[0].innerHTML = "";
      document.getElementsByTagName("main")[0].innerHTML += `<div id=\"errors\">Errors: ${response.statusText}</div>`;

      throw Error(response.statusText);
    } else {
      return response.json();
    }
  })

  // Data movies
  .then(data => {
    let arrayMovies = data
    printMovies(arrayMovies);
  })

  // Connection error
  .catch(error => console.log("Error! " + error.message))
}

// Print movies
function printMovies(arrayMovies) {

  // Add movies
  if (arrayMovies.length != 0) {

    // Refresh
    document.getElementsByTagName("main")[0].innerHTML = "";
    document.getElementsByTagName("main")[0].innerHTML += "<table id=\"movies\"></table>";

    // Table id
    let content = document.getElementById("movies");

    // Table head
    content.innerHTML += "<thead><tr><th>Title</th><th>Year</th><th>Director</th><th>Category</th></tr></thead>";

    // Table body
    content.innerHTML += "<tbody id=\"body\"></tbody>"

    // Table body id
    let body = document.getElementById("body");

    // Print movies information
    arrayMovies.forEach(movie => {
      body.innerHTML += `<tr><td>${movie.title}</td><td>${movie.year}</td><td>${movie.director}</td><td id=${movie.id}></td></tr>`;
      if (movie.category) {

        // Table categories id
        let categories = document.getElementById(movie.id);

        // Print movies categories
        movie.category.forEach(category => {
          categories.innerHTML += `<span class="category">${category.name}</span>`;
        });
      }
    });
  } else {

    // In case you have no movies
    if(document.getElementById("movies")) {
      document.getElementById("movies").remove();
      document.getElementsByTagName("main")[0].innerHTML += "<div id=\"movies\">No movies</div>";
    } else {
      document.getElementsByTagName("main")[0].innerHTML += "<div id=\"movies\">No Movies</div>";
    }
  }
}
