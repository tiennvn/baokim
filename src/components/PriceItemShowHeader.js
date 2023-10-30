import { connect } from "react-redux";
import React from 'react'; // nạp thư viện react

function PriceItemShowHeader({ item, productItem, variantQuantity }) {
    let productDetail = { ...productItem };
    let price = `${Number(item.price).toLocaleString("vi-VN")} đ`;

    let textCustom = "font-medium";
    if (variantQuantity == 0 || productDetail.isPriceHidden == true) {
        if (variantQuantity == 0) {
            if (productDetail.isAblePreorder === false) {
                price = "Hết hàng";
                textCustom = textCustom +  " text-error-400";
            }
            else{
                return (
                    <p className="flex w-fit gap-4 items-center text-neutral-1-900">
                        <span className={textCustom}>{price}</span>
                        <span className="p-1 text-neutral-1-700 bg-neutral-3-50 rounded-md">X{item.quantity}</span>
                    </p>
                ) 
            }
            
        } 
        else {
            price = "Liên hệ";
            textCustom = textCustom + " text-info-400";
        }
        return(
            <p className={textCustom}>{price}</p>
        )
    }
    else{
        return (
            <p className="flex w-fit gap-4 items-center text-neutral-1-900">
                <span className={textCustom}>{price}</span>
                <span className="p-1 text-neutral-1-700 bg-neutral-3-50 rounded-md">X{item.quantity}</span>
            </p>
        ) 
    }
}

const mapStateToProps = (state) => {
  return {
    cartInfo: state._todoProduct,
  };
};
export default connect(mapStateToProps)(PriceItemShowHeader);
