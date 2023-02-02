import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/router';
import cors from 'cors';

const app: express.Application = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, function () {
  console.log('starting app on port 3000');
});
