import { connect } from "react-redux";
import React from 'react'; // nạp thư viện react

function MessageErrorProduct({ productItem, variantItem, item}) {
	let productDetail = { ...productItem };
	let variantDetail = { ...variantItem };
	let messageProduct = "";
	let isOver = false;
	if(variantDetail.quantity > 0 && item.quantity > 0){
		if(item.quantity > variantDetail.quantity){
			isOver = true
		}
		else isOver = false
	}

	if (isOver === true) {
		messageProduct = "Sản phẩm vượt quá số lượng cho phép (còn lại: " + variantDetail.quantity + "). Xin vui lòng cập nhật lại sản phẩm!";
	} 

	if (variantDetail.quantity === 0 && productDetail.isAblePreorder === false) {
		messageProduct = "Sản phẩm tạm hết hàng, vui lòng chọn sản phẩm khác!";
	 } else {
		if (productDetail.isPriceHidden === true) {
			messageProduct = "Sản phẩm không mua được, vui lòng liên hệ cửa hàng!";
		}
	} 
	return (
		<>
			<p className="text-caption-1 text-error-400 whitespace-normal md:whitespace-nowrap">{messageProduct}</p>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		_itemList: state._todoProduct,
	};
};
export default connect(mapStateToProps)(MessageErrorProduct);
