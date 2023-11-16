const table = document.querySelector('#myTable');
table.addEventListener('click', function (event) {
  // XỬ lý nút xoá trong table
  if (event.target.classList.contains('btn-delete')) {
    const id = event.target.getAttribute('data-id');
    
    var formDel = document.forms["form-del-category"];
    formDel.addEventListener('submit', function (e) {
      e.preventDefault();
      formDel.action = "/admin/category/" + id + "/delete" + "?_method=PUT";
      formDel.submit();
    });
  }

  // Xử lý nút cập nhật trong table
  if (event.target.classList.contains('btn-update')) {
    const jsonData = event.target.getAttribute('data-json');
    const jsonObject = JSON.parse(jsonData);

    // const id_danh_muc_update_input = document.querySelector(`#id_danh_muc_update_input`);
    const ten_danh_muc_update_input = document.querySelector(`#ten_danh_muc_update_input`);
    // id_danh_muc_update_input.value = jsonObject.id_danh_muc;
    ten_danh_muc_update_input.value = jsonObject.ten_danh_muc;

    var formUpdate = document.forms["form-update"];

    formUpdate.addEventListener('submit', function (e) {
      e.preventDefault();
      formUpdate.action = "/admin/category/" + jsonObject.id_danh_muc + "/update" + "?_method=PUT"
      formUpdate.submit();
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  // Ẩn các thông báo đang hiện thị sau 4 giây hiển thị
  const alerts = document.querySelectorAll('.alert');

  alerts.forEach(function (alert) {
    setTimeout(function () {
      alert.style.display = 'none';
    }, 4000);
  });
});