/**
 * @Description: 项目配置文件，项目启动需要依赖config.js文件，复制config_template.js 为 config.js 文件进行配置
 * @author Martin
 * @date 2018/11/17
 */
exports.db = {
  user: 'user',
  password: 'password',
  database: 'database',
  host: '127.0.0.1',
  charset: 'utf8mb4' // support emoji from wechat
};

exports.server = {
  port: 3700
};
