const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const handlebarsHelpers = require("./helpers/handlebars-helpers.js");

const overviewRouter = require('./routers/overview.admin.router.js');
const bannerRouter = require("./routers/banner.admin.router.js");
const categoryRouter = require("./routers/category.admin.router.js");
const discountRouter = require("./routers/discount.admin.router.js");
const sizeRouter = require("./routers/size.admin.router.js");
const productRouter = require("./routers/product.admin.router.js");
const productSizeRouter = require("./routers/product-size.admin.router.js");
const reviewRouter = require("./routers/reviews.admin.router.js");
const billRouter = require("./routers/bill.admin.router.js");
const billDetailRouter = require("./routers/bill-detail.admin.router.js");

const app = express();

// express-session - flash message
app.use(
    session({
        secret: "unisex-app",
        saveUninitialized: true,
        resave: true,
    })
);
app.use(flash());
app.use(function (req, res, next) {
    (res.locals.success = req.flash("success")),
        (res.locals.error = req.flash("error")),
        (res.locals.warning = req.flash("warning"));
    next();
});

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express-handlebars
app.engine("handlebars", exphbs.engine({ extname: 'handlebars', defaultLayout: null}));
app.set("view engine", "handlebars");

// public file
app.use(express.static(path.join(__dirname, "/public")));

// routers
app.use("/", overviewRouter);
app.use("/admin", bannerRouter);
app.use("/admin", categoryRouter);
app.use("/admin", discountRouter);
app.use("/admin", sizeRouter);
app.use("/admin", productRouter);
app.use("/admin", productSizeRouter);
app.use("/admin", reviewRouter);
app.use("/admin", billRouter);
app.use("/admin", billDetailRouter);

const port = 3000 || process.env.DB_PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
