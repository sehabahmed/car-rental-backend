import { TErrorSources, TGenericErrorResponse } from '../interface/error';

import { MongoServerError } from 'mongodb';

const handleDuplicateError = (err: MongoServerError): TGenericErrorResponse => {
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
