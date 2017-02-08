
// import key from 'tmdbKey';

window.onload = function(){
  getAllMoviesFromSFOpenData()
    .then(function(jsonResult){
      return getMovieDataFromTheMovieDbApi(jsonResult)
    })
    .then(function(allTheMovieDbApiRequests){
      return convertResponsesToJSONObjects(allTheMovieDbApiRequests)
    })
    .then(function(theMovieDbApiMovieObjects){
      // console.log(theMovieDbApiMovieObjects);
      let theMovieDbApiMovieObjectsResults = theMovieDbApiMovieObjects[0].results;
      console.log(theMovieDbApiMovieObjects);
      for(let j = 0; j < theMovieDbApiMovieObjectsResults.length; j++) {
        // for(movie in movieDatabase) {
        // createAndAppendMovieCards(movie);

        let currentMovieObj = theMovieDbApiMovieObjectsResults[j];
        createAndAppendMoviePosterStrip(currentMovieObj);
        // console.log(currentMovieObj);
      }
      // filter and add to movieDatabase
    })

  function createAndAppendMoviePosterStrip(currentMovieObj){
    let posterStrip = createPosterStrip(currentMovieObj);
    // find .resultPoster
    let resultPoster = document.getElementById('resultPoster')
    appendToDom(resultPoster, posterStrip);
  }

  function appendToDom(resultPoster, posterStrip) {
    return resultPoster.appendChild(posterStrip);
  }

  function createPosterStrip(currentMovieObj) {
    let posterStrip = document.createElement('ul');
    posterStrip.setAttribute('class', 'collapsible');
    posterStrip.setAttribute('data-collapsible', 'accordion');

    let listTag = document.createElement('li');

    let posterAndTitle = document.createElement('div');
    posterAndTitle.setAttribute('class','collapsible-header');
    let poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${currentMovieObj.poster_path}`
    poster.setAttribute('src', `https://image.tmdb.org/t/p/w300${currentMovieObj.poster_path}`);
    let title = (posterAndTitle.innerText = currentMovieObj.title);

    let plotOverview = document.createElement('div');
    plotOverview.setAttribute('class', 'collapsible-body');

    let plotDetails = document.createElement('span');
    plotDetails.innerText = currentMovieObj.overview;

    posterStrip.appendChild(listTag);
    listTag.appendChild(posterAndTitle);
    posterAndTitle.appendChild(poster);
    listTag.appendChild(plotOverview);
    plotOverview.appendChild(plotDetails);

    return posterStrip;
  }



  function getAllMoviesFromSFOpenData(){
    let url = "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10";
    return fetch(url)
    .then(function(promiseResponse){
      return promiseResponse.json()
    })
  }

  function getMovieDataFromTheMovieDbApi(jsonResult){
    // could use .map
    let allTheMovieDbApiResult = []
    for(let i = 0; i < jsonResult.length; i++) {
      let curMovie = jsonResult[i];
      let curMoviePromiseFromTheMovieDbApi = searchTheMovieDbApi(curMovie)
      allTheMovieDbApiResult.push(curMoviePromiseFromTheMovieDbApi);
    }
    return allTheMovieDbApiResult;
  }

  function searchTheMovieDbApi(curMovie){
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${curMovie.title}&page=1&include_adult=false  &year=${curMovie.release_year}`);
  }

  function convertResponsesToJSONObjects(allTheMovieDbApiResult){
    return Promise.all(allTheMovieDbApiResult)
      .then(function(arrayOfMoviePromises){
        let arrayOfMovieJSONObjects = arrayOfMoviePromises.map(function(curMoviePromise){
          return curMoviePromise.json();
        });

        return Promise.all(arrayOfMovieJSONObjects)
      })
  }

  function Movie(jsonMovieObj){
    this.title = jsonMovieObj.title;
    this.locations = [jsonMovieObj.locations];
    this.year = jsonMovieObj.release_year;
  }

//   function getOrPrompt(lsKeyValue) {
//   var valInStorage = localStorage.getItem(lsKeyValue);
//
//   if(!valInStorage) {
//     valInStorage = prompt(`Enter a value for ${lsKeyValue}`);
//     localStorage.setItem(lsKeyValue, valInStorage);
//   }
//
//   return valInStorage;
// }
//
// let apiKey = getOrPrompt('api-key')
// let googleSrc = `` // put proper src in here
// let scriptTag = document.createElement('script');
// scriptTag.src = googleSrc;
// document.body.append(scriptTag);











    // will allow me to modify my movieDatabase to include poster and plot details
    // let movieDetailsPromises = [];
    // for (let title in movieDatabase) {
    //   let p = movieDetails(title);
    //   movieDetailsPromises.push(p)
    // }



  // return movieDatabase
  // .catch(function(err){
  //   console.log(err)
  // })

  // grab movie poster and plot
  function movieDetails(title){
    let promises = [];
    let tmdbApi = fetch (`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${title}&page=1&include_adult=false`);

    // console.log(tmdbApi);
    promises.push(tmdbApi)
    // console.log(tmdbApi)
    return Promise.all(promises)
    .then(function(movieResponse){
      // console.log(movieResponse)
      return movieResponse.json()
    })
    .then(function(movieObj){
      // console.log(movieObj)
    })
  }

}
