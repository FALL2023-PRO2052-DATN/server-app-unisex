const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ defaultLayout: false });

const app = express();

// Handlebars
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Routing
app.get('/', (req, res) => {
  res.render('index');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
