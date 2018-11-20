const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'template';
const columns = [
  'id', 'title', 'content'
];

class Dao extends BaseDao {
  async getDataByPage(page) {
    const sql = `
      SELECT
      a.*
    FROM
      ${tableName} a
    WHERE
      a.del = 0 
    ORDER BY
      a.id DESC`;
    const result = await this.pager(sql, {}, page);
    return result;
  }
  async getAll() {
    const sql = `
      SELECT
        a.*
      FROM
        ${tableName} a
      WHERE
        a.del = 0 
      ORDER BY
        a.id DESC
    `;
    const params = [];
    const result = await db.run(sql, params);
    return result;
  }
}

module.exports = new Dao(tableName, columns);
