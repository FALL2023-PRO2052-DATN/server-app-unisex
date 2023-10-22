const table = document.querySelector("#myTable");

table.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete")) {
    const id = event.target.getAttribute("data-id");
    const idDanhGiaDeleteInput = document.querySelector(
      "#id_danh_gia_delete_input"
    );
    idDanhGiaDeleteInput.value = id;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Ẩn các thông báo đang hiện thị sau 2 giây hiển thị
  const alerts = document.querySelectorAll(".alert");

  alerts.forEach(function (alert) {
    setTimeout(function () {
      alert.style.display = "none";
    }, 4000);
  });
});
