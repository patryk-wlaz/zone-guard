import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import swaggerUI from 'swagger-ui-express';
import { body, matchedData, validationResult } from 'express-validator';

import sql from './core/database.js';
import swaggerDoc from './core/swagger-output.json';

const app = express();
const port = 3000;


app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/node-env', (req, res) => {
  res.send(`Dotenv says: ${process.env.NODE_ENV}`)
})

app.post('/dummy', body('dumbo').notEmpty().escape(), (req, res) => {
  /*  #swagger.tags = ['Dummy endpoints']
      #swagger.description = 'Endpoint to add a dummy.' */

  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'dumbo parameter.',
          required: true,
          schema: { $dumbo: "whatever" }
  } */
  console.log(req.body.dumbo);
  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req);
    return res.send('good job');
  }
  res.send({ errors: result.array() });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function getUsersOver(age: number) {
  const users = await sql`
    select
      name,
      age
    from users
    where age > ${ age }
  `
  // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
  return users;
}
