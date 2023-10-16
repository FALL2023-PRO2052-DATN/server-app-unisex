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
new MultiSelectTag('sizes');