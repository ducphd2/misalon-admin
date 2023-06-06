export function formatPriceVietnam(price: string | number) {
  // Chuyển đổi số thành chuỗi và loại bỏ khoảng trắng
  const priceString = String(price).replace(/\s/g, "");

  // Định dạng lại chuỗi giá tiền
  let formattedPrice = "";
  let count = 0;

  for (let i = priceString.length - 1; i >= 0; i--) {
    formattedPrice = priceString[i] + formattedPrice;
    count++;

    if (count === 3 && i > 0) {
      formattedPrice = "." + formattedPrice;
      count = 0;
    }
  }

  // Thêm ký tự đơn vị tiền tệ (VND)
  formattedPrice += " VND";

  return formattedPrice;
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
