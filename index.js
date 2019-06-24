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

const CreateRoutes = (router, routes) => {
  Object.keys(routes).forEach(route => {
    if (typeof routes[route].resources === "object") {
      Object.keys(routes[route].resources).forEach(actions => {
        if (typeof routes[route].resources[actions] === "object") {
          routes[route].resources[actions].forEach(action => {
            const URL = route + actions;

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
};

module.exports = { CreateRoutes };
