const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'ttraining_recorder';
const columns = [
  'training_id', 'u_id', 'weight', 'frequency', 'duration'
];

class Dao extends BaseDao {
}

module.exports = new Dao(tableName, columns);
