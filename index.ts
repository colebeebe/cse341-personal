require('dotenv').config({ path: '.env' });

const express = require('express');
const connectDB = require('./models/db');
const { engine } = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(require('./middleware/cors'));

app.use('/', require('./routes'));

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Listening at http://localhost:${PORT}`);
});
