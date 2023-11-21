const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require("express-session");
const methodOverride = require('method-override');
const flash = require("connect-flash");
const path = require("path");
const handlebarsHelpers = require("./helpers/handlebars-helpers.js");
const attachSocketIO = require('./middleware/socket.io-middlware.js');

const overviewRouter = require('./routers/overview.admin.router.js');
const bannerRouter = require("./routers/admin/banner.router.js");
const categoryRouter = require("./routers/admin/category.router.js");
const discountRouter = require("./routers/admin/discount.router.js");
const sizeRouter = require("./routers/admin/size.router.js");
const productRouter = require("./routers/admin/product.router.js");
const productSizeRouter = require("./routers/admin/product-size.router.js");
const reviewRouter = require("./routers/admin/reviews.router.js");
const billRouter = require("./routers/admin/bill.router.js");
const billDetailRouter = require("./routers/admin/bill-detail.router.js");
const employeeRouter = require("./routers/admin/employee.router.js");
const authRouter = require("./routers/auth/auth.admin.router.js");
// Router shipper
const employeeShipperRouter = require("./routers/shipper/employee.shipper.router.js");
const billShipperRouter = require("./routers/shipper/bill.shipper.router.js");

const app = express();
const server = require('http').createServer(app);
// Sử dụng socket.io
const io = require('socket.io')(server);
// Sử dụng middleware để truyền io vào req
app.use(attachSocketIO(io));

app.use(methodOverride('_method'));

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
app.engine("handlebars", exphbs.engine({ extname: 'handlebars', defaultLayout: null }));
app.set("view engine", "handlebars");

// public file
app.use(express.static(path.join(__dirname, "/public")));

// Hiển thị thông tin HTTP khi yêu cầu
app.use((req, res, next) => {
    console.log("🚀 ~ file: index.js:59 ~ app.use ~ req:", req.method + req.url);
    next();
});
// routers
app.use("/", overviewRouter);
app.use("/", authRouter);
app.use("/admin", bannerRouter);
app.use("/admin", categoryRouter);
app.use("/admin", discountRouter);
app.use("/admin", sizeRouter);
app.use("/admin", productRouter);
app.use("/admin", productSizeRouter);
app.use("/admin", reviewRouter);
app.use("/admin", employeeRouter);
app.use("/admin", billRouter);
app.use("/admin", billDetailRouter);
app.use("/api/shipper", employeeShipperRouter);
app.use("/api/shipper", billShipperRouter);

const port = 3000 || process.env.DB_PORT;
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
