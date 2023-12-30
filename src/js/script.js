document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".search-box");
  const input = form.querySelector('input[type="text"]');
  const resultsContainer = document.querySelector(".results");
  const resultsCounter = document.querySelector(".counter");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = input.value;
    if (searchTerm) {
      searchWikipedia(searchTerm);
    }
  });

  function searchWikipedia(searchTerm) {
    const url = `https://id.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=25&srsearch=${encodeURIComponent(
      searchTerm
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayResults(data.query.search);
      })
      .catch((error) => alert(`Error : ${error}`));
  }

  function displayResults(results) {
    // Set the inner HTML of the resultsContainer to an empty string. This clears any previous search results.
    resultsContainer.innerHTML = "";

    // Update the text content of the resultsCounter to display the number of search results returned.
    resultsCounter.textContent = `Hasil Pencarian : ${results.length}`;

    // Iterate over each result in the results array.
    results.forEach((result) => {
      // Create a new div element for each result.
      const resultElement = document.createElement("div");

      // Add a class of "result" to the div.
      resultElement.className = "result animate__animated animate__fadeInUpBig";

      // Set the inner HTML of the div to include the title, snippet, and a link to the full Wikipedia page.
      resultElement.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="https://id.wikipedia.org/?curid=${result.pageid}" target="_blank">Baca Selengkapnya</a>`;

      // Append the result div to the resultsContainer.
      resultsContainer.appendChild(resultElement);
    });
  }
});
