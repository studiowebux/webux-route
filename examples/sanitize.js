const express = require("express");
const router = express.Router();
const app = express();

const routes = {
  "/user": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [],
          action: require(__dirname + "/actions/user/find").route
        }
      ]
    }
  },
  "/": {
    resources: {
      "/test": [
        {
          method: "get",
          middlewares: [],
          action: (req, res, next) => {
            return res.status(200).json({ msg: "Pong !" });
          }
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
