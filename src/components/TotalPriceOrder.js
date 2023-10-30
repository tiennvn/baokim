import { connect } from "react-redux";
import React from 'react'; // nạp thư viện react

function TotalPriceOrder({ cartInfo }) {
    const Carts = cartInfo.Carts;
    const Orders = cartInfo.Orders;
    let totalPrice = 0;

    Orders.forEach((order) => {
        Carts.forEach(cart => {
            if (cart.id === order.id) {
                totalPrice += cart.quantity * cart.price;
            }
        })
    });

    return <p className="font-medium"> {Number(totalPrice).toLocaleString('vi-VN')} đ </p>
}

const mapStateToProps = (state) => {
  return {
    cartInfo: state._todoProduct,
  };
};
export default connect(mapStateToProps)(TotalPriceOrder);
