const knex = require("../db/connection");

function listCritics (criticId) { 
    return knex('critics as c')
      .where({'c.critic_id': criticId})
      .first();
}

function read (id) {
    return knex("reviews")
      .select("*")
      .where("review_id", id)
      .first();
}

function update (updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*");
}

function destroy (id) {
  return knex("reviews").where("review_id", id).del();
}

module.exports = {
    read,
    update,
    listCritics,
    destroy
}