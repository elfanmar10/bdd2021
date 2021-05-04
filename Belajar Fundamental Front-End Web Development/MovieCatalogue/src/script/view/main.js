import config from "../config/config.js";
import '../component/search-bar.js';

function main() {
	
	const searchElement = document.querySelector("search-bar");    
	
	const getMovies = async () => {
		try {
			const response = await fetch(`${config.baseUrl}/movie/now_playing?api_key=${config.moviedb_api_key}&language=en-US&page=1`);
						
			const responseJson = await response.json();
			if(responseJson.error) {
				showResponseMessage(responseJson.message);
			} else {
				renderAllMovies(responseJson.results);
			}
		} catch(error) {
			showResponseMessage(error);
		}        
    };	
	
	const searchMovie = async(keyword) => {
			
		try {
			const response = await fetch(`${config.baseUrl}/search/movie?api_key=${config.moviedb_api_key}&language=en-US&query=${keyword}&page=1&include_adult=false`)
			const responseJson = await response.json();
			
			if(keyword){
				if(responseJson.total_pages !== 0 ) {					
					renderSearchMovies(responseJson.results);
				} else {
					showResponseMessage(`${keyword} is not found`);
				}
			} else{
				showResponseMessage('Please input movie title');	
			}	
				
		} catch(error) {
			showResponseMessage(error);
		}
				
	};	

    const onButtonSearchClicked = async() => {
		try{
			const result = await searchMovie(searchElement.value);			
		} catch(error) {
		  fallbackResult(error)						
		}
    };
   
    searchElement.clickEvent = onButtonSearchClicked;		
		
	const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };
	
	const fallbackResult = (message) => {
        renderError(message);
    };
	
	document.addEventListener("DOMContentLoaded", () => {
	    getMovies();
	});
	
	const renderAllMovies = (movies) => {
        const listMovieElement = document.querySelector("#listMovies");			
		listMovieElement.innerHTML = "";

        movies.forEach(movie => {			
			let poster = movie.poster_path;
			if(poster === null){
			     poster = '/src/img/blank.png';
			} else {
				poster = `${config.imageUrl}/${movie.poster_path}`
			}
			
			let date = new Date(movie.release_date);
			date = date.toDateString().split(' ').slice(1).join(' ');
			
            listMovieElement.innerHTML += `
							
					<div class="col-xs col-center">
						<div class="card">						
								<div class="card-body">						
									<img class="movie-poster" src='${poster}' alt="Movie Poster">									
									<div class="movie-info">
										<h5>${movie.original_title}</h5>
										<p>${date}</p>
									</div>
								</div>								
						</div>
					</div>				
			
            `;
        });
	};
	
	const renderSearchMovies = (movies) => {
        const listMovieElement = document.querySelector("#listMovies");			
		listMovieElement.innerHTML = "";

        movies.forEach(movie => {
			let poster = movie.poster_path;
			if(poster === null){
			     poster = '/src/img/blank.png';
			} else {
				poster = `${config.imageUrl}/${movie.poster_path}`
			}
			
			let date = new Date(movie.release_date);
			date = date.toDateString().split(' ').slice(1).join(' ');
			
            listMovieElement.innerHTML += `		
			
			<div class="container-fluid">
				<div class="row">
					<div class="col-12 mt-3">
						<div class="card-movie">
							<div class="card-horizontal">
								<div class="img-wrapper">
									<img class="movie-poster-search" src='${poster}' alt="Movie Poster" align="left">
								</div>
								<div class="card-body">
									<h4 class="card-title">${movie.original_title}</h4>
									<p>${date}</p>
									<h6>${movie.vote_average}</h6>
									<p></p>
									<h5>Overview</h5>
									<p>${movie.overview}</p>
								</div>
							</div>							
						</div>
					</div>
				</div>
			</div>			
		  		                  
            `;
        });
	};
	
}

export default main;