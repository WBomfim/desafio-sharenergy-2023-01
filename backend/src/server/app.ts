import 'express-async-errors';
import * as express from 'express';
import * as cors from 'cors';
import loginRoutes from './routes/Login';
import clientRoutes from './routes/Client';
import handleErrors from '../utils/errors/handleErrors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRoutes);
app.use('/client', clientRoutes);

app.use(handleErrors);

export default app;
