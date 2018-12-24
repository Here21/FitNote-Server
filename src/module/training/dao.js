const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'ttraining_record';
const columns = [
  'action_id', 'u_id', 'weight', 'frequency', 'duration'
];

class Dao extends BaseDao {
}

module.exports = new Dao(tableName, columns);
