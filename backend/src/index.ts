import bodyParser from 'body-parser';
import app from './app';
import logger from './logger';

require('dotenv').config();

const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
  // logger.info(`Server started on http://localhost:${Env.PORT}/api`);
});
