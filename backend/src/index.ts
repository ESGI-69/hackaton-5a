import express from 'express';
import morgan from 'morgan';

import routes from './routes';
import errorHandler from './errorHandler';
import { populateUser } from './middlewares';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(populateUser);
app.use(process.env.BASE_PATH || '/', routes);
app.use(errorHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
