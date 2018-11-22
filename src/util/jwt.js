/**
 * @Description: Json Web Token middleware
 * @author Martin
 * @date 2018/11/22
 */

const JWT = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../../config/config.js');

exports.create = payload => {
  const now = Math.floor(Date.now() / 1000);
  const _payload = {
    iat: now,
    exp: now + config.security.JWT_APP_TOKEN_EXPIRE_TIME
  };
  _.assign(_payload, payload);

  return JWT.sign(_payload, config.security.JWT_SECRET);
};

exports.decodeToken = token => {
  let ret = null;
  try {
    ret = JWT.verify(token, config.security.JWT_SECRET);
  } catch (e) {
  }
  return ret;
};
