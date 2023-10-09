// Hiển thị image khi chọn ảnh trong thư mục
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("bannerImage");
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

    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.display = 'none';
        }, 4000);
    });
});

// Xử lý nút xoá 
// Xử lý nút xoá danh mục của từng item
const deleteButtons = document.querySelectorAll('.btn-delete');
deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function (event) {
        //Lấy dữ liệu từ data-id của .button-delete
        const id = deleteButton.getAttribute('data-id');
        const id_banner_delete_input = document.querySelector(`#id_banner_delete_input`);
        id_banner_delete_input.value = id;
    });
});

// Hiển thị cảnh báo 
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', function (event) {
    //Lấy dữ liệu từ data-id của .button-delete
    document.getElementById('loading-alert').style.display = 'block';

    setTimeout(() =>{
        document.getElementById('loading-alert').style.display = 'none';
    }, 20000);
});
