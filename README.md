# WeLoveMovies_Backend [View Api](https://we-love-movies-backend-zeta.vercel.app/movies)
## Click here to check out the full project [We Love Movies](https://we-love-movies-frontend.vercel.app/).

> Engineered a database and RESTful API with CRUD operations allowing users to access data about the latest movies, theaters, and reviews.

### Routes
- /movies
- /movies?is_showing=true
- /movies/:movieId
- /movies/:movieId/theaters
- /movies/:movieId/reviews
- /theaters
- /reviews [PUT/DELETE]

### Tasks
- Built an API following RESTful design principles
- Utilizied common middleware packages
- Provided access to relevant information through route and query parameters
- Created an error handler for the case where a route doesn't exist
- Customized knexfile.js file for staging
- Used Knex to write database queries, completeing CRUD routes in an Express server
- Utilized joined and nested data with Knex (treeize)
- Wrote database migrations using Knex's migration tool
- Deployed to Vercel with matching front end.

