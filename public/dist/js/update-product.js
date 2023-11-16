// Hiển thị image khi chọn ảnh trong thư mục
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("formFile");
    const previewImage = document.getElementById("previewImage");

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            const selectedImage = fileInput.files[0];

            // Check if the selected file is an image
            if (selectedImage.type.startsWith("image/")) {
                const imageURL = URL.createObjectURL(selectedImage);
                previewImage.src = imageURL;
            } else {
                // Handle non-image file selection here, if needed
                console.log("Please select an image file.");
            }
        }
    });
});
const table = document.querySelector('#myTable');

table.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');

        var formDel = document.forms["form-del-product-size"];
        formDel.addEventListener('submit', function (e) {
            e.preventDefault();
            formDel.action = "/admin/product-size/" + id + "?_method=DELETE";
            formDel.submit();
        });
    }

    if (event.target.classList.contains('btn-update')) {
        // Chuyển json thành object .Lấy dữ liệu từ data-json của .button update
        const jsonData = event.target.getAttribute('data-json');
        const jsonObject = JSON.parse(jsonData);

        const quantityInputUpdate = document.querySelector(`#quantityInputUpdate`);

        quantityInputUpdate.value = jsonObject.so_luong;

        var formUpdate = document.forms["form-update-product-size"];
        formUpdate.addEventListener('submit', function (e) {
            e.preventDefault();
            formUpdate.action = "/admin/product-size/" + jsonObject.id_product_size + "?_method=PUT"
            formUpdate.submit();
        });

        $(`option[value="${jsonObject.kich_thuoc_id}"]`).prop('selected', 'selected');
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


