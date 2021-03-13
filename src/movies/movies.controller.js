const services = require("./movies.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const treeize = require("../utils/treeize");

async function movieExists(req, res, next) {
  const movie = await services.getMovieById(Number(req.params.movieId));
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res, next) {
    const query = req.query.is_showing;

    let products;
    if (!query) products = await services.getAllMovies();
    if (query === "true") products = await services.getAllMoviesIfShowing();

    products = treeize(products);
    if (products instanceof Error) return next({ message: products.message });
    res.json({ data: products });
}

async function read(req, res, next) {
  let response;
  if (!req.originalUrl.includes("reviews") || !req.originalUrl.includes("theaters")) {
    response = res.locals.movie
  }
  if (req.originalUrl.includes("theaters")) {
    response = await services.getTheaters(Number(req.params.movieId))
  } 
  if (req.originalUrl.includes("reviews")) {
    response = await services.getReviews(Number(req.params.movieId));
  }
  response = treeize(response);
  if (response instanceof Error) return next({ message: response.message });
  res.json({ data: response })
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)]
}