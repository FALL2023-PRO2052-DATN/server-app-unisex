// Kiểm tra tính hợp lệ của tên kích thước
const isInvalidSizeName = (input) => {
  var regex = /[0-9-_.!@#$%^&*()<>,?;:{}]+/;
  return regex.test(input);
};

// Kiểm tra tính hợp lệ của mô tả kích thước
const isInvalidSizeDescription = (input) => {
  var regex = /[_!@#$%^&*()<>,?;{}]+/;
  return regex.test(input);
};

const formAdd = document.querySelector('#form-add');
formAdd.addEventListener('submit', function (event) {
  // Tên kích thước
  const sizeNameInputAdd = document.getElementById('sizeNameInputAdd');
  const messSizeNameInputAdd = document.getElementById('message-SizeNameInputAdd');

  if (isInvalidSizeName(sizeNameInputAdd.value)) {
    // Tên không hợp lệ
    sizeNameInputAdd.classList.add('is-invalid');
    messSizeNameInputAdd.style.display = 'block';
    event.preventDefault();
  } else {
    sizeNameInputAdd.classList.remove('is-invalid');
    messSizeNameInputAdd.style.display = 'none';
  }

  const sizeDescriptionInputAdd = document.getElementById('sizeDescriptionInputAdd');
  const messageSizeDescriptionInputAdd = document.getElementById('message-SizeDescriptionInputAdd');
  if (isInvalidSizeDescription(sizeDescriptionInputAdd.value)) {
    // kích thước không hợp lệ
    sizeDescriptionInputAdd.classList.add('is-invalid');
    messageSizeDescriptionInputAdd.style.display = 'block';
    event.preventDefault();
  } else {
    sizeDescriptionInputAdd.classList.remove('is-invalid');
    messageSizeDescriptionInputAdd.style.display = 'none';
  }
});



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