const table = document.querySelector('#myTable');

table.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');
        const id_giam_gia_delete_input = document.querySelector(`#id_giam_gia_delete_input`);
        id_giam_gia_delete_input.value = id;
    }

    if (event.target.classList.contains('btn-update')) {
        // Chuyển json thành object .Lấy dữ liệu từ data-json của .button update
        const jsonData = event.target.getAttribute('data-json');
        const jsonObject = JSON.parse(jsonData);

        const id_giam_gia_update_input = document.querySelector(`#id_giam_gia_update_input`);
        const code_update_input = document.querySelector(`#code_update_input`);
        const gia_tri_update_input = document.querySelector(`#gia_tri_update_input`);

        id_giam_gia_update_input.value = jsonObject.id;
        code_update_input.value = jsonObject.code;
        gia_tri_update_input.value = jsonObject.gia_tri;
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