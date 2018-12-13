exports.ERROR_CODE = {
  SYSTEM_ERROR: 1000,
  ACCOUNT_ALREADY_TOOK: 1001,
  LOGIN_NAME_ALREADY_TOOK: 1002,
  EMAIL_ALREADY_TOOK: 1003,
  VERIFY_SMS_CODE_FAILED: 1004,
  REQUIRE_MORE_PARAMS: 1005,
  INVALID_PARAMS: 1006,
  NO_USER: 1007,
  TOKEN_ERROR: 1008,
  DB_ERROR: 1009,
  WX_API_ERROR: 1010,
  NO_AUTH: 1011,
  EXHAUSTED: 1012,
  NO_RES: 1013,
  ALREADY_HAD_RES: 1014,
  NO_VENDOR_CODE: 1015,
  VENDOR_CODE_ERROR: 1016,
  NOT_ENOUGH: 1017,
  IS_FULL: 1018,
  QUERY_EMPTY: 1019,
  DESC: {
    1000: '系统错误',
    1001: '手机 已占用',
    1002: '账户 已占用',
    1003: '邮箱 已占用',
    1004: '校验短信验证码过程出错',
    1005: '参数不足',
    1006: '无效参数',
    1007: '无此用户',
    1008: 'Token错误',
    1009: 'sql执行出错',
    1010: '微信API错误',
    1011: '无权限执行此操作',
    1012: '已用尽',
    1013: '无此资源',
    1014: '已拥有此资源',
    1015: '无此代理码',
    1016: '代理码异常',
    1017: '数据不足',
    1018: '已满',
    1019: '查询为空'
  }
};

exports.USER_TYPE = {
  USER: 0,
  ADMIN: 1
};

exports.METHOD = {
  GET: 1,
  POST: 2,
  PUT: 3,
  DELETE: 4,
  OPTIONS: 5
};
