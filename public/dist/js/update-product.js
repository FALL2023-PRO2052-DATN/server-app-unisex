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
        const idProductSizeInput = document.querySelector(`#idProductSizeInput`);
        idProductSizeInput.value = id;
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
new MultiSelectTag('sizes');

