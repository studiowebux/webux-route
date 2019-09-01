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

const { sanitizeURL, routeType } = require("./lib/utils");

function processAction(action, actions, route, router, log) {
  return new Promise((resolve, reject) => {
    try {
      log.debug("* Process Action");
      let URL = route + actions;
      URL = sanitizeURL(URL);
      log.info(`${action.method.toLowerCase()} ${URL.toLowerCase()}`);

      routeType(router, action, URL);
      log.debug("* Process Action Done");
      return resolve();
    } catch (e) {
      log.error(e);
      throw e;
    }
  });
}

async function processActions(actions, route, routes, router, log) {
  try {
    log.debug("* Process Actions");
    if (typeof routes[route].resources[actions] === "object") {
      for (const action of routes[route].resources[actions]) {
        await processAction(action, actions, route, router, log);
      }
    } else {
      log.info("Not an object");
    }
    log.debug("* Process Actions Done");
  } catch (e) {
    log.error(e);
    throw e;
  }
}

async function processRoutes(routes, router, log) {
  try {
    log.debug("* Process routes");
    for (const route of Object.keys(routes)) {
      if (typeof routes[route].resources === "object") {
        await processResources(route, routes, router, log).catch(e => {
          log.error(e);
          throw e;
        });
      } else {
        log.info("Not an object !");
      }
    }
    log.debug("* Process Route Done");
  } catch (e) {
    log.error(e);
    throw e;
  }
}

async function processResources(route, routes, router, log) {
  try {
    log.debug("* Process Resources");
    for (const actions of Object.keys(routes[route].resources)) {
      if (typeof routes[route].resources[actions] === "object") {
        await processActions(actions, route, routes, router, log).catch(e => {
          log.error(e);
          throw e;
        });
      } else {
        log.info("Not An Object");
      }
    }
    log.debug("* Process Resources Done");
  } catch (e) {
    log.error(e);
    throw e;
  }
}

// rewokr that for blocking the thread..
// const processRoute = (routes, router, log) => {
//   return new Promise((resolve, reject) => {
//     try {
//       Object.keys(routes).forEach(route => {
//         if (typeof routes[route].resources === "object") {
//           Object.keys(routes[route].resources).forEach(actions => {
//             if (typeof routes[route].resources[actions] === "object") {
//               routes[route].resources[actions].forEach(action => {
//                 let URL = route + actions;
//                 URL = sanitizeURL(URL);
//                 log.info(`${action.method.toLowerCase()} ${URL.toLowerCase()}`);

//                 routeType(router, action, URL);
//               });
//             }
//           });
//         }
//       });
//       console.log("Processing routes done");
//       return resolve();
//     } catch (e) {
//       throw e;
//     }
//   });
// };

/**
 * this function create custom routes with parameters
 * @param {Object} routes The routes, the routes definition, mandatory
 * @param {Function} router The router, an express function, mandatory
 * @param {Object} log The log function, optional
 * @return {VoidFunction} return nothing
 */
const CreateRoutes = (routes, router, log = console) => {
  return new Promise((resolve, reject) => {
    try {
      if (!routes || typeof routes !== "object") {
        return reject(
          new Error("The routes parameter is required and must be an object")
        );
      }
      if (!router || typeof router !== "function") {
        return reject(
          new Error(
            "The router parameter is required and must be an express router function"
          )
        );
      }
      if (log && typeof log !== "object") {
        return reject(new Error("The log parameter must be an object"));
      }
      log.info("Creating routes");
      Promise.all([processRoutes(routes, router, log)])
        .then(() => {
          log.info("Finished creating routes");
          return resolve();
        })
        .catch(e => {
          log.error(e);
          throw e;
        });
    } catch (e) {
      console.error("\x1b[31m", e, "\x1b[0m");
      throw e;
    }
  });
};

module.exports = { CreateRoutes };
