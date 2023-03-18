$(function () {

  function initSearchBox() {
    var pages = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      // datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,

      prefetch: baseurl + '/search.json'
    });

    $('#search-box').typeahead({
      minLength: 0,
      highlight: true
    }, {
        name: 'pages',
        display: 'title',
        source: pages
      });

    $('#search-box').bind('typeahead:select', function (ev, suggestion) {
      window.location.href = suggestion.url;
    });
  }

  function styleContentToMD() {
    $('#markdown-content-container table').addClass('table');
    $('#markdown-content-container img').addClass('img-responsive');
  }

  initSearchBox();
  styleContentToMD();
});

document.getElementById("uploadBtn").addEventListener("click", function () {
  let jsonFileInput = document.getElementById("jsonFileInput");
  let file = jsonFileInput.files[0];

  if (file && file.name.endsWith(".json")) {
      let reader = new FileReader();
      reader.onload = function (event) {
          let data = JSON.parse(event.target.result);
          displayLeaderboard(data);
      };
      reader.readAsText(file);
  } else {
      alert("Please select a JSON file.");
  }
});

function displayLeaderboard(data) {
  let tableBody = document.querySelector("#leaderboardTable tbody");
  tableBody.innerHTML = "";

  data.sort((a, b) => b.score - a.score);

  data.forEach((entry, index) => {
      let row = document.createElement("tr");

      let rankCell = document.createElement("td");
      rankCell.textContent = index + 1;
      row.appendChild(rankCell);

      let nameCell = document.createElement("td");
      nameCell.textContent = entry.name;
      row.appendChild(nameCell);

      let scoreCell = document.createElement("td");
      scoreCell.textContent = entry.score;
      row.appendChild(scoreCell);

      tableBody.appendChild(row);
  });
}

