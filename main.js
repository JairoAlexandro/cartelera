const requestURL = "../json/documentaries.json";
//funcion asincrona
async function fetchMoviesJson() {
    const response = await fetch(requestURL);
    const movies = await response.json();
    return movies;
};
fetchMoviesJson().then(movies => {
    for(let index = 0; index < movies.documentaries.length; index++){
        const movieSection = document.getElementById('movieSection');
        
        let id = movies.documentaries[index].id;
        let poster = movies.documentaries[index].poster;
        let title = movies.documentaries[index].title;
        let year = movies.documentaries[index].year;
        let length = movies.documentaries[index].length;
        let director = movies.documentaries[index].director;
        let synopsis = movies.documentaries[index].synopsis;
        let trailer = movies.documentaries[index].trailer;
        movieSection.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                    <div class="card h-100 ">
                    <a href="${trailer}" style= " list-style: none;">
                        <img src="${poster}" class="card-img-top" alt="peliculas poster" style="height: 24rem;">
                    </a>
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-title"><span class="h6">${year}</span> . ${length}</p>
                            <h6 class="card-title">${director}</h6>
                            <p class="card-text mb-4">${synopsis}</p>
                        </div>
                    </div>
                </div>
            `
    }
});

// Captura el campo de búsqueda y la sección de películas
const searchInput = document.querySelector('input[type="search"]');
const movieSection = document.getElementById('movieSection');

// Añade el evento input para buscar en tiempo real
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Selecciona todas las tarjetas de película
    const movies = movieSection.getElementsByClassName('card');

    // Itera sobre cada tarjeta de película y muestra/oculta según el término de búsqueda
    Array.from(movies).forEach(movie => {
        const title = movie.querySelector('.card-title').textContent.toLowerCase();

        // Verifica si el título incluye el término de búsqueda
        if (title.includes(searchTerm)) {
            movie.parentElement.style.display = '';  // Muestra la tarjeta
        } else {
            movie.parentElement.style.display = 'none';  // Oculta la tarjeta
        }
    });
});
