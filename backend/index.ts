import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'

const app = express();
const port = 3000;

dotenv.config();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/node-env', (req, res) => {
  res.send(`Dotenv says: ${process.env.NODE_ENV}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
