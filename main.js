const requestURL = "../json/documentaries.json";

async function fetchMoviesJson() {
    const response = await fetch(requestURL);
    const movies = await response.json();
    return movies;
}


fetchMoviesJson().then(movies => {
    const movieSection = document.getElementById('movieSection');
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('input[type="search"]');

    // Renderizar todas las tarjetas de películas
    function renderMovies(filter = "") {
        movieSection.innerHTML = ""; // Limpia las tarjetas

        // Filtra las películas por título si hay un término de búsqueda
        const filteredMovies = filter
            ? movies.documentaries.filter(movie =>
                movie.title.toLowerCase().includes(filter.toLowerCase())
              )
            : movies.documentaries;

        // Renderizar las tarjetas filtradas o todas si no hay filtro
        filteredMovies.forEach(movie => {
            const { id, poster, title, year, length, director, synopsis } = movie;
            movieSection.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                    <div class="card h-100 ">
                        <img src="${poster}" class="card-img-top" alt="peliculas poster" style="height: 24rem;">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-title><span class="h6">${year}</span> . ${length}</p>
                            <h6 class="card-title">${director}</h6>
                            <p class="card-text mb-4">${synopsis}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        // Mensaje si no hay resultados
        if (filteredMovies.length === 0) {
            movieSection.innerHTML = `<p class="text-center mt-4 text-white">No se encontraron resultados para "${filter}".</p>`;
        }
    }

    // Mostrar todas las películas al cargar la página
    renderMovies();

    // Agregar evento de búsqueda en el formulario
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario
        const searchTerm = searchInput.value.trim(); // Obtiene el valor del campo de búsqueda
        renderMovies(searchTerm); // Filtra las películas por el término de búsqueda
    });
});
