const C = require('./const');

function Error(errorCode, message, data) {
  this.code = 500;
  this.errorCode = errorCode;
  this.message = message || C.ERROR_CODE.DESC[errorCode];
  this.data = data;
}

function Success(data, message) {
  this.code = 200;
  this.data = data;
  this.message = message;
}

module.exports = { Error, Success };
