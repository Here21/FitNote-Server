const BaseDao = require('../../util/BaseDao');
const db = require('../../util/db');

const tableName = 'tactions';
const columns = [
  'name', 'u_id', 'desc', 'record', 'part'
];

class Dao extends BaseDao {
  async updateBatch(dataSource, id) {
    let caseStr = '';
    let idArray = [];
    dataSource.forEach(i => {
      caseStr += `when ${i.id} then ${id} `;
      idArray.push(i.id);
    });
    let ids = idArray.join();

    const sql = `
      UPDATE ${tableName} 
      SET part =
        CASE id 
          ${caseStr}
        END 
      WHERE
        id IN ( ${ids} ) 
        AND del = 0;
    `;
    console.log(sql);
  }
}

module.exports = new Dao(tableName, columns);
