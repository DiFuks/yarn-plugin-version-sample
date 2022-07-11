import express from 'express';
import { logger, errorHandler } from '@difuks/sample-common';

const app = express();

app.use(logger);

app.use('/', (req, res, next) => {
  res.status(200).send('Hello world from admin!!!');

  next();
});

app.use(errorHandler);

app.listen(3_001);
