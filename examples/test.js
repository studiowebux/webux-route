const express = require("express");
const router = express.Router();
const app = express();

// middleware
const userValidator = require("./validator/user");
const webuxValidator = require("@studiowebux/validator");

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
  },
  "/user2": {
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
  },
  "/user10": {
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
  },
  "/user9": {
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
  },
  "/user8": {
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
  },
  "/user7": {
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
  },
  "/user6": {
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
  },
  "/user5": {
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
  },
  "/user4": {
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
  },
  "/user3": {
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
  },
  "/user1": {
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

function initRoutes() {
  return new Promise(async resolve => {
    await CreateRoutes(routes, router);
    return resolve();
  });
}

async function loadApp() {
  try {
    await initRoutes();
    
    console.log("DONE !");

    app.use("/", router);

    app.use("*", (error, req, res, next) => {
      return res.status(error.code).json({ error });
    });

    app.listen(1337, () => {
      console.log("Server is listening on port 1337");
    });
  } catch (e) {
    throw e;
  }
}

try {
  loadApp();
} catch (e) {
  console.error(e);
  process.exit(1);
}
