const Method = require('../models/methodModel.js');

const MethodController = {

  async getAllMethods(req, res, next) {
    try {
      all = await Method.find();
      res.locals.all = all;
      return next();
    } catch {
      return next(
        {
          log: 'Express error handler caught a middleware error in getMethod',
          status: 500,
          message: { err: 'An error occurred in getAllMethods' }
        }
      );
    }
  },

  async getMethod(req, res, next) {
    try {
      const result = await Method.findOne({class: req.query.class, name: req.query.name});
      res.locals.method = result;

      return next();
    } catch {
      return next(
        {
          log: 'Express error handler caught a middleware error in getMethod',
          status: 500,
          message: { err: 'An error occurred in getMethod' }
        }
      );
    }
  },

  async createMethod(req, res, next) {
    try {
      const doc = await Method.create({class: req.body.class, name: req.body.name, mdn_example: req.body.mdn, w3_example: req.body.w3});
      res.locals.createdMethod = doc;
      return next();
    } catch {
      return next(
        {
          log: 'Express error handler caught a middleware error in createMethod',
          status: 500,
          message: { err: 'An error occurred in createMethod' }
        }
      );
    }
  },

  async updateMethod(req, res, next) {
    /*
    try {
      await Method.updateOne({class: req.params.class, name: req.params.name}, {name: req.body.name});
      return next();
    } catch {
     return next({err: 'error in update method'});
    }
    */
  },

  async deleteMethod(req, res, next) {
    try {
      const result = await Method.deleteOne({class: req.body.class, name: req.body.name});
      res.locals.deleteResult = result;
      return next();
    } catch {
      return next({
        log: 'Express error handler caught a middleware error in deleteMethod',
        status: 500,
        message: { err: 'An error occurred in deleteMethod' }
      });
    }
  }
};

module.exports = MethodController;
