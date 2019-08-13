const express = require("express");
const router = express.Router();
const app = express();

// middleware
const userValidator = require("./validator/user");
const webuxValidator = require("webux-validator");

// middleware
const query = () => {
  return (req, res, next) => {
    if (req.params) {
      console.log(req.params);
    }
    if (!req.user) {
      req.user = { fullname: "test" };
    }
    return next();
  };
};

// middleware
const isAuthenticated = () => {
  return (req, res, next) => {
    if (req.headers["authorization"]) {
      return next();
    }
    return res.status(401).json({ msg: "Not authenticated" });
  };
};

const routes = {
  "/user": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [isAuthenticated(), query()],
          action: require(__dirname + "/actions/user/find").route
        },
        {
          method: "post",
          middlewares: [],
          action: require(__dirname + "/actions/user/create").route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [webuxValidator.MongoID(userValidator.MongoID)],
          action: require(__dirname + "/actions/user/findOne").route
        },
        {
          method: "put",
          middlewares: [],
          action: require(__dirname + "/actions/user/update").route
        },
        {
          method: "delete",
          middlewares: [],
          action: require(__dirname + "/actions/user/remove").route
        }
      ]
    }
  }
};

const { CreateRoutes } = require("../index");

CreateRoutes(routes, router);

app.use("/", router);

app.use("*", (error, req, res, next) => {
  return res.status(error.code).json({ error });
});

app.listen(1337);
