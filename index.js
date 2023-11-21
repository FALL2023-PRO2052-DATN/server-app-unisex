const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ defaultLayout: false });

const userRouter = require('./routers/user/account.user.routers')
const bannerRouter = require('./routers/user/banner.user.routers')
const productRouter = require('./routers/user/product.user.roters')
const typeProductRouter = require('./routers/user/typeProduct.user.routers')
const commentRouter = require('./routers/user/comment.user.routers')
const cartRouter = require('./routers/user/cart.user.routers')
const addressRouter = require('./routers/user/address.user.routers')
const discountRouter = require('./routers/user/discount.user.routers')
const orderRouter = require('./routers/user/order.user.routers')
const billRouter = require('./routers/user/bill.user.routers')
const userSettingRouter = require('./routers/user/user.user.routers')
const notificationRouter = require('./routers/user/notification.router')

const app = express();

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Routing
app.get('/', (req, res) => {
  res.render('index');
});

app.use("/api", userRouter)
app.use("/api", bannerRouter)
app.use("/api", productRouter)
app.use("/api", typeProductRouter)
app.use("/api", commentRouter)
app.use("/api", cartRouter)
app.use("/api", addressRouter)
app.use("/api", discountRouter)
app.use("/api", orderRouter)
app.use("/api", billRouter)
app.use("/api", userSettingRouter)
app.use("/api", notificationRouter)
//
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
