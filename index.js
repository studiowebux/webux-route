// ██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
// ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
// ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
// ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-06-23
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const { sanitizeURL } = require("./lib/utils");

/**
 * this function create custom routes with parameters
 * @param {Object} routes The routes, the routes definition, mandatory
 * @param {Function} router The router, an express function, mandatory
 * @param {Object} log The log function, optional
 * @return {VoidFunction} return nothing
 */
const CreateRoutes = (routes, router, log = console) => {
  try {
    if (!routes || typeof routes !== "object") {
      throw new Error("The routes parameter is required and must be an object");
    }
    if (!router || typeof router !== "function") {
      throw new Error(
        "The router parameter is required and must be an express router function"
      );
    }
    if (log && typeof log !== "object") {
      throw new Error("The log parameter must be an object");
    }
    log.info("Creating routes");
    Object.keys(routes).forEach(route => {
      if (typeof routes[route].resources === "object") {
        Object.keys(routes[route].resources).forEach(actions => {
          if (typeof routes[route].resources[actions] === "object") {
            routes[route].resources[actions].forEach(action => {
              let URL = route + actions;
              URL = sanitizeURL(URL);
              log.info(`${action.method.toLowerCase()} ${URL.toLowerCase()}`);

              if (typeof action.action === "string") {
                router[action.method.toLowerCase()](
                  URL.toLowerCase(),
                  action.middlewares,
                  require(action.action)
                );
              } else if (typeof action.action === "function") {
                router[action.method.toLowerCase()](
                  URL.toLowerCase(),
                  action.middlewares,
                  action.action
                );
              } else {
                throw new Error("The action must be a path or a function.");
              }
            });
          }
        });
      }
    });
    log.info("Finished creating routes");
  } catch (e) {
    console.error("\x1b[31m", e, "\x1b[0m");
  }
};

module.exports = { CreateRoutes };
