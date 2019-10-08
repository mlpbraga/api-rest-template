const { models } = require('../models');

const { Comments, News, Votes } = models;

const CommentDao = {
  async randomOne(reqParams) {
    const { email } = reqParams;
    console.log(reqParams);

    let where;
    let response = {};
    response = await Comments.findAll({
      where,
      include: [Votes, News],
    });
    const chosen = [];
    let min = 10;
    response.forEach((comment) => {
      if (comment.dataValues.Votes.length <= min) {
        let alreadyVoted = false;
        comment.dataValues.Votes.forEach((vote) => {
          if (vote.dataValues.userId === email) {
            alreadyVoted = true;
          }
        });
        if (!alreadyVoted) {
          min = comment.dataValues.Votes.length;
          chosen.push(comment.dataValues);
        }
      }
    });
    return chosen.sort(() => Math.random() - 0.5)[0];
  },
};

module.exports = CommentDao;
