// ██╗   ██╗ █████╗ ██╗     ██╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
// ██║   ██║██╔══██╗██║     ██║██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
// ██║   ██║███████║██║     ██║██║  ██║███████║   ██║   ██║   ██║██████╔╝
// ╚██╗ ██╔╝██╔══██║██║     ██║██║  ██║██╔══██║   ██║   ██║   ██║██╔══██╗
//  ╚████╔╝ ██║  ██║███████╗██║██████╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║
//   ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

/**
 * File: user.js
 * Author: Tommy Gingras
 * Date: 2019-02-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const Joi = require('@hapi/joi');

const CreateLocal = Joi.object().keys({
  user: {
    email: Joi.string()
      .email({minDomainAtoms: 2})
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    fullname: Joi.string().required(),
  },
}).required();

const Update = Joi.object().keys({
  user: {
    primaryLanguage: Joi.string().regex(
      /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
    ),
    fullname: Joi.string().required(),
  },
}).required();

const UpdateProfile = Joi.object().keys({
  user: {
    currentPassword: Joi.string().required(),
    email: Joi.string().email({minDomainAtoms: 2}),
    password: Joi.string().min(6),
    fullname: Joi.string(),
    primaryLanguage: Joi.string().regex(
      /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
    ),
  },
}).required();

const ForceLogout = Joi.object().keys({
  userID: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
  accessToken: Joi.string().required(),
});

const UserID = Joi.object().keys({
  _id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
});

const DeleteProfile = Joi.object().keys({
  _id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
  fullname: Joi.string().required(),
});

const MongoID = Joi.string()
  .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  .required();

const MongoIdOrURL = Joi.string()
  .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)|(([a-z]+\-[a-z]+)+)/i)
  .required();

module.exports = {
  CreateLocal,
  ForceLogout,
  Update,
  UpdateProfile,
  MongoID,
  MongoIdOrURL,
  UserID,
  DeleteProfile,
};
