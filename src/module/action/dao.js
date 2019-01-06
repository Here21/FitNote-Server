const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'tactions';
const columns = [
  'name', 'u_id', 'desc', 'record', 'part'
];

class Dao extends BaseDao {
}

module.exports = new Dao(tableName, columns);
