import { Server } from 'http';
import mongoose from 'mongoose';
import config from '../src/app/index';
import app from './app';

// let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`This server is running on Port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// process.on('unhandledRejection', () => {
//   console.log(`😡 unhandledRejection is detected, shutting down!...`);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });
