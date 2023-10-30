import { connect } from "react-redux";
import React from 'react'; // nạp thư viện react

function PriceItemShow({ productItem, variantQuantity, priceItem }) {
  let productDetail = { ...productItem };
  let price = `${Number(priceItem).toLocaleString("vi-VN")}đ`;
  let textCustom = "font-medium md:font-semibold";
  if (variantQuantity == 0 || productDetail.isPriceHidden == true) {
    if(variantQuantity == 0){
      if (productDetail.isAblePreorder === false) {
        price = "Hết hàng";
        textCustom = textCustom +  " text-error-400";
      }
    }
    else{
      price = "Liên hệ";
      textCustom = textCustom + " text-info-400";
    }
  }
  return <p className={textCustom}>{price}</p>;
}

const mapStateToProps = (state) => {
  return {
    cartInfo: state._todoProduct,
  };
};
export default connect(mapStateToProps)(PriceItemShow);
