const crypto = require('crypto');

const md5Key = 'fit_note'.toString('ascii');

exports.MD5 = function (clearText) {
  const md5 = crypto.createHmac('md5', md5Key);
  if (!clearText) {
    console.error('参数错误');
    return null;
  }
  return md5.update(clearText).digest('hex').toUpperCase();
};

// console.log(exports.MD5('123456'));
