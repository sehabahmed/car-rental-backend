import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));
//application routes
app.use('/api/v1', router);

const getController = (req: Request, res: Response) => {
  res.send('This server is running Smoothly!');
};

app.get('/', getController);

export default app;
