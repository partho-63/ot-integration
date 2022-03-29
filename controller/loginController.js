const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// get login page
function getLogin(req, res, next) {
  res.render("login");
}

// login
async function login(req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        res.locals.loggedInUser = userObject;
        res.render("index");
      } else {
        throw createError("Login failed!");
      }
    } else {
      throw createError("Login failed!");
    }
  } catch (err) {
    res.render("login", {
      data: {
        email: req.body.email,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("loggout out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
