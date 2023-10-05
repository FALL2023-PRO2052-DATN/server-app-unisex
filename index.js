const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ defaultLayout: false });
const path = require('path');

const app = express();

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

// Routing
app.get('/', (req, res) => {
  res.render('index');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
