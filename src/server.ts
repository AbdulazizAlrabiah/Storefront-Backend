import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/router';
import cors from 'cors';

const app: express.Application = express();
const address: string = 'Local Host port 3000';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
