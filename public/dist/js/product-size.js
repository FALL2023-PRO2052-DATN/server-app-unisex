const table = document.querySelector('#myTable');

table.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
        //Lấy dữ liệu từ data-id của .button-delete
        const id = event.target.getAttribute('data-id');
        const idProductSizeInput = document.querySelector(`#idProductSizeInput`);
        idProductSizeInput.value = id;
    }

    if (event.target.classList.contains('btn-update')) {
        // Chuyển json thành object .Lấy dữ liệu từ data-json của .button update
        const jsonData = event.target.getAttribute('data-json');
        const jsonObject = JSON.parse(jsonData);

        const idProductSizeUpdateInput = document.querySelector(`#idProductSizeUpdateInput`);
        const quantityProductSizeInput = document.querySelector(`#quantityProductSizeInput`);

        quantityProductSizeInput.value = parseInt(jsonObject.so_luong_ton_kho, 10);
        idProductSizeUpdateInput.value = jsonObject.id;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Ẩn các thông báo đang hiện thị sau 2 giây hiển thị
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.display = 'none';
        }, 4000);
    });
});