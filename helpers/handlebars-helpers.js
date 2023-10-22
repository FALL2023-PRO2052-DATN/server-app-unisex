const Handlebars = require('handlebars');
const moment = require('moment');

// Hàm so sánh
Handlebars.registerHelper("equal", require("handlebars-helper-equal"));

// Hàm kiểm tra kích thước
Handlebars.registerHelper("checkSize", function (kich_thuoc, options) {
    if (kich_thuoc === null || kich_thuoc === "") {
        return "Không có kích thước";
    } else {
        return kich_thuoc;
    }
});

// Chuyển định dạng số tiền
Handlebars.registerHelper("formatCurrency", function (value) {
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
Handlebars.registerHelper('formatDate', function (date) {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    return new Handlebars.SafeString(formattedDate);
});

// Số thứ tự item trong datatable
Handlebars.registerHelper('calculateIndex', function (index) {
    return index + 1;
});
