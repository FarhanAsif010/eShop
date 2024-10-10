const express = require('express');
const cors = require('cors');
const usersRouter = require('./controller/usersRouter.js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
