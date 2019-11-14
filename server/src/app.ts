import * as path from 'path';
import * as express from 'express';
import * as DB from './models/index';
import * as http from 'http';
import * as cors from 'cors';
import { Sequelize } from 'sequelize/types';
import authRouter from './routes/auth';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import filterRouter from './routes/filter';
import logger from './logger';
import { initData } from './dummy';

const stopServer = async (server: http.Server, sequelize: Sequelize, signal?: string) => {
  logger.info(`Stopping server with signal: ${signal}`);
  await server.close();
  await sequelize.close();
  process.exit();
};

async function runServer() {
  const sequelize = DB.init();
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api/auth', authRouter);
  app.use('/api/products', productRouter);
  app.use('/api/categories', categoryRouter);  
  app.use('/api/filters', filterRouter); 
  app.get('/uploads/:fileName', (req, res) => {
    const fileName = req.params.fileName
    console.log(fileName)
    res.sendFile(path.join(__dirname, `../uploads/${fileName}`));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  const server = app.listen(5000, () => {
    logger.info('Example app listening on port 5000!');
  });

  try {
    await sequelize.authenticate();
    await sequelize.sync({
      // force: true
    });
    // Save dummy data 
    // await initData();
  } catch (e) {
    stopServer(server, sequelize);
    throw e;
  }
}

runServer()
  .then(() => {
    logger.info('run succesfully');
  })
  .catch((ex: Error) => {
    logger.error('Unable run:', ex);
  });

