window.addEventListener("load", function() {

  // Start sendData
  function sendData() {
    const xhttpLogin = new XMLHttpRequest();

    // Form Data
    const dataForm = new FormData();
      dataForm.append("username", document.getElementById("username").value);
      dataForm.append("password", document.getElementById("password").value);
      dataForm.append("grant_type", "password");

    // Submission
    xhttpLogin.addEventListener( "load", function(event) {
      let token = JSON.parse(event.target.response)["access_token"];

      // => Start getMovies
      function getMovies(token) {
        const xhttpMovies = new XMLHttpRequest();
        const header = "Bearer " + token;

        // Authorized
        xhttpMovies.addEventListener( "load", function(event) {
          if(this.status == 200) {
            console.log(JSON.parse(event.target.response));
          } else {
            alert("error" + this.status);
          }
        });

        // Error
        xhttpMovies.addEventListener("error", function(event) {
          alert( "Oops! Something went wrong.");
        });

        // Request
        xhttpMovies.open("GET", "http://kamaji2.dev.netbuilder.it/00900001/movies", true);
        xhttpMovies.setRequestHeader ("Authorization", header);
        xhttpMovies.send();
      }

      // Get movies
      getMovies(token);
    });

    // Error
    xhttpLogin.addEventListener( "error", function(event) {
      alert( "Oops! Something went wrong.");
    });

    // Request
    xhttpLogin.open("POST", "http://kamaji2.dev.netbuilder.it/00900001/auth", true);
    xhttpLogin.send(dataForm);
  }

  // Form
  const form = document.getElementById("login");

  // Submit
  form.addEventListener( "submit", function(event) {
    event.preventDefault();
    sendData();
  } );
} );
