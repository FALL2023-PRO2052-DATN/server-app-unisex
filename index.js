const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ defaultLayout: false });
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const categoryRouter = require('./routers/category.admin.router.js');

const app = express();

// express-session - flash message
app.use(session({
  secret: 'unisex-app',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success = req.flash('success'),
  res.locals.error = req.flash('error')
  next();
});

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express-handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

// routers
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/admin', categoryRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
