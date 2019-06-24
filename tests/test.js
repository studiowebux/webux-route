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
          middlewares: [],
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

const options = {
  redis: {
    host: "127.0.0.1",
    port: "6379",
    auth_pass: "",
    no_ready_check: true
  }
};

// custom logger for testing purposes.
function Log() {
  this.info = msg => {
    console.log("## " + msg);
  };

  this.warn = msg => {
    console.log("!! " + msg);
  };
}

const log = new Log();

const { CreateRoutes } = require("../index");

CreateRoutes(router, routes, options, log);

app.use("/", router);

app.listen(1337);
