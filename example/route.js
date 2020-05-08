const WebuxRoute = require("../src/index");
const path = require("path");
const express = require("express");
const app = express();
const router = express.Router();

const isAuthenticated = () => {
  return (req, res, next) => {
    console.log("The user must be authenticated to do this...");
    return next();
  };
};

const routes = {
  "/": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [], // By default, this route is publicly available, you should create a middleware to protect this resource.
          action: (req, res, next) => {
            return res.success({
              msg: "Welcome ! The Documentation is available here : /api/",
            });
          },
        },
      ],
      "/healthcheck": [
        {
          method: "get",
          middlewares: [], // By default, this route is publicly available, you should create a middleware to protect this resource.
          action: (req, res, next) => {
            return res.success({ msg: "Pong !" });
          },
        },
      ],
      "/config": [
        {
          method: "get",
          middlewares: [],
          action: (req, res, next) => {
            // FIXME: THIS IS TOTALLY UNSECURE TO DO THAT !!!
            if (process.env.NODE_ENV === "production") {
              return res.success("Route disabled in production");
            }
            return res.success({ config: WebuxRoute.config });
          },
        },
      ],
    },
  },
  "/user": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [isAuthenticated()],
          action: require(path.join(__dirname, "actions", "user", "find"))
            .route,
        },
        {
          method: "post",
          middlewares: [],
          action: require(path.join(__dirname, "actions", "user", "create"))
            .route,
        },
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [isAuthenticated()],
          action: require(path.join(__dirname, "actions", "user", "findOne"))
            .route,
        },
        {
          method: "put",
          middlewares: [isAuthenticated()],
          action: require(path.join(__dirname, "actions", "user", "update"))
            .route,
        },
        {
          method: "delete",
          middlewares: [isAuthenticated()],
          action: require(path.join(__dirname, "actions", "user", "remove"))
            .route,
        },
      ],
    },
  },
};

const webuxRoute = new WebuxRoute();

webuxRoute.LoadResponse(app);
webuxRoute.LoadRoute(router, routes);

app.use("/", router);

app.listen(1337, () => {
  console.log("Server is listening on port 1337");
});
