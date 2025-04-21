
//định dạng giá thành tiền tệ theo định dạng Việt Nam 
export const formatPrice = (price) => {
  if (typeof price !== "number") {
    throw new Error("Price must be a number");
  }
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

//định dạng giá thành tiền tệ theo định dạng Việt Nam (Khong có ký hiệu tiền tệ)
export const formatPriceWithoutCurrency = (price) => {
  if (typeof price !== "number") {
    throw new Error("Price must be a number");
  }
  return price.toLocaleString("vi-VN", {
    style: "decimal",
  });
};