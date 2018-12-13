const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'tuser';
const columns = [
  'nickname', 'account', 'password'
];

class Dao extends BaseDao {
  async login(account, password) {
    const sql = `
      SELECT
        u.* 
      FROM
        ${tableName} u 
      WHERE
        u.del = 0 
        AND account = ? 
        AND password = ?
        LIMIT 1
    `;
    const params = [];
    let i = 0;
    params[i++] = account;
    params[i] = password;
    const result = await db.run(sql, params);
    return result[0];
  }
}

module.exports = new Dao(tableName, columns);
