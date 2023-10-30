import { connect } from "react-redux";
import React from 'react'; // nạp thư viện react

function TotalPriceItemShow({ productItem, variantQuantity, totalPriceItem }) {
  let productItemDetail = { ...productItem };
  let totalPrice = totalPriceItem;
  if (variantQuantity === 0 || productItemDetail.isPriceHidden === true) {
    if (productItemDetail.isPriceHidden === true) totalPrice = 0;
    else {
      if (productItemDetail.isAblePreorder === false) {
        totalPrice = 0;
      }
    }
  }
  return (
    <p className="text-right font-medium md:font-semibold">
      {totalPrice}đ
    </p>
  );
}

const mapStateToProps = (state) => {
  return {
    cartInfo: state._todoProduct,
  };
};
export default connect(mapStateToProps)(TotalPriceItemShow);
