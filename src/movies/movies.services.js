const knex = require("../db/connection");

const getAllMovies = () => 
    knex("movies as m")
      .join("reviews as r", "m.movie_id", "r.movie_id")
      .select(
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url",
        "r.review_id as reviews:id",
        "r.content as reviews:content",
        "r.score as reviews:score",
        "r.critic_id as reviews:critic_id",
        "r.movie_id as reviews:movie_id"   
      );

const getAllMoviesIfShowing = () => 
    knex("movies as m")
      .join("reviews as r", "m.movie_id", "r.movie_id")
      .join("movies_theaters as mt", "r.movie_id", "mt.movie_id")
      .select(
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url",
        "r.review_id as reviews:id",
        "r.content as reviews:content",
        "r.score as reviews:score",
        "r.critic_id as reviews:critic_id",
        "r.movie_id as reviews:movie_id"   
      )
      .where("mt.is_showing", true);

const getMovieById = (id) => 
    knex("movies")
      .select("*")
      .where({ movie_id: id})
      .first();

const getTheaters = (id) => 
    knex("movies_theaters as mt")
      .join("theaters as t", "mt.theater_id", "t.theater_id")
      .select(
          "t.*",
          "mt.created_at",
          "mt.updated_at",
          "mt.is_showing",
          "mt.movie_id"
      )
      .where("mt.movie_id", id);

const getReviews = (id) =>
    knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select(
          "r.*",
          "c.critic_id as critic:critic_id",
          "c.preferred_name as critic:preferred_name",
          "c.surname as critic:surname",
          "c.organization_name as critic:organization_name",
          "c.created_at as critic:created_at",
          "c.updated_at as critic:updated_at",
        )
      .where("r.movie_id", id);


module.exports = {
    getAllMovies,
    getAllMoviesIfShowing,
    getMovieById,
    getTheaters,
    getReviews
}