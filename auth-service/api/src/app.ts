import express, { Application } from 'express';

import connectDB from './services/connectDB';
import startServeur from './services/startService';
import configureServices from './services/configureService';


const app: Application = express();

connectDB();
configureServices(app);
startServeur(app);

export default app;
