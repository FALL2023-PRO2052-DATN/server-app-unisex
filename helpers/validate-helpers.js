/**
 * Hàm kiểm tra dữ liệu đàu vào có phải là ký tự chữ 
 * @param {*} input dữ liệu đầu vào
 * @returns true nếu là ký tự chữ, false ngược lại
 */
const isTextOnlyInput = (input) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(input);
}

module.exports = {
  isTextOnlyInput,
}
