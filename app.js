require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { limiter } = require('./middlewares/limiter');
const { PORT, DB_URL } = require('./config');

const app = express();
app.use(cors({ origin: true }));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use(limiter);

app.use('/', router);

// Handling errors
app.use(errorLogger);
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {});
