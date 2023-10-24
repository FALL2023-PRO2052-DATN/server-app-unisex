document.addEventListener('DOMContentLoaded', function () {
    // Ẩn các thông báo đang hiện thị sau 2 giây hiển thị
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.display = 'none';
        }, 4000);
    });
});