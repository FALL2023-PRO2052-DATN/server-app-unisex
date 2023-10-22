const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ defaultLayout: false });
const session = require("express-session");
const flash = require("connect-flash");
const moment = require('moment');
const path = require("path");

const categoryRouter = require("./routers/category.admin.router.js");
const discountRouter = require("./routers/discount.admin.router.js");
const sizeRouter = require("./routers/size.admin.router.js");
const bannerRouter = require("./routers/banner.admin.router.js");
const productRouter = require("./routers/product.admin.router.js");
const productSizeRouter = require("./routers/product-size.admin.router.js");
const reviewRouter = require("./routers/reviews.admin.router.js");

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
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
hbs.handlebars.registerHelper("equal", require("handlebars-helper-equal"));

// public file
app.use(express.static(path.join(__dirname, "/public")));

// Hàm kiểm tra kích thước
hbs.handlebars.registerHelper("checkSize", function (kich_thuoc, options) {
    if (kich_thuoc === null || kich_thuoc === "") {
        return "Không có kích thước";
    } else {
        return kich_thuoc;
    }
});

// Chuyển định dạng số tiền
hbs.handlebars.registerHelper("formatCurrency", function (value) {
    if (typeof value !== "number") {
        return value;
    }

    const formattedValue = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);

    return formattedValue;
});

// Chuyển đổi date thành định dạng ngày 'dd/mm/yyyy'
hbs.handlebars.registerHelper('formatDate', function (date) {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    return new hbs.handlebars.SafeString(formattedDate);
});

// routers
app.get("/", (req, res) => {
    res.render("index");
});
app.use("/admin", categoryRouter);
app.use("/admin", discountRouter);
app.use("/admin", sizeRouter);
app.use("/admin", bannerRouter);
app.use("/admin", productRouter);
app.use("/admin", productSizeRouter);
app.use("/admin", reviewRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
