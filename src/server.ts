import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/router';
import cors from 'cors';

const app: express.Application = express();

const { ENV } = process.env;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', routes);

if (ENV === 'test') {
app.listen(3000, function () {
  console.log('starting app on: Localhost:3000');
});
} else {
  app.listen(function () {
    console.log('starting app');
  });
}
