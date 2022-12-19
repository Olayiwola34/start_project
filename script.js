// // JavaScript code
// console.log("Hello Java")
// console.log(Hello)
//API KEY=6f485983f96b59b579c8b243eff19c65


const API_KEY="api_key=6f485983f96b59b579c8b243eff19c65";
const BASE_URL="https://api.themoviedb.org/3";
const API_URL= BASE_URL + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" + API_KEY; 
const IMG_URL="https://image.tmdb.org/t/p/w500";
const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");
const searchURL= BASE_URL + "/search/movie?" + API_KEY;
getMovies(API_URL);



function getMovies(url){



    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results)
        showMovies(data.results)
    })
}

function showMovies(data) {

    main.innerHTML=" ";
    data.forEach(movie =>{

        const {title,poster_path,overview,vote_average}=movie;
        const movieEl=document.createElement("div");
        movieEl.classList.add("movies");
        movieEl.innerHTML= `
        <img src="${IMG_URL+poster_path}" alt="${title}"/>
       <div class="movie-info">
        <h3> ${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>

       </div>
       <div class="overview">
        <h3>Overview</h3>
        ${overview}
       </div>
      </div>
        `
       main.appendChild(movieEl); 
    
        
    })

}

function getColor(vote){
    if (vote >=8){
        return "green"
    }else if(vote >=5){
        return "yellow"
    }else{
        return "red"
    }
}



form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const searchTerm=search.value;
     
    if(searchTerm){
        getMovies(searchURL + "&query=" + searchTerm)
    }else{
        getMovies(API_URL)
    }
})