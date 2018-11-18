/**
 * @Description: Dao 层的基类
 * @author Martin
 * @date 2018/11/18
 */

const _ = require('lodash');
const db = require('./db');
const mysql = require('mysql');

class BaseDao {
  constructor(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns || [];
  }

  async getConnection(callback) {
    return db.getConnection(callback);
  }

  async getList() {
    const sql = `select * from ${this.tableName} where del = 0`;
    return db.run(sql);
  }

  async getOne(id) {
    const sql = `select * from ${this.tableName} where del = 0 and id = ?`;
    const params = [];
    let i = 0;
    params[i++] = id;
    const rows = await db.run(sql, params);
    return rows[0];
  }

  async select(whereParams, params) {
    const rows = await db.select(this.tableName, whereParams, params);
    return rows;
  }

  async selectOne(whereParams, params) {
    const rows = await db.select(this.tableName, whereParams, params);
    return rows[0];
  }

  async add(obj) {
    const params = {};
    _.assign(params, _.pick(obj, this.columns));
    const id = await db.insert(this.tableName, params);
    return id;
  }

  async update(obj, whereParams) {
    const params = {};
    _.assign(params, _.pick(obj, this.columns));
    return db.update(this.tableName, params, whereParams);
  }

  async delete(whereParams) {
    return db.update(this.tableName, { del: 1 }, whereParams);
  }

  async generateSid(id) {
    return db.run(`update ${this.tableName} set sid = substring(MD5(RAND()),floor(RAND()*10)+1,16) where id=?`, [id]);
  }

  /**
   * 分页方法
   * @param ctx
   * @param allQuery
   * @param params
   * @returns {Promise<{rows, total: *, displayCount: number, pageNum: number, start: number, end: number}>}
   */
  async pager(allQuery, params, page = 1, displayCount = 10) {
    // page = !!parseInt(page, 10) || 1;
    const baseSql = mysql.format(allQuery, params || []);
    const totalSql = `select count(*) as total from (${baseSql}) as T`;
    const totalRows = await db.run(totalSql);
    const total = totalRows[0].total;
    const pageNum = Math.ceil(total / displayCount);
    if (page >= pageNum) {
      page = pageNum;
    }
    let offset = (page - 1) * displayCount;
    if (offset < 0) {
      offset = 0;
    }
    const dataSql = `${baseSql} limit ${offset}  ,${displayCount};`;
    const start = total === 0 ? 0 : offset;
    let end = 0;
    if (total !== 0) {
      end = Math.min(page * displayCount, total);
    }

    const rows = await db.run(dataSql);
    return {
      rows,
      total,
      displayCount,
      pageNum,
      start,
      end
    };
  }
}

module.exports = BaseDao;
