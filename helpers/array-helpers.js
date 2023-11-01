/**
 * Thực hiện đảo ngược thứ tự mảng
 * @param {*} array mảng cần đảo ngược
 * @returns mảng sau khi đảo ngược
 */
const reverseArray = (array) => {
    return array.slice().reverse();
}

module.exports = {
    reverseArray
}