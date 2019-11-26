export default {
  auth: {
    key: process.env.AUTH_KEY || 'prgms-daangn-key',
  },
  db: {
    url: process.env.MYSQL_URL || 'mysql://cai:company.ai@6255@52.231.200.170:3306/danggun'
  },
  server: {
    host: process.env.API_HOST || 'http://localhost:5000',
    white_list: ['http://localhost:5000', `http://${process.env.DOMAIN}`, `https://${process.env.DOMAIN}`],
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000
  },
};
