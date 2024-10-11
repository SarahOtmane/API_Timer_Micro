import express, { Application } from 'express';

import connectDB from './config/connectDB';
import startServeur from './config/startService';
import configureServices from './config/configureService';


const app: Application = express();

connectDB();
configureServices(app);
startServeur(app);

export default app;
