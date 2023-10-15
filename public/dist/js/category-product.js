const table = document.querySelector('#myTable');

table.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');
        const id_danh_muc_delete_input = document.querySelector(`#id_danh_muc_delete_input`);
        id_danh_muc_delete_input.value = id;
    }

    if (event.target.classList.contains('btn-update')) {
        const jsonData = event.target.getAttribute('data-json');
        const jsonObject = JSON.parse(jsonData);

        const id_danh_muc_update_input = document.querySelector(`#id_danh_muc_update_input`);
        const ten_danh_muc_update_input = document.querySelector(`#ten_danh_muc_update_input`);
        id_danh_muc_update_input.value = jsonObject.id_danh_muc;
        ten_danh_muc_update_input.value = jsonObject.ten_danh_muc;
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Ẩn các thông báo đang hiện thị sau 4 giây hiển thị
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.display = 'none';
        }, 4000);
    });
});