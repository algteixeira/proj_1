import 'reflect-metadata';

import express from 'express';

import swaggerUi from 'swagger-ui-express';

import { routes } from './routes/index';

import swaggerDocs from './swagger.json';

import './infra/database/postgres';

import { connect } from './infra/database/postgres';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

export { app };
