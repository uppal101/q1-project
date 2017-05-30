# SF Movie Tours

Deployed site: https://uppal101.github.io/


### About SF Movie Tours
SF Movie Tours is a front end app built for SF Open Data(Film Locations in San Francisco) it also supported with additional information from TMDB API. TMDB API pulls the poster and plot details so that the user can easily identify the movie and recognize if they have watched the movie. SF Movie Tours was built for those who have recently moved to the city and long-term residents especially for those who are looking to explore their city in a different way other than the main tourist attractions. Now users are able to see which of their favorite movies have been shot in the city.

SF open data utilizes the fetch method and .then() to resolve the promises. It also uses Materialize as a front end CSS framework.


### To Get Started
1. Please fork and clone this repo.
2. Register for [TMDB API Keys](https://developers.themoviedb.org/3/getting-started).
3. Register for [SF Open Data API Token](https://dev.socrata.com/docs/app-tokens.html).
3. `touch .env` Make sure it is .gitignore. Example .env file:
```
tmdbKey= xxxxxx
token= xxxxxx
```
4. `open a.html` To run locally
