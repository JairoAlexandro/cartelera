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

        movieSection.innerHTML += `
        <div class="col-md-4 mb-4">
        <div class="card h-100" style="width: 24rem;">
            <img src="${poster}" class="card-img-top" alt="peliculas poster" style="height: 35rem;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-title><span class="h6">${year}</span> . ${length}</p>
                <h6 class="card-title">${director}</h6>
                <p class="card-text mb-4">${synopsis}</p>
            </div>
        </div>
        </div>
        `
    }
});
