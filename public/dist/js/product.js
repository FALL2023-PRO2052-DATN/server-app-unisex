const table = document.querySelector('#myTable');

table.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');

        var formDel = document.forms["form-del"];
        formDel.addEventListener('submit', function (e) {
            e.preventDefault();
            formDel.action = "/admin/product/" + id + "/delete" + "?_method=PUT"
            formDel.submit();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Ẩn các thông báo đang hiện thị sau 2 giây hiển thị
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(function (alert) {
        setTimeout(function () {
            alert.style.display = 'none';
        }, 4000);
    });
});