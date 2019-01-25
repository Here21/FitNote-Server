const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'parts';
const columns = [
  'name', 'u_id', 'desc'
];

class Dao extends BaseDao {
}

module.exports = new Dao(tableName, columns);
