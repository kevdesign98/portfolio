const toggle = document.getElementById('darkModeToggle');
const body = document.body;

toggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
});

const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

const fullName = "Kevin Cooray"; // Cambia con il tuo nome

const infoHTML = `
  <div class="fade-in">
    <div class="mb-4">
      <h5>Chi sono</h5>
      <p>Mi chiamo Kevin Cooray, sono un Web designer. Se vuoi vedere cosa so fare, guarda i miei portfolio qui sotto:</p>
    </div>

    <div class="mb-4">
      <a href="https://kevdesign98.github.io/portfolio/webgl.html" class="result-title">Kevin World's</a>
      <div class="result-url">https://kevdesign98.github.io/portfolio/webgl.html</div>
      <p class="result-snippet">Progetti moderni e responsive con focus su UX/UI, sviluppati con attenzione al dettaglio.</p>
    </div>

    <div class="mb-4">
      <a href="https://kevdesign98.github.io/portfolio-html/" class="result-title">Portfolio</a>
      <div class="result-url">https://kevdesign98.github.io/portfolio-html/</div>
      <p class="result-snippet">Loghi, poster, social content, branding. Tutto ciò che serve per comunicare con stile.</p>
    </div>
  </div>
`;

const errorHTML = `
  <div class="alert alert-warning fade-in" role="alert">
    Nessun risultato per questa ricerca. Prova a scrivere: <strong>${fullName}</strong>
  </div>
`;

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query === "") {
    results.innerHTML = "";
    return;
  }
  if (query === fullName.toLowerCase()) {
    results.innerHTML = infoHTML;
  } else {
    results.innerHTML = errorHTML;
  }
});

function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.trim().toLowerCase();

  if (query.includes("kevin cooray")) {
    document.getElementById("body").classList.add("search-active");
    document.getElementById("resultsContainer").innerHTML = infoHTML;
  } else {
    document.getElementById("resultsContainer").innerHTML = `
      <div class="container alert alert-warning mt-4 fade-in">
        Nessun risultato trovato. Prova con "Kevin Cooray".
      </div>`;
  }
}

