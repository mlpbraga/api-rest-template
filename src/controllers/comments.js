const logger = require('../utils/logger');
const CommentsDAO = require('../dao/comment-dao');
// const constant = require('../../../utils/constants');

// const _ = require('lodash');

module.exports = {
  async handleGetRandom(req, res, next) {
    let response;
    try {
      response = await CommentsDAO.randomOne(req.user);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(`Comments Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
  async handleGet(req, res, next) {
    let response;
    try {
      response = await CommentsDAO.read(req.query);
      // response formatter
      const formattedResponse = response.map(comment => {
        return {
          ...comment.dataValues,
          votes: comment.Votes.reduce(function (avg, value, _, { length }) {
            return avg + value.vote / length;
          }, 0)
        }
      });

      return res.status(200).json(formattedResponse);
    } catch (error) {
      logger.error(`Comments Controller::handleGet ${error}`);
      logger.debug(error);
      return next(error);
    }
  },
};
