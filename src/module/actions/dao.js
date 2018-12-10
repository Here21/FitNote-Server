const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'actions';
const columns = [
  'name', 'desc', 'record_type', 'part'
];

class Dao extends BaseDao {
}

module.exports = new Dao(tableName, columns);
