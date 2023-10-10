const deleteButtons = document.querySelectorAll('.btn-delete');
deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function (event) {
        //Lấy dữ liệu từ data-id của .button-delete
        const id = deleteButton.getAttribute('data-id');
        const id_san_pham_delete_input = document.querySelector(`#id_san_pham_delete_input`);
        id_san_pham_delete_input.value = id;
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