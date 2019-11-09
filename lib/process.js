/**
 * File: process.js
 * Author: Tommy Gingras
 * Date: 2019-06-23
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const { sanitizeURL, routeType } = require("./utils");

/**
 * Process each action in a top level/specific resource
 * @param {Object} action The resource object, containing the logic and the middlewares.
 * @param {String} actions Specific route e.g / or /:id or /upload or /* (note, the /user is not part of it)
 * @param {String} route Top Level e.g /user
 * @param {Object} router The express router object, Mandatory
 * @param {Object} log A custom logger function, optional
 */
function processAction(action, actions, route, router, log) {
  return new Promise(async (resolve, reject) => {
    try {
      log.debug(`\x1b[33mwebux-route - Process Action\x1b[0m`);
      let URL = route + actions;
      URL = sanitizeURL(URL);
      routeType(router, action, URL);

      // Due to a bug with winston, the console.log will be printed correctly.
      // But not the winston message, it will appear 1-2 seconds later ...
      log.info(
        `\x1b[33mwebux-route - ${action.method.toLowerCase()} ${URL.toLowerCase()}\x1b[0m`
      );
      log.debug(`\x1b[33mwebux-route - Process Action Done\x1b[0m`);
      return resolve();
    } catch (e) {
      throw e;
    }
  });
}

/**
 * for each actions present in a top level route.
 * @param {String} actions Array of specific route e.g /user/ or /user/:id or /user/upload or /user/*
 * @param {String} route Top Level e.g /user
 * @param {Object} routes An array of routes, mandatory
 * @param {Object} router The express router object, Mandatory
 * @param {Object} log A custom logger function, optional
 */
async function processActions(actions, route, routes, router, log) {
  try {
    log.debug(`\x1b[33mwebux-route - Process Actions\x1b[0m`);
    if (typeof routes[route].resources[actions] === "object") {
      for (const action of routes[route].resources[actions]) {
        await processAction(action, actions, route, router, log);
      }
    } else {
      log.debug(
        `\x1b[31mwebux-route - The Actions for '${route}' '${actions}' isn't an object\x1b[0m`
      );
    }
    log.debug(`\x1b[33mwebux-route - Process Actions Done\x1b[0m`);
  } catch (e) {
    throw e;
  }
}

/**
 * for each top level resources,
 * @param {String} route Top Level e.g /user
 * @param {Object} routes An array of routes, mandatory
 * @param {Object} router The express router object, Mandatory
 * @param {Object} log A custom logger function, optional
 */
async function processResources(route, routes, router, log) {
  try {
    // log.debug(`\x1b[33mwebux-route - Process Resources\x1b[0m`);
    for (const actions of Object.keys(routes[route].resources)) {
      if (typeof routes[route].resources[actions] === "object") {
        await processActions(actions, route, routes, router, log);
      } else {
        log.debug(
          `\x1b[31mwebux-route - The Actions for '${route}' '${actions}' isn't an object\x1b[0m`
        );
      }
    }
    log.debug(`\x1b[33mwebux-route - Process Resources Done\x1b[0m`);
  } catch (e) {
    throw e;
  }
}

/**
 * based on a array of routes definition, this function will create a express router configuration.
 * @param {Object} routes An array of routes, mandatory
 * @param {Object} router The express router object, Mandatory
 * @param {Object} log A custom logger function, optional
 */
function processRoutes(routes, router, log) {
  return new Promise(async (resolve, reject) => {
    try {
      log.debug(`\x1b[33mwebux-route - Process routes\x1b[0m`);
      for (const route of Object.keys(routes)) {
        if (typeof routes[route].resources === "object") {
          await processResources(route, routes, router, log).catch(e => {
            return reject(e);
          });
        } else {
          log.debug(
            `\x1b[31mwebux-route - The resources for '${route}' isn't an object\x1b[0m`
          );
        }
      }
      log.debug(`\x1b[33mwebux-route - Processing Routes Done\x1b[0m`);
      return resolve();
    } catch (e) {
      throw e;
    }
  });
}

module.exports = {
  processRoutes
};
