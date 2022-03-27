function getCards(req, res, next) {
  res.render("card", {
    title: "Cards",
  });
}

module.exports = {
  getCards,
};
