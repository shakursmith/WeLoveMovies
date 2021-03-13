const services = require('./theaters.services');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const treeize = require("../utils/treeize");

async function list(req, res, next) {
    let theaters = await services.getAllTheaters();
    theaters = treeize(theaters);
    if (theaters instanceof Error) return next({ message: theaters.message });
    res.json({ data: theaters });
}

module.exports = {
  list: asyncErrorBoundary(list)
}