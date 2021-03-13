const service = require("./reviews.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists (req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
  }
  
  async function update (req, res) {
    const updatedReview = {
      ...res.locals.review,
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    
    await service.update(updatedReview);
    updatedReview.critic = await service.listCritics(updatedReview.critic_id)
    res.json({ data: updatedReview});
  }
  
  async function destroy (req, res) {
    await service.destroy(
      res.locals.review.review_id
    );
    res.sendStatus(204);
  }

  module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
  }