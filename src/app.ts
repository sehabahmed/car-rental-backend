import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';

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

//Global Error handler
app.use(globalErrorHandler);

//Not Found Error Handling
app.use(notFound);

app.get('/', getController);

export default app;
