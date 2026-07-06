require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Rammy');
});

app.listen(PORT, () => {
  console.log(`Web service is listening at http://localhost:${PORT}`);
});
