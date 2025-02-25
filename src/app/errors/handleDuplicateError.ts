<<<<<<< HEAD
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
=======
import { MongoServerError } from 'mongodb';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: MongoServerError): TGenericErrorResponse => {
>>>>>>> bbef078 (authentication type error still has)
  const match = err.message.match(/"([^"])"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};


export default handleDuplicateError;