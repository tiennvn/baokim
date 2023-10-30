import { connect } from "react-redux";
import React, { useState } from "react";

import {
	IncreaseQuantity,
	DecreaseQuantity,
	ChangeValueInput,
} from "../actions";

function QuantityButton({
	productItem,
	variantQuantity,
	item,
	itemKey,
	DecreaseQuantity,
	IncreaseQuantity,
	ChangeValueInput
}) {
	let productItemDetail = { ...productItem };
	const [quantity, setQuantity] = useState(item.quantity);
	let limitValue = 9999;
	if(variantQuantity > 0){
		limitValue = variantQuantity;
	}
	else{
		if(productItemDetail.isAblePreorder === false){
			limitValue = variantQuantity;
		}
	}

	// xử lý số lượng khi có thay đổi
	const handleChange = (e) => {
		var value = e.target.value;
		if(limitValue == 0 && value == 0){
			value = e.target.min;
		}
		else{
			if ( Number(value) < Number(e.target.min) || Number(value) > limitValue ) {
				if (Number(value) < Number(e.target.min)) value = e.target.min;
				else {
					if(limitValue > 0) value = limitValue;
					else value = e.target.min
				} 
			}
		}
		setQuantity(value);
		const quantityChanged = value - item.quantity;
		item.quantity = Number(value);
		ChangeValueInput(quantityChanged, item);
	};

	// xử lý giảm số lượng
	const handleDecrease = (e) => {
		DecreaseQuantity(itemKey);
		setQuantity(item.quantity);
	};

	// xử lý tăng số lượng
	const handleIncrease = (e) => {
		IncreaseQuantity(itemKey);
		setQuantity(item.quantity);
	};

	// xử lý nhập số lượng
	const handleInput = (e) => {
		e.target.value = e.target.value.replace(/\D/g , "");
	}

	// xử lý sự kiện click => chọn tất cả khi click vào input
	const handleClick = (e) => {
		e.target.select();
	};

	if (quantity !== item.quantity) {
		setQuantity(item.quantity);
	}

	// disable button và update màu chữ thông báo khi hết hàng || ẩn giá || value input > variant quantity
	let isDisabledIncrease = false;
	let isDisabledDecrease = false;
	let textMessage = "text-caption-1 text-center text-secondary-1";
	let textInput = "input-quantity bg-white text-center text-neutral-1-900 appearance-none focus:outline-none border border-neutral-2-200 max-w-[26px] md:max-w-[42px] md:py-2"
	let quantityShow = variantQuantity;
	
	if(variantQuantity >= 0 || productItemDetail.isPriceHidden === true){
		if(productItemDetail.isAblePreorder === false && variantQuantity == 0){
			isDisabledIncrease = true;
			isDisabledDecrease = true;
			textMessage = textMessage.replace("text-secondary-1", "text-error-400");
			textInput = textInput.replace("text-neutral-1-900", "text-neutral-1-400");
			quantityShow = 0;
		}
		else if (productItemDetail.isPriceHidden === true) {
			isDisabledIncrease = true;
			isDisabledDecrease = true;
			textMessage = textMessage.replace("text-secondary-1", "text-error-400");
			textInput = textInput.replace("text-neutral-1-900", "text-neutral-1-400");
			quantityShow = 0;
		}
		else{
			if(item.quantity >= limitValue && item.quantity <= 1){
				isDisabledIncrease = true;
				isDisabledDecrease = true;
			}
			else if(item.quantity >= limitValue){
				isDisabledIncrease = true;
				isDisabledDecrease = false;
			}
			else if(item.quantity <= 1){
				isDisabledDecrease = true;
				isDisabledIncrease = false;
			}
			else{
				isDisabledIncrease = false;
				isDisabledDecrease = false;
			}
		}
	}
	return (
		<div data-variant={item.id} className="w-full flex items-center gap-2 md:flex-col md:text-body-2 react-quantity">
			<div className="flex h-fit w-fit">
				<button disabled={isDisabledDecrease}
						onClick={handleDecrease}
						className="w-6 minus is-form flex justify-center items-center text-neutral-1-500 rounded-l-full border border-neutral-2-200 border-r-0 active:bg-neutral-3-50 active:text-primary-1 md:p-2 md:w-10"
				>
						<span className="twi-17-minus-fill text-base leading-4 md:text-2xl md:leading-6"></span>
				</button>
				<input
						className={textInput}
						max="9999"
						min="1"
						type="number"
						value={quantity}
						onChange={handleChange}
						onClick={handleClick}
						onInput={handleInput}
				/>
				<button disabled={isDisabledIncrease}
						onClick={(e) => handleIncrease(e)}
						className="w-6 plus is-form flex justify-center items-center text-neutral-1-500 border border-neutral-2-200 border-l-0 rounded-r-full active:bg-neutral-3-50 active:text-primary-1 md:p-2 md:w-10"
				>
						<span className="twi-17-plus-fill text-base leading-4 md:text-2xl md:leading-6"></span>
				</button>
			</div>
			<p className={textMessage}>Còn {quantityShow} sản phẩm</p>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		cartInfo: state._todoProduct,
	};
};
export default connect(mapStateToProps, {
	IncreaseQuantity,
	DecreaseQuantity,
	ChangeValueInput
})(QuantityButton);
