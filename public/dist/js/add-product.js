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

    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function (event) {
        //Lấy dữ liệu từ data-id của .button-delete
        if (fileInput.files.length === 0) {
            document.getElementById('alert-iamge-warning').style.display = 'block';

            setTimeout(() => {
                document.getElementById('alert-iamge-warning').style.display = 'none';
            }, 4000);
        }else{
            document.getElementById('loading-alert').style.display = 'block';

            setTimeout(() => {
                document.getElementById('loading-alert').style.display = 'none';
            }, 20000);
        }
    });
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

new MultiSelectTag('countries');