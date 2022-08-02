const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
const userRoute = require('./routes/user.router');
require('./configs/connect.db');
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use('/api', userRoute)
app.listen(4000, () => console.log(`Server listening on http://localhost:${port}`));