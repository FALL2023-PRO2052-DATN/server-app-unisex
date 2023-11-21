const table = document.querySelector('#myTable');

table.addEventListener('click', function (event) {
  // XỬ lý nút xoá trong table
  // XỬ lý nút xoá trong table
  if (event.target.classList.contains('btn-delete')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    var formDel = document.forms["form-del"];
    formDel.addEventListener('submit', function (e) {
      e.preventDefault();
      formDel.action = "/admin/size/" + id + "/delete" + "?_method=PUT"
      formDel.submit();
    });
  }

  if (event.target.classList.contains('btn-update')) {
    // Chuyển json thành object .Lấy dữ liệu từ data-json của .button update
    const jsonData = event.target.getAttribute('data-json');
    const jsonObject = JSON.parse(jsonData);

    const id_kich_thuoc_update_input = document.querySelector(`#id_kich_thuoc_update_input`);
    const ten_kich_thuoc_update_input = document.querySelector(`#ten_kich_thuoc_update_input`);
    const mo_ta_chi_tiet_update_input = document.querySelector(`#mo_ta_chi_tiet_update_input`);

    id_kich_thuoc_update_input.value = jsonObject.id;
    ten_kich_thuoc_update_input.value = jsonObject.ten_kich_thuoc;
    mo_ta_chi_tiet_update_input.value = jsonObject.mo_ta_chi_tiet;

    var formUpdate = document.forms["form-update"];
    formUpdate.addEventListener('submit', function (e) {
      e.preventDefault();
      formUpdate.action = "/admin/size/" + jsonObject.id + "/update" + "?_method=PUT"
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