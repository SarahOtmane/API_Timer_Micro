import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import configSwagger from './swagger.config';
import authRoutes from '../routes/authRoute';

const configureServices = (app: Application): void => {
  // Swagger documentation route
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(configSwagger));

  // Middleware for parsing requests
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Define application routes here
  app.use('/auth', authRoutes);
};

export default configureServices;
