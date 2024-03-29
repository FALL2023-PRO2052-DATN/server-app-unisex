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

  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', function (event) {
    //Lấy dữ liệu từ data-id của .button-delete
    if (fileInput.files.length === 0) {
      // Hiển thị alert khi không chọn ảnh
      document.getElementById('alert-iamge-warning').style.display = 'block';

      setTimeout(() => {
        document.getElementById('alert-iamge-warning').style.display = 'none';
      }, 4000);
    } else {
      document.getElementById('loading-alert').style.display = 'block';

      setTimeout(() => {
        document.getElementById('loading-alert').style.display = 'none';
      }, 20000);
    }
  });

  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(function (alert) {
    setTimeout(function () {
      alert.style.display = 'none';
    }, 4000);
  });
});

// Xử lý nút xoá 
const table = document.querySelector('#myTable');
table.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-delete')) {
    const id = event.target.getAttribute('data-id');
    var deleteForm = document.forms["form-del"];

    deleteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      deleteForm.action = "/admin/banner/" + id + "?_method=PUT"
      deleteForm.submit();
    });
  }
});