export default {
  auth: {
    key: process.env.AUTH_KEY || 'prgms-daangn-key',
  },
  db: {
    url: process.env.MYSQL_URL || 'mysql://root:password@mysql-server:3306/my_database'    
  },
  server: {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000
  },
};
