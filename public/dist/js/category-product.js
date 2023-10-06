// Xử lý các nút cập nhật
const updateButtons = document.querySelectorAll('.btn-update');
updateButtons.forEach(function (updateButton) {
    updateButton.addEventListener('click', function (event) {
        // Chuyển json thành object .Lấy dữ liệu từ data-json của .button update
        const jsonData = updateButton.getAttribute('data-json');
        const jsonObject = JSON.parse(jsonData);

        const id_danh_muc_update = document.querySelector(`#id_danh_muc_update`);
        const ten_danh_muc_update = document.querySelector(`#ten_danh_muc_update`);
        id_danh_muc_update.value = jsonObject.id_danh_muc;
        ten_danh_muc_update.value = jsonObject.ten_danh_muc;
    });
});

// Xử lý nút xoá danh mục của từng item
const deleteButtons = document.querySelectorAll('.btn-delete');
deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function (event) {
        //Lấy dữ liệu từ data-id của .button-delete
        const id = event.target.getAttribute('data-id');
        const id_danh_muc_delete = document.querySelector(`#id_danh_muc_delete`);
        id_danh_muc_delete.value = id;
    });
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