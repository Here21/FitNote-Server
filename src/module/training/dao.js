const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'ttraining';
const columns = [
  'action_id', 'u_id', 'status', 'goal'
];

class Dao extends BaseDao {
  async getOne(id, uId) {
    const sql = `
      SELECT
        t.*,
        a.name,
        a.desc,
        a.image,
        a.record,
        a.part 
      FROM
        ${tableName} t
        LEFT JOIN tactions a ON a.id = t.action_id 
      WHERE
        t.del = 0 
        AND t.id = ?
        AND t.u_id = ?
    `;
    const params = [];
    let i = 0;
    params[i++] = id;
    params[i] = uId;
    const result = await db.run(sql, params);
    return result[0];
  }
  // status 0：未完成 1：完成
  async getTrainingList(uId, status = 0) {
    const sql = `
      SELECT
        t.*,
        a.name,
        a.desc,
        a.image,
        a.record,
        a.part
      FROM
        ${tableName} t 
        LEFT JOIN tactions a ON a.id = t.action_id
      WHERE
        t.del = 0 
        AND a.del = 0
        AND t.u_id = ? 
        AND t.status = ? 
        ${status ? '' : "AND date_format( t.createon, '%Y-%m-%d' ) = date_format( now( ), '%Y-%m-%d' )"}
    `;
    const params = [];
    let i = 0;
    params[i++] = uId;
    params[i] = status;
    const result = await db.run(sql, params);
    return result;
  }
}

module.exports = new Dao(tableName, columns);
