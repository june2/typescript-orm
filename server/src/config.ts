const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export default {
  auth: {
    key: process.env.AUTH_KEY || 'prgms-daangn-key',
  },
  db: {
    url: process.env.MYSQL_URL || 'mysql://root:password@mysql-server:3306/my_database',
    // operatorsAliases: {
    //   [Op.and]: '$and',
    //   [Op.or]: '$or',
    // },
  },
};
