const table = document.querySelector('#myTable');

table.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-delete')) {
    const id = event.target.getAttribute('data-id');
    var formDel = document.forms["form-del-discount"];
    formDel.addEventListener('submit', function (e) {
      e.preventDefault();
      formDel.action = "/admin/discount/" + id + "/delete" + "?_method=PUT";
      formDel.submit();
    });
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

    var formUpdate = document.forms["form-update"];
    formUpdate.addEventListener('submit', function (e) {
      e.preventDefault();
      formUpdate.action = "/admin/discount/" + jsonObject.id + "/update" + "?_method=PUT"
      formUpdate.submit();
    });
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