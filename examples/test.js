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
          action: __dirname + "/actions/user/find"
        },
        {
          method: "post",
          middlewares: [],
          action: __dirname + "/actions/user/create"
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [webuxValidator.MongoID(userValidator.MongoID)],
          action: __dirname + "/actions/user/findOne"
        },
        {
          method: "put",
          middlewares: [],
          action: __dirname + "/actions/user/update"
        },
        {
          method: "delete",
          middlewares: [],
          action: __dirname + "/actions/user/remove"
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
