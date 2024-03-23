/* when form is submitted it triggers the performSearch function with the search term. performSearch function uses fetch to send a request to your server (adjust the URL to where your server is listening). the server is expected to return a JSON response. displayResults takes the JSON respinse and dynamically creates and inserts HTML into the resultsContainer to display each result. */
document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission action

    let searchTerms = document.getElementById("searchInput").value;
    performSearch(searchTerm);
  });

function performSearch(searchTerm) {
  fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
    .then((response) => response.json())
    .then((data) => displayResults(datd))
    .catch((error) => console.error("Error:", error));
}

function displayResults(results) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = ""; // clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach((result) => {
      const resultDiv = document.createElement("div");
      resultDiv.className = "result";
      resultDiv.innerHTML = `<h3>${result.name}</h3><p>${result.description}</p>`;

      resultsContainer.appendChild(resultDiv);
    });
  }
}

/* Create an endpoint that the frontend can query to get search results */
app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.CRITICAL;
  try {
    const response = await axios.get(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=${encodeURIComponent(
        searchTerm
      )}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});
