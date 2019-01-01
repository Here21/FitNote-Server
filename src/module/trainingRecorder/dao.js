const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'ttraining_recorder';
const columns = [
  'training_id', 'u_id', 'weight', 'set', 'duration'
];

class Dao extends BaseDao {
  async getTrainingRecord(trainingId, uId) {
    const sql = `
      SELECT
        tr.* 
      FROM
        ${tableName} tr
        LEFT JOIN ttraining t ON tr.training_id = t.id 
      WHERE
        tr.del = 0 
        AND tr.training_id = ?
        AND tr.u_id = ?
    `;
    const params = [];
    let i = 0;
    params[i++] = trainingId;
    params[i] = uId;
    const result = await db.run(sql, params);
    return result;
  }
}

module.exports = new Dao(tableName, columns);
