# Webux Router

This module create route based on a configuration file, you have to provide the route structure, the action and the middlewares

# Installation

```bash
npm i --save webux-router
```

# Usage

Routes configuration example,

```
const { isAuthenticated, query } = require('./some-middleware');
const webuxValidator = require('webux-validator');
const userValidator = require('./validator/user');

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
```

Route creation example,

```
const express = require("express");
const router = express.Router();
const app = express();
const { CreateRoutes } = require("webux-router");

const routes = {...};

CreateRoutes(routes, router);

app.use("/", router);

app.use("*", (error, req, res, next) => {
  return res.status(error.code).json({ error });
});

app.listen(1337);
```

folder structure recommanded,

```
test/
  actions/
    user/
      create.js
      update.js
      find.js
      findOne.js
      remove.js
  constants/
    user.js
  validator/
    user.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

SEE LICENSE IN license.txt
