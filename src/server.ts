import mongoose from 'mongoose';
import config from '../src/app/index';
import app from './app';
import logger from './logger';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('✅ Database connected');

    server = app.listen(config.port, () => {
      logger.info(`🚀 Server is running on Port ${config.port}`);
    });
  } catch (error) {
    logger.error('❌ Error during startup:', error);
    process.exit(1);
  }
}

main();

process.on('unhandledRejection', (reason) => {
  logger.error(`😡 Unhandled Rejection detected, shutting down!...`, reason);

  if (server) {
    server.close(() => {
      logger.info('🔴 Server closed due to an unhandled rejection.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
