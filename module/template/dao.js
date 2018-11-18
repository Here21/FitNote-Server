const BaseDao = require('../../util/BaseDao');

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
}

module.exports = new Dao(tableName, columns);
