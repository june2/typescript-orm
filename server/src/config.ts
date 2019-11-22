export default {
  auth: {
    key: process.env.AUTH_KEY || 'prgms-daangn-key',
  },
  db: {
    url: process.env.MYSQL_URL || 'mysql://cai:company.ai@6255@52.231.200.170:3306/danggun'
  },
  server: {
    origin: process.env.ORIGIN || 'http://localhost:5000',
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000
  },
};
