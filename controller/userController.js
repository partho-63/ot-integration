function getUsers(req, res, next) {
  res.render("user", {
    title: "Users",
  });
}

module.exports = {
  getUsers,
};
