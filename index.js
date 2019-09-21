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

const { processRoutes } = require("./lib/process");

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
      log.info(`\x1b[33mwebux-route - Creating routes\x1b[0m`);
      Promise.all([processRoutes(routes, router, log)])
        .catch(e => {
          log.error(`\x1b[31mwebux-route - ${e}\x1b[0m`);
          console.error(e);
          process.exit(1);
        })
        .then(() => {
          log.info(`\x1b[33mwebux-route - Finished creating routes\x1b[0m`);
          return resolve();
        });
    } catch (e) {
      log.error(`\x1b[31mwebux-route - ${e.message}\x1b[0m`);
      throw e;
    }
  });
};

module.exports = { CreateRoutes };
